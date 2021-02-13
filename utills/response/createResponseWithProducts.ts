import { ResponseFromProductController } from '../../types/productController.types';
import { IProduct } from '../db/product.model';

export default function createResponse(
  msg: string,
  data?: IProduct | Array<IProduct>
): ResponseFromProductController {
  if (data) {
    return {
      msg: msg,
      data: data,
    };
  }
  return { msg: msg };
}
