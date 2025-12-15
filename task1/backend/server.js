import express from 'express'
import cors from 'cors'
import generateFromSchema from './generator.js'

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors()) // Allow requests from your frontend

app.post('/api/data', (req, res) => {
  res.json({
    success: true,
    message: 'Data received successfully',
    receivedData: generateFromSchema(req.body),
  })
})

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
