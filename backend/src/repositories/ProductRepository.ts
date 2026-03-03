import { BaseRepository } from './BaseRepository';
import { Product, ProductDocument } from '../models/Product';

export class ProductRepository extends BaseRepository<ProductDocument> {
  constructor() {
    super(Product);
  }

  async searchProducts(query: string): Promise<ProductDocument[]> {
    return this.model
      .find({ $text: { $search: query }, isActive: true })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .exec();
  }

  async findByCategory(category: string): Promise<ProductDocument[]> {
    return this.model.find({ category, isActive: true }).exec();
  }

  async findByTags(tags: string[]): Promise<ProductDocument[]> {
    return this.model.find({ tags: { $in: tags }, isActive: true }).exec();
  }

  async findWithFilters(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
    brand?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: ProductDocument[]; total: number }> {
    const query: Record<string, unknown> = { isActive: true };

    if (filters.category) query.category = filters.category;
    if (filters.brand) query.brand = filters.brand;
    if (filters.tags?.length) query.tags = { $in: filters.tags };
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) (query.price as Record<string, number>).$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) (query.price as Record<string, number>).$lte = filters.maxPrice;
    }

    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.model.find(query).skip(skip).limit(limit).exec(),
      this.model.countDocuments(query).exec(),
    ]);

    return { products, total };
  }

  async updateStock(productId: string, quantity: number): Promise<ProductDocument | null> {
    return this.model
      .findByIdAndUpdate(productId, { $inc: { stockQuantity: -quantity } }, { new: true })
      .exec();
  }
}
