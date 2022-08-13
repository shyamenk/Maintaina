import axios from 'axios'

const fetchRequest = async (method, data, url, headers) => {
  try {
    const response = await axios({
      method: method,
      withCredentials: true,
      // data: data,
      url: url,
    })
    return response.data.message
  } catch (error) {
    console.log(error)
    // return null
  }
}

export default fetchRequest
