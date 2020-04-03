import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import todoRoutes from "./routes/Todo";

/**
 * ======================================
 *  Bootstrap
 * ======================================
 */
const app = express();

app.use(json());
app.use("/todo", todoRoutes);

app.use((err: Error, req: Request, res: Response, nex: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
