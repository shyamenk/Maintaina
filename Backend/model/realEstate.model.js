import mongoose from 'mongoose'

const {Schema} = mongoose

const propertySchema = new Schema({
  building: 'String',
  name: 'String',
  location: 'String',
  features: 'String',
  address: 'String',
  date: {
    type: Date,
    default: Date.now,
  },
})

const Property = mongoose.model('Property', propertySchema)

export default Property
