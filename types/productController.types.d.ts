import { Request, Response } from 'express';

export interface ResponseFromProductController {
  msg: string;
  data?: IProduct | Array<IProduct>;
}

export interface RequestBodyWithProductToCreate {
  productName: string;
  price: number;
}
export interface RequestBodyWithPriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface IProductController {
  getProduct(req: Request, res: Response): Promise<void>;
  getProducts(req: Request, res: Response): Promise<void>;
  getProductsFromCertainPriceRange(req: Request, res: Response): Promise<void>;
  createProduct(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
}
