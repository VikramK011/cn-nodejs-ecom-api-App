import { ApplicationError } from "../../../error-handler/applicationError.js";
import userModel from "../user/user.model.js";

export default class ProductModel{
  constructor( name, desc, price, imageUrl, category,  size, id){
    this._id= id;
    this.name= name;
    this.desc= desc;
    this.imageUrl= imageUrl;
    this.category= category;
    this.price= price;

    this.size= size;
  }

  static add(product){
  product.id= products.length+1;
  products.push(product);
  return product;
      }

  static get(id){
  const product= products.find((i)=>i.id==id);
  return product;
      }

  static getAll(){
    return products;
  }

  static rateProduct(userID, productID, rating){
    //1. Validate user and product
    const user= userModel.getAll().find((u)=>u.id==userID);

    if (!user){
      throw new ApplicationError( 'User not found', 404);
    }

    //validate product
    const product= products.find((p)=>p.id==productID);
    if (!product){
      throw new ApplicationError( 'product not found', 400);
    }

    //Check if there is any rating and if not then add rating array

    if(!product.ratings){
      product.ratings=[];
      product.ratings.push({userID:userID, rating:rating})
    }else{
      //Check if user ratings is already available
      const existingRatingIndex= product.rating.findIndex((r)=>r.userID==userID);
      // console.log(existingRatingIndex);

      if(existingRatingIndex>=0){
      product.ratings[existingRatingIndex]={userID:userID, rating:rating,}
      }else {
        //if no existing ratings, then add new rating
        product.ratings.push({userID:userID, rating:rating})
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Category1',
    ['M', 'XL']
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Category2',
    ['S', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Category3',
    [ 'M','S', 'XL']
  )
] 