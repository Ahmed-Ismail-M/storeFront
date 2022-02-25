import express from 'express'
import path from 'path'
const ToDO: express.Router = express.Router()
const fs = require('fs')
ToDO.get(
  '/',
  (req, res)=> res.send('working')
)
export default ToDO
