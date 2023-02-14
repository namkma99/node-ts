import { type Express } from "express";
import userRoutes from "./UserRoutes";

const route = (app: Express) => {
  app.use("/api", userRoutes);
};
export default route;
