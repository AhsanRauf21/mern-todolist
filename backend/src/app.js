import express from 'express';
import routes from './routes.js';
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())


app.use(express.json())

app.use('/api/v1',routes)

export default app