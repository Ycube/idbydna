import Router from './routes'
import cors from 'cors'
import express from 'express'
import { join } from 'path'

export default function (app) {
  
  app.use(cors())
  app.use(express.static(join(__dirname, '../dist')));
  let router = express.Router()

  app.use('/', router)
  Router(router)
}
