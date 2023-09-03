import express, { type Application } from 'express'
import path from 'path'

const app: Application = express()
const port = 5000

app.get('/app', (req, res) => {
    res.json({
        name: 'om',
        vill: 'Mahwal'
    })
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
