import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cryptoRouter from './routes/cryptoRoutes.js'

const app = express()

app.use(express.json())
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(helmet())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('database connected!');
    })
    .catch((err)=>{
        console.error(err);
    })


const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`server connectd on port ${port}`);
})

app.use('/api/crypto', cryptoRouter)