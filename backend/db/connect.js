const { MongoClient } = require("mongodb");
const mongodbclient = MongoClient;
const client = new mongodbclient("mongodb+srv://Mubashir:AcobyyVXL8J6WT2C@practice.gmyqiiu.mongodb.net/?appName=practice");

async function connect(){
    await client.connect();
    console.log("connected to database");
}

connect();
    
module.exports = {client, connectDB: connect};