import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService = new ProductService();

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { category, minPrice, maxPrice, brand, page, limit, tags } = req.query;
      const result = await this.productService.getAllProducts({
        category: category as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        brand: brand as string,
        tags: tags ? (tags as string).split(',') : undefined,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 12,
      });
      res.json({ success: true, message: 'Products fetched', data: result });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      res.json({ success: true, message: 'Product fetched', data: product });
    } catch (err) {
      next(err);
    }
  };

  search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q } = req.query;
      if (!q) throw new Error('Search query is required');
      const products = await this.productService.searchProducts(q as string);
      res.json({ success: true, message: 'Search results', data: products });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json({ success: true, message: 'Product created', data: product });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.body);
      res.json({ success: true, message: 'Product updated', data: product });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.productService.deleteProduct(req.params.id);
      res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
      next(err);
    }
  };

  getCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categories = await this.productService.getCategories();
      res.json({ success: true, message: 'Categories fetched', data: categories });
    } catch (err) {
      next(err);
    }
  };
}
