import express from 'express'
const router = express.Router()

import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
} from '../controller/auth-Controller.js'

router.post('/logout', logoutUser)
router.post('/login', loginUser)
router.post('/register', registerUser)

router.get('/getUsers', getUsers)

export default router
