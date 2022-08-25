import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'

const URI = process.env.MONGOOSE_DB_URI
const PORT = process.env.PORT || 3001
import dbConnection from '../database/database.js'
import User from '../model/userModel.js'
import authRoutes from '../routes/auth-Routes.js'
import adminRoutes from '../routes/admin-Routes.js'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true}))

//express session
app.use(
  session({
    secret: 's%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
      httpOnly: false,
    },
  }),
)

app.use(cookieParser('s%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A'))
//passport Initialization
app.use(passport.initialize())
app.use(passport.session())

// Database Connection Mongoose
dbConnection(URI)

//passport Local Strategy
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Route Configuration
app.use('/auth', authRoutes)
app.use('/home/admin', adminRoutes)

//Server Configuration
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
