'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vendorId: string;
  vendorName: string;
  rating: number;
  inStock: boolean;
  location: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  location: string;
  rating: number;
  products: Product[];
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  vendorId: string;
  vendorName: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
}

interface ProductContextType {
  products: Product[];
  vendors: Vendor[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getRecommendations: (userId: string) => Product[];
  getNearbyProducts: (location: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas from local farms',
    price: 2.99,
    image: '/api/placeholder/300/200',
    category: 'Fruits',
    vendorId: 'v1',
    vendorName: 'Fresh Farms',
    rating: 4.5,
    inStock: true,
    location: 'Downtown',
  },
  {
    id: '2',
    name: 'Whole Milk',
    description: 'Fresh whole milk, 1 gallon',
    price: 3.49,
    image: '/api/placeholder/300/200',
    category: 'Dairy',
    vendorId: 'v2',
    vendorName: 'Dairy Delight',
    rating: 4.2,
    inStock: true,
    location: 'Uptown',
  },
  {
    id: '3',
    name: 'Bread Loaf',
    description: 'Fresh baked whole wheat bread',
    price: 2.49,
    image: '/api/placeholder/300/200',
    category: 'Bakery',
    vendorId: 'v1',
    vendorName: 'Fresh Farms',
    rating: 4.8,
    inStock: true,
    location: 'Downtown',
  },
  {
    id: '4',
    name: 'Chicken Breast',
    description: 'Organic free-range chicken breast',
    price: 8.99,
    image: '/api/placeholder/300/200',
    category: 'Meat',
    vendorId: 'v3',
    vendorName: 'Meat Masters',
    rating: 4.6,
    inStock: true,
    location: 'Midtown',
  },
  {
    id: '5',
    name: 'Spinach',
    description: 'Fresh organic spinach leaves',
    price: 1.99,
    image: '/api/placeholder/300/200',
    category: 'Vegetables',
    vendorId: 'v1',
    vendorName: 'Fresh Farms',
    rating: 4.3,
    inStock: true,
    location: 'Downtown',
  },
];

const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Fresh Farms',
    email: 'contact@freshfarms.com',
    location: 'Downtown',
    rating: 4.5,
    products: mockProducts.filter(p => p.vendorId === 'v1'),
  },
  {
    id: 'v2',
    name: 'Dairy Delight',
    email: 'info@dairydelight.com',
    location: 'Uptown',
    rating: 4.2,
    products: mockProducts.filter(p => p.vendorId === 'v2'),
  },
  {
    id: 'v3',
    name: 'Meat Masters',
    email: 'sales@meatmasters.com',
    location: 'Midtown',
    rating: 4.6,
    products: mockProducts.filter(p => p.vendorId === 'v3'),
  },
];

const mockOrders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    userName: 'John Doe',
    vendorId: 'v1',
    vendorName: 'Fresh Farms',
    items: [
      { productId: '1', name: 'Organic Bananas', price: 2.99, quantity: 2 },
      { productId: '3', name: 'Bread Loaf', price: 2.49, quantity: 1 },
    ],
    total: 8.47,
    status: 'delivered',
    createdAt: '2024-01-15T10:00:00Z',
  },
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === product.vendorId
          ? { ...vendor, products: [...vendor.products, newProduct] }
          : vendor
      )
    );
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
    setVendors((prev) =>
      prev.map((vendor) => ({
        ...vendor,
        products: vendor.products.map((product) =>
          product.id === id ? { ...product, ...updates } : product
        ),
      }))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setVendors((prev) =>
      prev.map((vendor) => ({
        ...vendor,
        products: vendor.products.filter((product) => product.id !== id),
      }))
    );
  };

  const placeOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const getRecommendations = (userId: string): Product[] => {
    // Simple recommendation logic: return popular products
    return products
      .filter((product) => product.rating >= 4.0)
      .slice(0, 4);
  };

  const getNearbyProducts = (location: string): Product[] => {
    return products.filter((product) => product.location === location);
  };

  const value: ProductContextType = {
    products,
    vendors,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    placeOrder,
    updateOrderStatus,
    getRecommendations,
    getNearbyProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return context;
}
