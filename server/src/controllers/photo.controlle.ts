import { Request, Response } from 'express'
import { Photo } from '../models/photo.model'
import path from 'path'
import { UploadedFile } from 'express-fileupload'

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
    const files = req.files
    const img = files && files.img && (files.img as UploadedFile)

    if (img) {
      img.mv(path.resolve(path.resolve(), 'static', img.name))
      const responseCreate = await Photo.create({
        title,
        description,
        path: img.name,
        order
      })
      res.status(201).json({ message: 'created', data: responseCreate })
    } else {
      res.status(400).json({ message: 'Добавьте изображение' })
    }
  } catch (error) {
    console.log(error)
  }
}

const updateItem = async (req: Request, res: Response) => {}

export { getAll, create }
