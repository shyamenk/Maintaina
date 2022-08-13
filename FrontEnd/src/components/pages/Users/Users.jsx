import React, {useContext, useEffect, useState} from 'react'

import Card from '../../UI/Card'
import classes from './Users.module.css'
import Table from '../../UI/Table'
import {Typography} from '@mui/material'
import AuthContext from '../../../store/auth-context'
//import Spinner from '../UI/Spinner'
const Users = props => {
  const [isData, setIsData] = useState([])
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    authCtx.fetchUsers().then(function (users) {
      const filteredArray = users.map(
        ({_id, name, username, role, verified}) => ({
          _id,
          name,
          username,
          role,
          verified,
        }),
      )
      setIsData(filteredArray)
    })
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsData])

  return (
    <>
      <Card className={classes.table}>
        <div style={classes.container}>
          <Typography variant="h5" color="secondary">
            User Details
          </Typography>
        </div>
        <Table data={!isData ? [] : isData}></Table>
      </Card>
    </>
  )
}

export default Users
