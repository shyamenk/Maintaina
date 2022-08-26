import {useEffect, useState} from 'react'
import axios from 'axios'

export const useFetch = url => {
  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  console.log(data)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await axios
        .get(url)
        .then(response => setData(response.data))
        .catch(setError)
        .finally(() => setLoading(false))
    }
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {data, error, loading}
}
