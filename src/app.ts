import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();
dotenv.config();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// application routes
app.use("/api", router);
//home route to check connectivity
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
