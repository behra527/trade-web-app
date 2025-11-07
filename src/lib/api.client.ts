/*
    src/lib/api.client.ts

    Simple fetch-based API client that reads configuration from .env:
        - Server (SSR): API_BASE_URL or BASE_URL, API_KEY
        - Client (browser): NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_API_KEY

    Optional:
        - API_KEY_HEADER (default: "Authorization")
        - API_KEY_PREFIX (default: "Bearer")

    Usage:
        const data = await api.get<MyType>('/endpoint');
*/

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Structured API error used internally
interface ApiError extends Error {
    status?: number;
    data?: unknown;
}

interface HasMessage {
    message?: string;
}

const isBrowser = typeof window !== 'undefined';

function getEnvVar(serverName: string, publicName: string, fallbackName?: string, publicFallback?: string) {
    // prefer server-only var on server, fallback to NEXT_PUBLIC on server and client
    if (!isBrowser) {
        return process.env[serverName] ?? process.env[fallbackName ?? ''] ?? process.env[publicName] ?? process.env[publicFallback ?? ''] ?? undefined;
    }
    return process.env[publicName] ?? process.env[publicFallback ?? ''] ?? undefined;
}

const BASE_URL = (() => {
    // support older env name BASE_URL in addition to API_BASE_URL
    const val = getEnvVar('API_BASE_URL', 'NEXT_PUBLIC_API_BASE_URL', 'BASE_URL', 'NEXT_PUBLIC_BASE_URL');
    if (!val) {
        throw new Error(
            'Missing API base URL. Set API_BASE_URL or BASE_URL (server) or NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_BASE_URL (client) in your .env'
        );
    }
    return val.replace(/\/+$/, '');
})();

const API_KEY = getEnvVar('API_KEY', 'NEXT_PUBLIC_API_KEY') ?? undefined;
const API_KEY_HEADER = (process.env.API_KEY_HEADER ?? 'Authorization') as string;
const API_KEY_PREFIX = (process.env.API_KEY_PREFIX ?? 'Bearer') as string;

function buildUrl(path: string) {
    if (/^https?:\/\//i.test(path)) return path;
    const clean = path.replace(/^\/+/, '');
    return `${BASE_URL}/${clean}`;
}

function buildHeaders(custom?: HeadersInit): Headers {
    const headers = new Headers(custom);
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }
    if (API_KEY) {
        const value =
            API_KEY_HEADER.toLowerCase() === 'authorization' ? `${API_KEY_PREFIX} ${API_KEY}` : API_KEY;
        headers.set(API_KEY_HEADER, value);
    }
    return headers;
}

async function parseResponse<T>(res: Response): Promise<T> {
    const contentType = res.headers.get('content-type') ?? '';
    if (res.status === 204) return undefined as unknown as T;
    if (contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
            const err: ApiError = new Error((data && (data as HasMessage).message) || 'Request failed');
            err.status = res.status;
            err.data = data;
            throw err;
        }
        return data as T;
    } else {
        const text = await res.text();
        if (!res.ok) {
            const err: ApiError = new Error(text || 'Request failed');
            err.status = res.status;
            err.data = text;
            throw err;
        }
        return text as unknown as T;
    }
}

async function request<T = unknown>(
    method: HttpMethod,
    path: string,
    options: {
        // query values may be undefined; caller can provide optional entries
        query?: Record<string, string | number | boolean | undefined>;
        body?: unknown;
        headers?: HeadersInit;
        signal?: AbortSignal;
    } = {}
): Promise<T> {
    const url = new URL(buildUrl(path));

    if (options.query) {
        Object.entries(options.query).forEach(([k, v]) => {
            if (v === undefined || v === null) return;
            url.searchParams.set(k, String(v));
        });
    }

    const headers = buildHeaders(options.headers);

    const fetchOptions: RequestInit = {
        method,
        headers,
        signal: options.signal,
    };

    if (options.body !== undefined) {
        if (
            typeof options.body === 'object' &&
            !(options.body instanceof FormData) &&
            !(options.body instanceof URLSearchParams)
        ) {
            // `options.body` is `unknown` here; JSON.stringify accepts unknown
            fetchOptions.body = JSON.stringify(options.body as unknown);
        } else {
            // At this point body is either FormData, URLSearchParams or a primitive string/Blob.
            fetchOptions.body = options.body as BodyInit;
            // remove default content-type for FormData
            if (options.body instanceof FormData) headers.delete('Content-Type');
        }
    }

    const res = await fetch(url.toString(), fetchOptions);
    return parseResponse<T>(res);
}

const api = {
    get: <T = unknown>(
        path: string,
        opts?: { query?: Record<string, string | number | boolean | undefined>; headers?: HeadersInit; signal?: AbortSignal }
    ) => request<T>('GET', path, { ...opts }),

    post: <T = unknown>(
        path: string,
        body?: unknown,
        opts?: { query?: Record<string, string | number | boolean | undefined>; headers?: HeadersInit; signal?: AbortSignal }
    ) => request<T>('POST', path, { body, ...opts }),

    put: <T = unknown>(
        path: string,
        body?: unknown,
        opts?: { query?: Record<string, string | number | boolean | undefined>; headers?: HeadersInit; signal?: AbortSignal }
    ) => request<T>('PUT', path, { body, ...opts }),

    patch: <T = unknown>(
        path: string,
        body?: unknown,
        opts?: { query?: Record<string, string | number | boolean | undefined>; headers?: HeadersInit; signal?: AbortSignal }
    ) => request<T>('PATCH', path, { body, ...opts }),

    delete: <T = unknown>(
        path: string,
        opts?: { query?: Record<string, string | number | boolean | undefined>; headers?: HeadersInit; signal?: AbortSignal }
    ) => request<T>('DELETE', path, { ...opts }),

    // expose low-level helpers
    buildUrl,
    buildHeaders,
};

export default api;