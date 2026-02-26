export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: 'customer' | 'admin';
  createdAt?: Date;
}

export interface IStyleProfile {
  _id?: string;
  userId: string;
  preferences: string[];
  sizeDetails: string;
  aestheticType: string;
  favoriteColors: string[];
  budget: { min: number; max: number };
}

export interface IProduct {
  _id?: string;
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

export interface IOrder {
  _id?: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: IAddress;
  orderedAt?: Date;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface IChatSession {
  _id?: string;
  userId: string;
  title: string;
  startedAt?: Date;
}

export interface IChatMessage {
  _id?: string;
  sessionId: string;
  senderType: 'user' | 'ai';
  messageContent: string;
  sentAt?: Date;
}

export interface ICart {
  _id?: string;
  userId: string;
  items: ICartItem[];
  updatedAt?: Date;
}

export interface ICartItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
