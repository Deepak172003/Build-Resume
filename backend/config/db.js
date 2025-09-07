import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://deepakkumarsingh4645_db_user:resume123@cluster0.qrbjzwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => console.log("MongoDB connected"))
  }
    