import React, {useMemo} from 'react'

import Card from '../../UI/Card'
import classes from './Users.module.css'
import {useFetch} from '../../../hooks/useFetch'
import {Typography} from '@mui/material'
import DataTable from '../../UI/DataTable'

const Users = props => {
  const url = 'http://localhost:3001/auth/getUsers'

  // Fetch API
  const {data, error, loading} = useFetch(url)
  console.log(data)

  let columns = useMemo(() => [], [])

  if (data === undefined || data === null || data.length === 0) {
  } else {
    columns = Object.keys(data[0]).map(key => {
      const capitalize = key.toLocaleUpperCase()
      return {Header: capitalize, accessor: key}
    })
  }
  //  useMemo(()=>{},[])
  return (
    <>
      <Card className={classes.users}>
        <div>
          <h1>User Details</h1>
        </div>

        {loading && (
          <Typography variant="h5" color="secondary">
            Loading...
          </Typography>
        )}
        {error && <p>{error.message}</p>}

        {data && <DataTable columns={columns} data={data}></DataTable>}
        {/* {useMemo(() => {
          return data && <DataTable columns={columns} data={data}></DataTable>
        }, [columns, data])} */}
      </Card>
    </>
  )
}

export default Users
