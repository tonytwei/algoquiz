import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo;
