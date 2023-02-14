import express from "express";
const app = express();
const port = 8080;
import routes from "./routes/index";
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
