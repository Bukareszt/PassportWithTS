import { Router } from 'express';
import passport from 'passport';
import { ProductController } from '../controllers/productController';
import auth from '../controllers/authController';
import { IProductController } from '../types/productController.types';

export class ProductResource {
  public router: Router;
  private productController: IProductController = new ProductController();
  private passportOptions
  constructor(url) {
    this.router = Router();
    this.routes();
    this.passportOptions =  {
      session: false,
      failureRedirect: 'auth/failed',
    }

    this.opts = {
      errorMsg:'',
      url:'',
      passportCustomization:{

      }
    }
  }

  routes() {
    this.router.get(
      '/',
      passport.authenticate('jwt', this._passportOptions),
      this.productController.getProducts
    );

    this.router.get(
      '/priceRange',
      passport.authenticate('jwt', this._passportOptions),
      this.productController.getProductsFromCertainPriceRange
    );

    this.router.get(
      '/:id',
      passport.authenticate('jwt', this._passportOptions),
      this.productController.getProduct
    );

    this.router.post(
      '/',
      passport.authenticate('jwt', this._passportOptions),
      this.productController.createProduct
    );

    this.router.delete(
      '/:id',
      passport.authenticate('jwt', this._passportOptions),
      this.productController.deleteProduct
    );
  }
}
