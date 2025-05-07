import mongoose from "mongoose";

interface ConnectionStatus {
  isConnected: boolean | number;
}

const connection: ConnectionStatus = {
  isConnected: false,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define MONGODB_URI");
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
