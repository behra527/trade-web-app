import { 
  CreditCard, 
  Wallet, 
  User,
  BarChart3,
  Wallet2,
  Bitcoin,
} from "lucide-react";
import { Images } from "../../public/img";
import { NavLink, PaymentCategory } from "./type";

// ------------------------ Navigation Links ------------------ //

export const navLinks: NavLink[] = [
  {
    title: "Trade",
    icon: BarChart3,
    href: "/trade/trade",
  },
  {
    title: "Deposit",
    icon: CreditCard,
    href: "/trade/deposit",
  },
  {
    title: "Withdraw",
    icon: Wallet,
    href: "/trade/withdraw",
  },
  {
    title: "Profile",
    icon: User,
    href: "/trade/profile",
  },
];

// ------------------------ Trading Stats ------------------ //

export const tradingStats = {
  totalBalance: 9991.0,
  totalOrders: 1234,
  activeCustomers: 567,
  revenue: 12345,
  growth: 12.5,
};

// ------------------------ Market Data ------------------ //

export const marketData = [
  { symbol: "BTC/USD", price: 45234.5, change: 2.34, changeType: "positive" },
  { symbol: "ETH/USD", price: 3245.8, change: 1.87, changeType: "positive" },
  { symbol: "SOL/USD", price: 98.45, change: -0.92, changeType: "negative" },
  { symbol: "ADA/USD", price: 0.456, change: 3.21, changeType: "positive" },
  { symbol: "DOT/USD", price: 6.78, change: -1.45, changeType: "negative" },
];

// ------------------------ Recent Activity ------------------ //

export const recentActivity = [
  { id: "1234", type: "Order", status: "Completed", amount: 1250.0, time: "2 min ago" },
  { id: "1233", type: "Deposit", status: "Pending", amount: 500.0, time: "5 min ago" },
  { id: "1232", type: "Order", status: "Completed", amount: 875.5, time: "12 min ago" },
  { id: "1231", type: "Withdraw", status: "Processing", amount: 200.0, time: "1 hour ago" },
];

// ------------------------ Deposit Data ------------------ //

export const paymentCategories: PaymentCategory[] = [
  {
    title: "E-payments",
    icon: Wallet2,
    methods: [
      { id: "easypaisa-p2c", name: "Easypaisa (P2C)", logo: Images.easypaisa },
      { id: "jazzcash-p2c", name: "Jazzcash (P2C)", logo: Images.jaazCash },
      { id: "nayapay", name: "NayaPay", logo: Images.nayaPay },
      { id: "jazzcash", name: "JazzCash", logo: Images.jaazCash },
      { id: "easypaisa", name: "EasyPaisa", logo: Images.easypaisa },
    ],
  },
  {
    title: "Cryptocurrencies",
    icon: Bitcoin,
    methods: [
      { id: "binance", name: "Binance Pay", logo: Images.binacePay },
      { id: "bp20", name: "Bep20", logo: Images.bep20 },
       { id: "trc20", name: "TRC 20", logo: Images.trc20 },
      // { id: "usdt-trc20", name: "USDT (TRC-20)", logo: "/logos/usdt-trc20.png", network: "TRC-20" },
      // { id: "usdt-erc20", name: "USDT (ERC-20)", logo: "/logos/usdt-erc20.png", network: "ERC-20" },
      // { id: "usdt-polygon", name: "USDT (Polygon)", logo: "/logos/usdt-polygon.png", network: "Polygon" },
      // { id: "usdt-bep20", name: "USDT (BEP-20)", logo: "/logos/usdt-bep20.png", network: "BEP-20" },
      // { id: "usdc-erc20", name: "USDC (ERC-20)", logo: "/logos/usdc-erc20.png", network: "ERC-20" },
      // { id: "usdc-polygon", name: "USDC (Polygon)", logo: "/logos/usdc-polygon.png", network: "Polygon" },
      // { id: "usdc-bep20", name: "USDC (BEP-20)", logo: "/logos/usdc-bep20.png", network: "BEP-20" },
    ],
  },
];
