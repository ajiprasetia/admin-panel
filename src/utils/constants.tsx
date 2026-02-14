
import React from 'react';
import { User, UserRole, UserStatus, Product } from './types';

export const CATEGORIES = [
  "Elektronik",
  "Pakaian",
  "Rumah & Taman",
  "Kecantikan",
  "Olahraga",
  "Buku",
  "Mainan",
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'Elektronik',
    price: 15000000,
    stock: 20,
    status: 'active',
    description: 'Flagship dari Apple dengan bodi titanium.',
    image: '/iphone.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Wireless Headphone',
    category: 'Elektronik',
    price: 2000000,
    stock: 10,
    status: 'active',
    description: 'Kualitas suara premium dengan teknologi ANC canggih.',
    image: '/headphones.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Kaos Katun Organik',
    category: 'Pakaian',
    price: 1000000,
    stock: 5,
    status: 'draft',
    description: 'Kaos lembut dan nyaman yang terbuat dari 100% katun organik.',
    image: '/shirt.jpg',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Aji Prasetia',
    email: 'prasetia.a@gmail.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/foto.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Arif Alfarizi',
    email: 'alfarizi.a@gmail.com',
    role: 'Manager',
    status: 'Active',
    avatar: '/foto.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Budi Santoso',
    email: 'budi.s@gmail.com',
    role: 'Staff',
    status: 'Inactive',
    avatar: '/foto.jpg',
    createdAt: new Date().toISOString()
  }
];

export const ROLES: UserRole[] = ['Admin', 'Manager', 'Staff'];
export const USER_STATUSES: UserStatus[] = ['Active', 'Inactive', 'Pending'];
