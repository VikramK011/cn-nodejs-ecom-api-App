//  import { ApplicationError } from "../../../error-handler/applicationError.js";
// import { getDB } from "../../config/mongoDb.js";
 
//  class UserRepository{
//     async signUp(newUser){
//     try{

//     //1. get the database
//     const db= getDB();

//     //2. Get the collection
//     const collection= db.collection("users");   
//     //3. Insert the document
//     await collection.insertOne(newUser);
//     return newUser;

//   }catch(err){
//     console.log(err);
//   throw new ApplicationError('Something Went Wrong with the database', 500)
//   }
//   }
//   async signIn(email, password) {
//     try{
//       // 1. Get the database
//     const db = getDB();
//     // 2. Get the collection
//     const collection = db.collection("users");
    
//     // 3. Find the document.
//     return await collection.findOne({email, password});
//     } catch(err){
//       console.log(err);
//       throw new ApplicationError("Something went wrong with database", 500);
//     }
//   }

//   async findByEmail(email ){
//     try{
//     //1. get the database
//     const db= getDB();
//     //2. Get the collection
//     const collection= db.collection("users");   
//     //3. Insert the document
//    return await collection.findOne(email);

//   }catch(err){
//     console.log(err);
//   throw new ApplicationError('Something Went Wrong with the database', 500)
//   }
//   }
//  }

//  export default UserRepository;

import { getDB } from "../../config/mongoDb.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";


class UserRepository {
  // Sign-up method to insert a new user
  constructor(){
    this.collection='users';
  }
  async signUp(newUser) {
    try {
      // 1. Get the database
      const db = getDB();
      if (!db) {
        throw new Error("Database connection is not established");
    }

      // 2. Get the collection
      const collection = db.collection(this.collection);
      
      // 3. Insert the document
      await collection.insertOne(newUser);
      return newUser;

    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something Went Wrong with the database", 500);
    }
  }

  // Sign-in method to find a user by email and password
  async signIn(email, password) {
    try {
      // 1. Get the database
      const db = getDB();
      
      // 2. Get the collection
      const collection = db.collection(this.collection);
      
      // 3. Find the document
      return await collection.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  // Find a user by email
  async findByEmail(email) {
    try {
      // 1. Get the database
      const db = getDB();
      
      // 2. Get the collection
      const collection = db.collection("users");
      
      // 3. Find the document using the email as a filter
      return await collection.findOne({ email }); // Corrected this part
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something Went Wrong with the database", 500);
    }
  }
}

export default UserRepository;