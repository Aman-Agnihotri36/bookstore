import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/authRoutes.js'
import bookRouter from './routes/bookRoutes.js'
import { MongoDbConnect } from "./lib/database.js"
import cors from 'cors'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors())



app.use("/api/auth", authRoutes)
app.use("/api/book", bookRouter)

app.listen(PORT, () => {
    console.log(`Server Start running at  ${PORT}`)
    MongoDbConnect()
})
