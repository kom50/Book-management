import express, { NextFunction, type Application, Response, Request } from 'express'
import path from 'path'
import connectDb from './src/db/connection'
import { Db } from 'mongodb'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'

import authRoutes from './src/routes/auth.route'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 5000

const API = '/api/v1'

// App configurations
app.use(express.json())
app.use(cookieParser())

app.disable('x-powered-by')

const DB_URL = process.env.DB_URL || ''
const DB_NAME = process.env.DB_NAME || ''
let db: Db | null = null

connectDb(DB_URL, DB_NAME).then((dbCon) => {
    db = dbCon
    app.set('db', db)

    console.log(`Connecting to database at ${DB_URL}/${DB_NAME}`)
}).catch((er) => {
    console.log(er)
})

// App config
app.set('SECRET_KEY', process.env.SECRET_KEY)

app.get(`${API}/users`, async (req, res) => {
    const users = await db?.collection('users').find().toArray()
    console.log(users)
    res.json(users)
})

// for authentication
app.use(`${API}/auth`, authRoutes)

// For production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist/')))

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })

    console.log = () => { }
}

// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('🚀 ~ file: index.ts:55 ~ app.use ~ err:', err)
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
})

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))
