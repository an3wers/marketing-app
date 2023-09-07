import { Request, Response } from 'express'
import { Photo } from '../models/photo.model'
import path from 'path'

interface PhotoRequestCreate {
  title: string
  description: string
  order: number
}

const getAll = async (req: Request, res: Response) => {
  try {
    const responsePhoto = await Photo.findAll()
    res.send({ message: '', data: responsePhoto })
  } catch (error) {
    console.log(error)
  }
}

const create = async (
  req: Request<{}, {}, PhotoRequestCreate>,
  res: Response
) => {
  try {
    const { title, description, order } = req.body
    const reqFile = req.files

    console.log('@Create data', title, description, order, reqFile)
    console.log('@Create path', path.resolve(__dirname, 'static'))

    // const responseCreate = await Photo.create({
    //   title,
    //   description,
    //   path,
    //   order
    // })
    // return res.send({ message: '', data: responseCreate })
    res.send({ message: 'Item is created' })
  } catch (error) {
    console.log(error)
  }
}

export { getAll, create }
