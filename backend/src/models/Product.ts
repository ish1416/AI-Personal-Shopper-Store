import { Schema, model, Document } from 'mongoose';

export interface ProductDocument extends Document {
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

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    tags: [{ type: String }],
    images: [{ type: String }],
    brand: { type: String, default: '' },
    sustainabilityScore: { type: Number, min: 0, max: 10, default: 5 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Full-text search index across name, description and tags
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
// Compound index for category + price range queries
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isActive: 1 });

export const Product = model<ProductDocument>('Product', productSchema);
