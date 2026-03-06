import { ProductRepository } from '../repositories/ProductRepository';
import { IProduct } from '../types';

export class ProductService {
  private productRepo = new ProductRepository();

  async getAllProducts(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
    brand?: string;
    page?: number;
    limit?: number;
  }) {
    return this.productRepo.findWithFilters(filters);
  }

  async getProductById(id: string) {
    const product = await this.productRepo.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async searchProducts(query: string) {
    return this.productRepo.searchProducts(query);
  }

  async createProduct(data: Omit<IProduct, '_id'>) {
    return this.productRepo.create(data);
  }

  async updateProduct(id: string, data: Partial<IProduct>) {
    const product = await this.productRepo.update(id, data);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepo.delete(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async getCategories(): Promise<string[]> {
    const products = await this.productRepo.findAll({ isActive: true });
    return [...new Set(products.map((p) => p.category))];
  }
}
