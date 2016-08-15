import Router from './routes'
import cors from 'cors'
import express from 'express'

export default function (app) {
  
  app.use(cors())
  let router = express.Router()

  app.use('/', router)
  Router(router)
}
