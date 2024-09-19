// import userModel from "./user.model.js";
// import jwt from "jsonwebtoken"
// import UserRepository from "./user.repository.js";
// import bcrypt from 'bcrypt';

// export default class UserController{

//   constructor(){
//     this.userRepository= new UserRepository();
//   }
//  async signUp(req, res){
// const{name, email, password, type}= req.body;

// const hashedPassword= await bcrypt.hash(password, 12);

// const user= new userModel(name, email, hashedPassword, type);

// await this.userRepository.signUp(user);

// res.status(201).send(user);
// }

// async signIn(req, res, next){
//   try{
// //1. finding user by email
//  const user= await this.userRepository.findByEmail(req.body.email);
//  if(!user){
//   res.status(400).send('Invalid Credential');
//  }else{
//   //2. compare password with hashed password
// const result= await bcrypt.compare(req.body.password, user.password)
// if(result){
//  //3. Create Token.

//  const token= jwt.sign(
//   { userID: result.id,
//     email: result.email,}, 'BE4ECD374C888311769BA8A9FA74A',
//   { expiresIn:'1h'}
// )
//  //4. Send token
//  return res.status(200).send(token)
// }else{
//   res.status(400).send('Invalid Credential');

// } 
 
// }
//   }catch(err){
//   console.log(err);
//  return res.status(200).send("Something went wrong")
//   }
// }
// }

import userModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository_old.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();

  }

  async resetPassword(req, res, next){
    const {newPassword} = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const userID = req.userID;
    try{
      await this.userRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is updated");
    }catch(err){
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  // Sign-up method
  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;

      // 1. Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // 2. Create a new user object
      const user = new userModel(name, email, hashedPassword, type);

      // 3. Save the user using the repository
      await this.userRepository.signUp(user);

      // 4. Respond with created user details
      res.status(201).send(user);
    } catch (err) {
      next(err);
      console.log(err);
      // res.status(500).send("An error occurred during sign-up");
    }
  }

  // Sign-in method
  async signIn(req, res) {
    try {
      // 1. Find the user by email
      const user = await this.userRepository.findByEmail(req.body.email);

      // 2. Check if the user exists
      if (!user) {
        return res.status(400).send("Invalid Credentials");
      }

      // 3. Compare the password with the hashed password
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

      if (isPasswordValid) {
        // 4. Create a JWT token
        const token = jwt.sign(
          {
            userID: user._id, // Use user._id instead of result.id
            email: user.email,
          },
          process.env.JWT_SECRET, // Secret key
          { expiresIn: "1h" }
        );

        // 5. Send the token as a response
        return res.status(200).send({ token });
      } else {
        // 6. Invalid password
        return res.status(400).send("Incorrect Credentials");
      }
    } catch (err) {
      next(err);
      console.log(err);
      res.status(200).send("Something went wrong during sign-in");
    }
  }

 
}