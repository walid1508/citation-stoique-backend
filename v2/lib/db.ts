import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Database is already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Database is connecting...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      bufferCommands: true,
    });
    console.log("Database connected");
  } catch (error: unknown) {
    console.error("Database connection error:", error);
    if (error instanceof Error) {
      throw new Error("Error", { cause: error });
    } else {
      throw new Error("Error");
    }
  }
};

export default connect;
