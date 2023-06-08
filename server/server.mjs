import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import url from "url";
import connect from "./utils/connect.mjs";
import routes from "./routes/routes.mjs";
import { createPost, updatePost } from "./controller/post.controller.mjs";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
global.__basedir = __dirname;

dotenv.config();

const app = express();
app.use(express.json());
app.use("/posts", express.static(path.join(__dirname, "/public/assets/posts")));
app.use(cors())

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/posts");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/v1/posts/", upload.array("image", 3), createPost);
app.patch("/api/v1/posts/:id", upload.array("image", 3), updatePost);


const port = process.env.PORT;
app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

  await connect();
  routes(app);
});
