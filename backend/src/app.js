import express from 'express';
import routes from './routes.js';
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors({
  origin:`${process.env.FRONTEND_URL}`,
      methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))


app.use(express.json())

app.use('/api/v1',routes)

export default app