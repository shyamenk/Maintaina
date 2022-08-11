import express from 'express'
const router = express.Router()

import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controller/auth-Controller.js'

router.post('/logout', logoutUser)
router.post('/login', loginUser)

router.post('/register', registerUser)

export default router
