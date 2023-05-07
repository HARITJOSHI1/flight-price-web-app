import express from "express";
import cors from "cors";
import PriceRouter from "./routes/priceRoute";
import ErrorHandler from "./Errors/ErrorHandler";

const app = express();

// CORS opts to accept request form client with different domains
const corsOpts = {
  credentials: true,
  origin: 'https://master--singular-bienenstitch-cd5a3d.netlify.app',
  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

// Allow express to parse body from post requests and read urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpts));

// Mount the price router
app.use("/api/v1/flights", PriceRouter);

// Handle 404 error
app.all("*", (req, res, next) =>
  res.status(404).json({ error: "route not found" })
);

// Mount Error Handler
app.use(ErrorHandler);

export default app;
