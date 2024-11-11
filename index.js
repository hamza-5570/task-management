import "./config/dotenv.js"
import express from 'express';
import dbConnection from "./db/dbConnection.js";
import routes from "./routes/routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const port = process.env.PORT || 8000;

// Connect to MongoDB
dbConnection();


app.use(express.json(
    {
        limit: "50mb",
    }
));

app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:3000", "https://task-management-diim.onrender.com"],
        credentials: true
    }
))

// Use cookie-parser middleware
app.use(cookieParser());

// Routes
app.use("/", routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})