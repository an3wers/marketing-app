import { Request, Response } from 'express'
import { Reaction } from '../models/reaction.model'

const createReaction = async (req: Request, res: Response) => {
  try {
    const { reaction } = req.body
    const resReaction = await Reaction.create({ reaction })
    res.status(201).json({ message: 'created', data: resReaction })
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

export { createReaction }
