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
        origin: ["https://task-project-tau-ten.vercel.app", "http://localhost:3000"],
        credentials: true
    }
))

app.get("/", (req, res) => {
    res.send("Hello World");
})

// Use cookie-parser middleware
app.use(cookieParser());

// Routes
app.use("/", routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})