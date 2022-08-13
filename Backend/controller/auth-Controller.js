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
export const loginUser = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  })
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err) // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.json({
        status: 'error',
        message: 'Please enter a valid username or password',
      })
    }
    req.login(user, function (err) {
      if (err) {
        return next(err)
      } else {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        })
        return res.json({
          status: 'ok',
          message: 'Authentication succeeded',
          token: token,
          user: user,
        })
      }
    })
  })(req, res, next)

  // // req.login(user, function (err, user, info) {
  // //   console.log('Hit login Router')
  // //   console.log(err, user, info)
  // //   if (err) {
  // //     console.log('Error: ' + err.message)
  // //     return res.json({status: 'error', message: err.message})
  // //   } else {
  // passport.authenticate('local'),
  //   function (err, user, info) {
  //     console.log(err, user, info)
  //     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
  //       expiresIn: process.env.JWT_EXPIRES_IN,
  //     })
  //     if (err) {
  //       return res.send(err)
  //     }
  //     // res.status(200).json({
  //     //   status: 'ok',
  //     //   message: 'Login successfully completed ',
  //     //   user: req.user.username,
  //     //   token: token,
  //     // })
  //     // .catch(function (err) {
  //     //   console.log('Error:' + err.message)

  //     //   return res.status(500).json({status: err.status, message: err.message})
  //     // })

  //     //   })
  //     // }
  //   }
  // return res.send('dffrg')
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

export const getUsers = async (req, res) => {
  User.find({}, function (err, users) {
    if (err) {
      return res.status(err)
    } else {
      return res.send({status: 'ok', message: users})
    }
  })
}
