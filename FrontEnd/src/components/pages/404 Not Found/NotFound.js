import React from 'react'
import Card from '../../UI/Card'
import classes from './NotFound.module.css'
const NotFound = () => {
  return (
    <Card className={classes.error}>
      <h1>404 Not found!!</h1>
    </Card>
  )
}

export default NotFound
