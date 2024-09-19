import cartModel from "./cart.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export class CartController{

  constructor(){
    this.cartItemRepository= new CartItemsRepository();
  }
  async add(req, res){
    try{
      const {productID, quantity}= req.body;
      const userID= req.userID;
      this.cartItemRepository.add(productID, userID, quantity);
      res.status(201).send('Cart is Updated');
    }catch (err) {
      console.log(err);
      res.status(200).send("Something went wrong");
    }
    
  }

 async  get(req, res){
  try{
    const userID= req.userID;
    const items= await this.cartItemRepository.get(userID);
    return res.status(200).send(items);
  }catch (err) {
    console.log(err);
    res.status(200).send("Something went wrong");
  }
  }


  async delete(req, res){
    const userID= req.userID;
    const cartItemID= req.params.id;
    const isDeleted= await this.cartItemRepository.delete(userID,cartItemID);
    if(!isDeleted){
      return res.status(404).send("Item is not found");
    }else{
      return res.status(200).send('Cart Item is removed');
    }
  }
}