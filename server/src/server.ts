import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { sequelize } from './db/db'
import { router } from './routes/photo.route'
import path from 'path'
import fileUpload from 'express-fileupload'

dotenv.config()

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.get('/api', (req: Request, res: Response) => {
  res.send({ message: 'Hello api' })
})
server.use(fileUpload({}))
server.use(express.static(path.resolve(__dirname, 'static')))
console.log('@path to static', path.resolve(__dirname, 'static'))

server.use('/api', router)

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    server.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
