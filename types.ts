
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  vendorId: string;
  vendorName: string;
  description: string;
  isFlashSale?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  joinedDate: string;
  totalSales: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum AppRoute {
  HOME = 'home',
  PRODUCT_DETAILS = 'product',
  CATEGORY = 'category',
  CART = 'cart',
  VENDOR_DASHBOARD = 'vendor_dashboard',
  BECOME_SELLER = 'become_seller',
  AUTH = 'auth'
}
