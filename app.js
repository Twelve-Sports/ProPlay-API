import express from 'express'
import routes from './routes.js'
const app = express()
const port = 3001
app.use(routes)

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})