import { Router } from 'express'
import { createReaction } from '../controllers/reaction.controller'

const router = Router()

router.post('/reaction', createReaction)

export { router }
