import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo;
