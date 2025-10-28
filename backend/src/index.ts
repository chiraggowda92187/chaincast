import express from "express"
import cors from "cors"
import { mainRouter } from "./routes"
import { startServer } from "./main"
import 'dotenv/config';
import cookieParser from "cookie-parser"

export const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173","https://chaincast.thrive10xlabs.in"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))



app.get("/health", (req, res) => {
    res.json({
        msg: "Healthy"
    })
})

app.use(mainRouter)


startServer()
