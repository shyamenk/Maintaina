import mongoose from 'mongoose'

const dbConnection = uri => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(result => {
      console.log('Connected to:', result.connection._connectionString)
    })
    .catch(err => console.log('Errorerror connecting to the database', err))
}

export default dbConnection
