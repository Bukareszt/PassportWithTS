import { model, Schema, Document, Model } from 'mongoose';

export interface IProductPattern {
  productName: string;
  price: number;
}

export interface IProduct extends Document, IProductPattern {}

interface IProductModel extends Model<IProduct> {
  getProduct(productId: string): Promise<IProduct>;
  getAllProducts(): Promise<Array<IProduct>>;
  getProductsWithInACertainPriceRange(
    minPrice: number,
    maxPrice: number
  ): Promise<Array<IProduct>>;
  createProduct(productToCreate: IProductPattern): Promise<void>;
  deleteProduct(productId: string): Promise<void>;
}

const ProductSchema = new Schema({
  productName: { required: true, type: String },
  price: { required: true, type: Number },
});

ProductSchema.statics.getProduct = async function (
  productId: string
): Promise<IProduct> {
  const product = await this.findById(productId);
  return product;
};

ProductSchema.statics.getAllProducts = async function (): Promise<
  Array<IProduct>
> {
  const products = await this.find();
  return products;
};

ProductSchema.statics.getProductsWithInACertainPriceRange = async function (
  minPrice: number,
  maxPrice: number
): Promise<Array<IProduct>> {
  const products = await this.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });
  return products;
};

ProductSchema.statics.createProduct = async function (
  productToCreate: IProductPattern
): Promise<void> {
  const entry = new this(productToCreate);
  const save = await entry.save();
  return;
};

ProductSchema.statics.deleteProduct = async function (
  productId: string
): Promise<void> {
  const entry = await this.findByIdAndDelete(productId);
  return;
};

const ProductModel = model<IProduct, IProductModel>('Product', ProductSchema);
export default ProductModel;
