import express from 'express'
import cors from'cors'
import middleware from './middleware'

const app = express();
const PORT = process.env.PORT || 3333


app.set('port', PORT)

middleware(app)

app.listen(PORT)
console.log('App listening on port: ', PORT)