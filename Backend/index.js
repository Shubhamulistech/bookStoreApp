import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4001;
const MongoDBURI = process.env.MongoDBURI;
// const MongoDBURI = 'mongodb://127.0.0.1/mydatabase';
// Connect to MongoDB
mongoose.connect(MongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1); // Exit the process if unable to connect to MongoDB
});

// Define Routes 
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Deployment
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "Frontend", "dist", "index.html"));
  })
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
