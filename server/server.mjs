import express from "express";
import dotenv from "dotenv";
import connect from "./utils/connect.mjs";
import routes from "./routes/routes.mjs";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

  await connect();
  routes(app);
});
