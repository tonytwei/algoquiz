import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: String,
  saved: [String],
  completed: [String],
});

const User = models.User || model("User", userSchema);
export default User;
