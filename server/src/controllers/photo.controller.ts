import { Request, Response } from 'express'
import { Photo } from '../models/photo.model'
import path from 'path'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import fsPromises from 'fs/promises'

interface PhotoRequestCreate {
  title: string
  description: string
  order: number
}

interface PhotoRequestUpdate extends PhotoRequestCreate {
  like_qty: number
  dislike_qty: number
}

const getAll = async (req: Request, res: Response) => {
  try {
    const responsePhoto = await Photo.findAll()
    // sort by order
    responsePhoto.sort((a, b) => a.order - b.order)
    res.status(200).json({ message: '', data: responsePhoto })
  } catch (error) {
    let message = ''
    if (error instanceof Error) {
      message = error.message
    } else {
      message = JSON.stringify(error)
    }
    res.status(500).json({ message })
  }
}

const createItem = async (
  req: Request<{}, {}, PhotoRequestCreate>,
  res: Response
) => {
  try {
    const { title, description, order } = req.body
    const files = req.files
    const img = files && files.img && (files.img as UploadedFile)

    if (img) {
      const imgPath = path.resolve(path.resolve(), 'static', img.name)

      if (fs.existsSync(imgPath)) {
        throw new Error('Файл уже существует')
      } else {
        img.mv(imgPath)
        const responseCreate = await Photo.create({
          title,
          description,
          path: img.name,
          order
        })

        res.status(201).json({ message: 'created', data: responseCreate })
      }
    } else {
      res.status(400).json({ message: 'Добавьте изображение' })
    }
  } catch (error) {
    let message = ''
    if (error instanceof Error) {
      message = error.message
    } else {
      message = JSON.stringify(error)
    }
    res.status(500).json({ message })
  }
}

const updateItem = async (
  req: Request<{ id: number }, {}, PhotoRequestUpdate>,
  res: Response
) => {
  try {
    const { id } = req.params
    const { title, description, like_qty, dislike_qty, order } = req.body
    const resUpdated = await Photo.update(
      { title, description, like_qty, dislike_qty, order },
      { where: { id } }
    )

    res.status(200).json({ message: 'updated', resUpdated })
  } catch (error) {
    let message = ''
    if (error instanceof Error) {
      message = error.message
    } else {
      message = JSON.stringify(error)
    }
    res.status(500).json({ message })
  }
}

const removeItem = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params
    const foundPhoto = await Photo.findByPk(id)
    if (foundPhoto) {
      const { path: img } = foundPhoto.dataValues
      const rmImgPath = path.resolve(path.resolve(), 'static', img)

      // Удаление файла
      const resRemoved = await Photo.destroy({ where: { id } })
      await fsPromises.unlink(rmImgPath)

      res.status(200).json({ message: 'removed', data: resRemoved })
    } else {
      throw new Error('Item not found')
    }
  } catch (error) {
    let message = ''
    if (error instanceof Error) {
      message = error.message
    } else {
      message = JSON.stringify(error)
    }
    res.status(500).json({ message })
  }
}

export { getAll, createItem, removeItem, updateItem }
