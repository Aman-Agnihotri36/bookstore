import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/authRoutes.js'
import bookRouter from './routes/bookRoutes.js'
import { MongoDbConnect } from "./lib/database.js"
import cors from 'cors'
import job from "./lib/corn.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

job.start()
// Increase body size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors())



app.use("/api/auth", authRoutes)
app.use("/api/book", bookRouter)

app.listen(PORT, () => {
    console.log(`Server Start running at  ${PORT}`)
    MongoDbConnect()
})
