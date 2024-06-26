import mongoose, { connect } from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://7780392822:7780392822@cluster0.oniknyv.mongodb.net/food-del"
    )
    .then(() => {
      console.log("DB Connected");
    });
};
