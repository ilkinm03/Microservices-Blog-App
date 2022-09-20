import express, { json } from "express";

import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(json());
app.use(errorHandler);

export { app };
