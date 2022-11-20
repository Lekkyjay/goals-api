import express from 'express'
import { getMe } from '../controllers/user'
import { protect } from '../middlewares/auth'

const router = express.Router()

router.get('/me', protect, getMe)

export default router