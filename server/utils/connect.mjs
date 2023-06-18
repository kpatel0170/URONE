import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


// Connects to the MongoDB database
const connect = async () => {
  const dbUri = process.env.DB_URI;
  try {
    await mongoose.connect(dbUri);
    console.log("DB connected");
  } catch (error) {
    console.error("Could not connect to db");
    console.log(error);
  }
};

export default connect;
