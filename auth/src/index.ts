import mongoose from "mongoose";
import { app } from "./app";

const start = (async () => {
  if (!process.env.MONGO_URI) {
    throw Error("MONGO_URI must be provided!");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB!");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000...");
  });
})();
