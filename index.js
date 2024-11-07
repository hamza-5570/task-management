import "./config/dotenv.js"
import express from 'express';
import dbConnection from "./db/dbConnection.js";
import routes from "./routes/routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 3000;

// Connect to MongoDB
dbConnection();


app.use(express.json(
    {
        limit: "50mb",
    }
));

app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:3000",
        preflightContinue: false,
    }
))

// Use cookie-parser middleware
app.use(cookieParser());

// Routes
app.use("/", routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})