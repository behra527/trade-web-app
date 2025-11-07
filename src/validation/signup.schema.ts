import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain an uppercase letter' })
    .regex(/\d/, { message: 'Password must contain a number' }),
  fullName: z.string().min(1, { message: 'Full name is required' }).optional(),
});
