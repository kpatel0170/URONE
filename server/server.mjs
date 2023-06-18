import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import url from "url";
import fs from "fs-extra";
import connect from "./utils/connect.mjs";
import routes from "./routes/routes.mjs";
import { createPost, updatePost } from "./controller/post.controller.mjs";
import { updateProfile } from "./controller/user.controller.mjs";

// Get the current directory name
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
global.__basedir = __dirname;

dotenv.config();

const app = express();
app.use(express.json());
app.use("/posts", express.static(path.join(__dirname, "/public/assets/posts")));
app.use("/avatar", express.static(path.join(__dirname, "/public/assets/avatar")));
app.use(cors())

// Configure storage for post uploads
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public/assets/posts";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const postUpload = multer({ storage: postStorage });

// Configure storage for avatar uploads
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public/assets/avatar";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const avatarUpload = multer({ storage: avatarStorage });


// API routes for image upload
app.post("/api/v1/posts/", postUpload.array("image", 5), createPost);
app.patch("/api/v1/posts/:id", postUpload.array("image", 5), updatePost);
app.patch("/api/v1/users/:id", avatarUpload.single("profilePicture"), updateProfile);

// Clear storage directory
app.delete("/api/v1/storage", async (req, res) => {
  try {
    await fs.emptyDir("public/assets/posts");
    res.json({ success: true, message: "Storage cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to clear storage" });
  }
});

// Get list of files
app.get("/api/v1/files", async (req, res) => {
  try {
    const postDir = "public/assets/posts";
    const avatarDir = "public/assets/avatar";

    const postFiles = await fs.readdir(postDir);
    const avatarFiles = await fs.readdir(avatarDir);

    const files = [...postFiles, ...avatarFiles];

    res.json({ success: true, files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to retrieve files" });
  }
});


const port = process.env.PORT;
app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);


  // Connect to the database
  await connect();

  // Register routes
  routes(app);
});
