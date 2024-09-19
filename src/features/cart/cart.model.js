export default class cartModel{
  constructor(productID, userID, quantity, id){
this.productID= productID;
this.userID= userID;
this.quantity= quantity;
this.id= id;
  }

  static add(productID, userID, quantity){
    const cartItem= new cartModel(productID, userID, quantity);
    cartItem.id= cartItems.length+1
    cartItems.push(cartItem);
    return cartItem;
  }

  static get(userID){
    return cartItems.filter((i)=>i.userID=userID);
  }

  static delete(cartID, userID){
    const cartItemIndex= cartItems.findIndex((i)=>i.id==cartID && i.userID==userID);
    if(cartItemIndex==-1){
      return 'Item is not found';
    }else{
      cartItems.splice(cartItemIndex,1);
    }
  }
}

var cartItems= [
  new cartModel(1, 2,1,1),
  new cartModel(1,2,1,2)
];
