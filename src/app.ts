import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Application } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();
dotenv.config();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use("/api", router);

app.use(globalErrorHandler);

//Not Found
// app.use(notFound);

export default app;
