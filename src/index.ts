import express from "express";
import indexRoutes from "./routes/index";
const app = express();
const port = 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
