import "./config/dotenv.js"
import express from 'express';
import dbConnection from "./db/dbConnection.js";
import routes from "./routes/routes.js"
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

// Use cookie-parser middleware
app.use(cookieParser());

// Routes
app.use("/", routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})