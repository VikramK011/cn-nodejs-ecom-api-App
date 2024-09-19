import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath:'on_model'
    },
    on_model:{
        type:String,
        enum:['Product','Category']
    }
}).pre('save', (next)=>{
       console.log("New Like Coming in");
       next();
}).post('save', (docs)=>{
       console.log("Likes is saved");
       console.log(docs);
}).pre('find', (next)=>{
      console.log('Retrieving Likes');
      next();
}).post('find', (docs)=>{
    console.log('Find is completed');
    console.log(docs);
})