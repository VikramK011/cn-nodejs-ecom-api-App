import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongoDb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";

  

  export default class OrderRepository{

    constructor(){
       this.collection= "orders";
    }

    async placeOrder(userId){
      const client= getClient();
      const session= client.startSession();
    try{
      const db= getDB()
      session.startTransaction();
     // 1. Get cart item of user, calculate the total amount
     const items= await this.getTotalAmount(userId, session);
     const finalTotalAmount= items.reduce((acc, item)=>acc+item.totalAmount,0)
      console.log(finalTotalAmount);
     // 2. create a record for Order
     const newOrder= new OrderModel(new ObjectId(userId), finalTotalAmount, new Date())
     await db.collection(this.collection).insertOne(newOrder, {session});
     // 3. Reduce the stock(products quantity)
     for(let item of items){
         await db.collection("products").updateOne(
            {_id: item.productID},
            {$inc: {stock: -item.quantity}},{session}
         )
     }

    //  throw new Error("Something went wrong in placing order")
     // 4. Clear the cart
   await db.collection("cartItems").deleteMany({
       userID: new ObjectId(userId)
   }, {session});
   session.commitSession();
   session.endSession();
    return;
    }catch(err){
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      throw new ApplicationError("Something Went Wrong with the database", 500);
     }
    }

    async getTotalAmount(userId, session){
         const db= getDB();

         const items= await db.collection("cartItems").aggregate([
         //1. get cart items for the user
          {
           $match:{userID: new ObjectId(userId)}
          },
          //2. get the products from product collection

          {
          $lookup:{
            from:"products",
            localField:'productID',
            foreignField:"_id",
            as:"productInfo"

            }
        },
       //3. Unwind the productInfo
       {

        $unwind: "$productInfo"
       },

       // calculate total amount for cartitems
       {
        $addFields:{

             "totalAmount":{
              $multiply: ["$productInfo.price", "$quantity"]
             }
          }
        }
      ], {session}).toArray();
      return items;
     
    }
  }