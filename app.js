import express from 'express'
import cors from 'cors';

import routes from './routes.js'

const app = express()
const port = 3002

app.use(cors());
app.use(routes)
app.use('/videos', express.static('videos'));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})