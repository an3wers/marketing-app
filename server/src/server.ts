import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { sequelize } from './db/db'
import { router } from './routes/photo.route'
import path from 'path'
import fileUpload from 'express-fileupload'
import cors from 'cors'

dotenv.config()

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())
server.use(fileUpload({}))
server.use(cors({ origin: ['http://localhost:3005', 'http://localhost:3000'], credentials: true }))
server.use(express.static(path.resolve(path.resolve(), 'static')))
server.use('/api', router)

// console.log('@path to static', path.resolve(__dirname, 'static'))

server.get('/api', (req: Request, res: Response) => {
  res.status(200).json({message: 'Hello api'})
})

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    // await sequelize.sync({ force: true })
    await sequelize.sync()
    server.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
