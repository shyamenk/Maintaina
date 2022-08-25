import express from 'express'
const router = express.Router()

import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser,
} from '../controller/auth-Controller.js'

router.post('/logout', logoutUser)
router.post('/login', loginUser)
router.post('/register', registerUser)

router.get('/getUsers', getUsers)
router.delete('/delete/:userId', deleteUser)
export default router
