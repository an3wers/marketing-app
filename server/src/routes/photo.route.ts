import { Router } from 'express'
import {
  getAll,
  createItem,
  removeItem,
  updateItem
} from '../controllers/photo.controller'

const router = Router()

router.get('/photos', getAll)
router.post('/photos', createItem)
router.put('/photos/:id', updateItem)
router.delete('/photos/:id', removeItem)

export { router }
