export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  tags: string[];
  images: string[];
  brand: string;
  sustainabilityScore: number;
  isActive: boolean;
}

export interface CartItem {
  productId: Product | string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
}

export interface Order {
  _id: string;
  userId: string;
  items: { productId: Product; quantity: number; unitPrice: number }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  orderedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface StyleProfile {
  preferences: string[];
  sizeDetails: string;
  aestheticType: string;
  favoriteColors: string[];
  budget: { min: number; max: number };
}

export interface ChatSession {
  _id: string;
  userId: string;
  title: string;
  startedAt: string;
}

export interface ChatMessage {
  _id: string;
  sessionId: string;
  senderType: 'user' | 'ai';
  messageContent: string;
  sentAt: string;
}
