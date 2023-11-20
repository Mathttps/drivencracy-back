import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let dataBase;

try {
    await mongoClient.connect();
    dataBase = mongoClient.db();
} catch (err) { console.log(err) };

export default dataBase;