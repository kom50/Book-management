import express, { type Application } from 'express'
import path from 'path'
import cors from 'cors'

const app: Application = express()
const port = process.env.PORT || 5000

// App configurations
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

const dummyData = [
    {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false
    },
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false
    },
    {
        userId: 1,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false
    }
]

app.get('/app', (req, res) => {
    res.json(dummyData)
})

app.get('/test', (req, res) => {
    res.send('<h1> Hello from server side </h1>')
})

// For production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist/')))

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })

    console.log = () => { }
}

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))
