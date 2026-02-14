
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  description: string;
  image: string;
  createdAt: string;
}

export type ProductFormValues = Omit<Product, 'id' | 'createdAt'>;

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalValue: number;
  lowStockItems: number;
}

export type UserRole = 'Admin' | 'Manager' | 'Staff';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  createdAt: string;
}

export type UserFormValues = Omit<User, 'id' | 'createdAt'>;
