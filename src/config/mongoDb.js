// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";


// dotenv.config();

// const url= process.env.DB_URL
// console.log("URL: "+url)
// let client;
// export const connectToMongoDB=()=>{
//   MongoClient.connect(url)
//   .then(clientInstance=>{
//     client= clientInstance
//      console.log('MongoDB is connected')
//      createCounter(client.db());
//      createIndexes(client.db());
//      resolve(client);
//   })
//   .catch(err=>{
//     console.log(err);
//     reject(err);
//   })

// }

// export const getClient=()=>{
//     return client;
// } 

// export const getDB=()=>{
//       return client.db();
// }

// const createCounter= async(db)=>{
//   const existingCounter= await db.collection("counters").findOne({_id: 'cartItemId'});
//   if(!existingCounter){
//        await db.collection("counters").insertOne({_id: 'cartItemId', value:0})
//   }
// }

// const createIndexes= async(db)=>{
//      try{
//         await db.collection("products").createIndex({price:1});
//         await db.collection("products").createIndex({name:1, category:-1});
//         await db.collection("products").createIndex({desc:"text"});


//      }catch(err){
//         console.log(err)
//      }
//       console.log("Indexes are created")
// }

// // export default connectToMongoDB;

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DB_URL;
console.log("URL: " + url);

let client;

export const connectToMongoDB = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB is connected');

    // Get the database instance
    const db = client.db();

    // Initialize database
    await createCounter(db);
    await createIndexes(db);
    
    return client;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;  // Re-throw to allow the caller to handle the error
  }
};

export const getClient = () => {
  if (!client) {
    throw new Error('MongoDB client is not initialized. Call connectToMongoDB() first.');
  }
  return client;
};

export const getDB = () => {
  if (!client) {
    throw new Error('MongoDB client is not initialized. Call connectToMongoDB() first.');
  }
  return client.db();
};

const createCounter = async (db) => {
  try {
    const existingCounter = await db.collection('counters').findOne({ _id: 'cartItemId' });
    if (!existingCounter) {
      await db.collection('counters').insertOne({ _id: 'cartItemId', value: 0 });
    }
  } catch (err) {
    console.error('Failed to create counter:', err);
  }
};

const createIndexes = async (db) => {
  try {
    await db.collection('products').createIndex({ price: 1 });
    await db.collection('products').createIndex({ name: 1, category: -1 });
    await db.collection('products').createIndex({ desc: 'text' });
    console.log('Indexes are created');
  } catch (err) {
    console.error('Failed to create indexes:', err);
  }
};