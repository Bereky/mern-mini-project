import express from "express";
import cors from "cors";

import connectDatabase from "./database.js";
import routes from "../api/routes/index.routes.js";
import errorHandler from "../api/utils/errorHandler.js";


const app = express();

/* Connect to Database */
connectDatabase();

/* Middlwares */
app.use(cors({ credentials: true })); // Cross Origin Resource Sharing
app.use(express.json({ limit: "50mb" })); // 
app.use(express.urlencoded({ extended: false }));

/* Root Router */
app.use("/", routes);

/* Global Error Handler */
app.use(errorHandler);

export default app;
