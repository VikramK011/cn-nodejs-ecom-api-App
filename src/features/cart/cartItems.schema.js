import mongoose, {Schema} from "mongoose";

export const cartSchema= new Schema({
   productID: { type:mongoose.Schema.Types.ObjectId,ref:'product' },
   userID: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
   quantity:Number


})

