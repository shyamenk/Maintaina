import express from 'express'
const router = express.Router()

import {addProperty, getProperty} from '../controller/admin-Controllers.js'

router.post('/addProperty', addProperty)
router.get('/getProperty', getProperty)

export default router
