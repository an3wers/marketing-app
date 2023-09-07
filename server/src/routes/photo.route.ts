import { Router } from 'express'
import { getAll, create } from '../controllers/photo.controlle'

const router = Router()

router.get('/photos', getAll)
router.post('/photos', create)

export { router }
