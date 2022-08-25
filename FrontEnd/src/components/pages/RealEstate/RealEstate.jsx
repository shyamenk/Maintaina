import React, {useEffect, useState} from 'react'

//UI Components

import Button from '../../UI/Button'
import DataTable from '../../UI/DataTable'
import Modal from '../../UI/Modal.jsx'

//Third Party Libraries
import axios from 'axios'

const RealEstate = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const URL = 'http://localhost:3001/home/admin/getProperty'

  useEffect(() => {
    fetchData()
  }, [])

  let columns = []
  if (data === undefined || data === null || data.length === 0) {
  } else {
    columns = Object.keys(data[0]).map(key => {
      const capitalize = key.toLocaleUpperCase()
      return {Header: capitalize, accessor: key}
    })
  }

  const fetchData = async () => {
    await axios
      .get(URL)
      .then(response => setData(response.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }
  const modalOpen = () => {
    console.log(open)
    setOpen(true)
  }
  const onClose = () => {
  
    setOpen(false)
  }
  return (
    <>
      {open && <Modal fetchData={fetchData} onClose={onClose}></Modal>}
      <Button onClick={modalOpen}>ADD-Property</Button>
      {loading && <div>Loading</div>}
      {error && <p>{error.message}</p>}
      {data && <DataTable data={data} columns={columns}></DataTable>}
    </>
  )
}

export default RealEstate
