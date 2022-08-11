import passport from 'passport'
import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//user logout handler
export const logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.clearCookie('connect.sid')
    req.session.destroy()
    res.status(200).json({
      success: true,
      message: 'Logout was successfully completed',
    })
  })
}

//user login handler
export const loginUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  })

  req.login(user, function (err) {
    if (err) {
      console.log('Error')

      return res.json({status: 'error', message: err.message})
    } else {
      passport.authenticate('local')(req, res, function () {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        })
        res.status(200).json({
          status: 'ok',
          message: 'Login successfully completed ',
          user: req.user.username,
          token: token,
        })
      })
    }
  })
}

//user regstration handler
export const registerUser = async (req, res) => {
  const {name, username, password} = req.body
  const Users = new User({username: username, name: name})

  await User.register(Users, password, (err, user) => {
    if (err) {
      console.log('Error registering')
      return res.json({status: 'error', message: err.message})
    } else {
      passport.authenticate('local ')(req, res, () => {
        res.status(200).json({
          status: 'ok',
          message: 'Registration successfully completed ',
          user: req.user,
        })
      })
    }
  })
}
