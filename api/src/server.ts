import path from "path";
import app from "./app";
import dotenv from "dotenv";

// Adding config to allow express read environment variables from custom .env files
dotenv.config({ path: path.resolve(__dirname, "./config.env") });
process.env.NODE_ENV = 'production';
const PORT = process.env.PORT;

app.listen(PORT, () => console.log('Listening at port', PORT));
