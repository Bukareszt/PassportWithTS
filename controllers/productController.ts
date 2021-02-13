import { Request, Response } from 'express';
import {
  IProductController,
  RequestBodyWithPriceRange,
  RequestBodyWithProductToCreate,
  ResponseFromProductController,
} from '../types/productController.types';
import ProductModel, {
  IProduct,
  IProductPattern,
} from '../utills/db/product.model';
import createResponse from '../utills/response/createResponseWithProducts';

export class ProductController implements IProductController {
  public async getProduct(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;
    try {
      if (!productId) {
        throw Error('Id of user is required!');
      }
      const productToSend = await ProductModel.getProduct(productId);
      if (!productToSend) {
        throw Error('No product with given id');
      }
      const response = createResponse('Product with given id', productToSend);
      res.status(200).json(response);
    } catch (err) {
      const responseWithErr = createResponse(
        `Problem with getting a products from db : ${err}`
      );
      res.status(500).json(responseWithErr);
    }
  }
  public async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductModel.getAllProducts();
      const response: ResponseFromProductController = createResponse(
        'Products from db',
        products
      );

      res.status(200).json(response);
    } catch (err) {
      const responseWithErr = createResponse(
        `Problem with getting a products from db : ${err}`
      );
      res.status(500).json(responseWithErr);
    }
  }

  public async getProductsFromCertainPriceRange(
    req: Request,
    res: Response
  ): Promise<void> {
    const priceRange: RequestBodyWithPriceRange = req.body;

    try {
      if (!priceRange.maxPrice || !priceRange.minPrice) {
        throw Error('The delivered data does not contain all required field');
      }

      const products = await ProductModel.getProductsWithInACertainPriceRange(
        priceRange.minPrice,
        priceRange.maxPrice
      );

      const response = createResponse(
        `Products from db from price range: ${priceRange.minPrice} - ${priceRange.maxPrice}`,
        products
      );

      res.status(200).json(response);
    } catch (err) {
      const responseWithErr = createResponse(
        `Problem with getting a products from db : ${err}`
      );
      res.status(500).json(responseWithErr);
    }
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    const productToCreate: RequestBodyWithProductToCreate = req.body;

    try {
      if (!productToCreate.productName || !productToCreate.price) {
        throw Error('The delivered data does not contain all required field');
      }

      const productToSave: IProductPattern = productToCreate;
      await ProductModel.createProduct(productToSave);

      const response = createResponse('Product created!');
      res.status(201).json(response);
    } catch (err) {
      const responseWithErr = createResponse(
        `Problem with creating a product : ${err}`
      );
      res.status(500).json(responseWithErr);
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;
    try {
      if (!productId) {
        throw Error('Id of user is required!');
      }
      await ProductModel.deleteProduct(productId);
      const response = createResponse('Product deleted!');

      res.status(200).json(response);
    } catch (err) {
      const responseWithErr = createResponse(
        `Problem with deleting a product : ${err}`
      );
      res.status(500).json(responseWithErr);
    }
  }
}
