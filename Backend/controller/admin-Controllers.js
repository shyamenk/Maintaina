import Property from '../model/realEstate.model.js'

export const addProperty = (req, res) => {
  const property = new Property(req.body)
  property.save(err => {
    if (err) {
      console.log(err)
      return res.status(500).json({error: err})
    }
  })
  console.log(property)
  res.status(200).json(property)
}

export const getProperty = async (req, res) => {
  console.log('getProperty')
  const property = await Property.find(
    {},
    {_id: 0, building: 1, name: 1, location: 1, features: 1, address: 1},
  )
  if (!property) {
    return res.json({status: 'error', message: 'Not Found'})
    console.log(' NotFound')
  } else {
    // console.log(property)
    res.json(property)
  }
}
