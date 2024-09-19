import jwt from "jsonwebtoken"

const jwtAuth= (req, res, next)=>{
//1. Read the token
const token= req.headers['authorization'];

//2. If no token, return the error
if(!token){
  return res.status(401).send('Unauthorized')
}

//3. check if token is valid
try{
  const payLoad= jwt.verify(token, "BE4ECD374C888311769BA8A9FA74A");
  req.userID= payLoad.userID;
  console.log(payLoad)
}catch(err){
  //4. return the error
  return res.status(401).send('Unauthorized')
}

// call next middlware
next();

}

export default jwtAuth;