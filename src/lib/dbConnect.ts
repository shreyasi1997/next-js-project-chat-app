import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the .env file");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {});
   connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

export default dbConnect;
