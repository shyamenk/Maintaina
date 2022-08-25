import React from 'react'

import Navigation from './Navigation'
import classes from './MainHeader.module.css'
import {AppBar} from '@mui/material'

const MainHeader = props => {
  return (
    <>
      <header className={classes['main-header']}>
        <AppBar title={<img alt="logo" src="https://unsplash.it/40/40" />} />
        <h1>Maintaina</h1>
        <Navigation />
      </header>
    </>
  )
}

export default MainHeader
