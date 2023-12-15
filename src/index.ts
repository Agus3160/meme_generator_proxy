import express from 'express'
import cors from 'cors'
import meme from './routes/memeRoute'

const app = express()
app.use(cors({ origin: 'https://meme-generator-w72c.onrender.com' }))
app.use(express.json())
app.use('/memes', meme)

const PORT = 3030

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})