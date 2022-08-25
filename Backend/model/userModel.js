import mongoose from 'mongoose'
import isEmail from 'validator'
import bcrypt from 'bcrypt'
import passportLocalMongoose from 'passport-local-mongoose'

const {Schema} = mongoose

const userSchema = new Schema({
  name: 'String',
  username: 'String',
  password: 'String',
  verified: {
    type: 'String',
    default: 'false',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: 'String',
    default: 'tenants',
  },
})

// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose)

// fire a function before doc saved to db
// userSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt()
//   this.password = await bcrypt.hash(this.password, salt)
//   next(){usernameField: 'email'}
// })

// userSchema.statics.login = async function (email, password) {
//   const user = await this.findOne({email})
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password)
//     if (auth) {
//       return user
//     }
//     throw Error('incorrect password')
//   }
//   throw Error('incorrect email')
// }

const User = mongoose.model('User', userSchema)

export default User
