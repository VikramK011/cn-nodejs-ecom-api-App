
import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";

//1. Creating model from schema

const userModel= mongoose.model('User', userSchema)

export default class UserRepository{

  async resetPassword(userID, hashedPassword){
    try{
        let user = await userModel.findById(userID);
        if(user){
            user.password=hashedPassword;
            user.save();
        }else{
            throw new Error("No such user found");
        }
        
    } catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
}

  async signUp(user){
    try{
      //create instance of model
      const newUser= new userModel(user)
      await newUser.save();
      return newUser;

    }catch(err){
      console.log(err);
      if(err instanceof mongoose.Error.ValidationError){
        throw err;
      }else{
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }

  }

 

  async signIn(email, password){
   try{
     return await userModel.findOne({email, password});

   }catch(err)
   {
    console.log(err);
    throw new ApplicationError("Something went wrong with database", 500)
  }
  }

  async findByEmail(email) {
    try {
            return await userModel.findOne({ email }); 
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something Went Wrong with the database", 500);
    }
  }

}
