import { ApplicationError } from "../../../error-handler/applicationError.js";
import { getDB } from "../../config/mongoDb.js";

 export default class userModel{
  constructor(name, email, password, type, id){
    this.name= name;
    this.email= email;
    this.password= password;
    this.type= type;
    this._id= id;
  }

  // static async signUp(name, email, password, type){
  //   try{

  //   //1. get the database
  //   const db= getDB();

  //   //2. Get the collection
  //   const collection= db.collection("users");

  //   const newUser= new userModel(name, email, password, type);
   
  //   //3. Insert the document

  //  await collection.insertOne(newUser);
  //  return newUser;

  // }catch(err){
  // throw new ApplicationError('Something Went Wrong', 500)
  // }

  // }

  // static signIn(email, password){
  //   const user= users.find((u)=>u.email==email&&u.password==password);
  //   return user;
  // }

  static getAll(){
    return users;
  }

 }

 let users=[
  {
    id:1,
    name: 'seller User',
    email: 'seller@ecom.com',
    password: 'Password@123',
    type: 'seller'
},
{
  id:2,
  name: 'customer User',
  email: 'customer@ecom.com',
  password: 'Password@123',
  type: 'customer'
}
]