import React from 'react'
import Input from '../../UI/Input'
import Card from '../../UI/Card'
import classes from './TenantsList.module.css'
import {Link, Outlet} from 'react-router-dom'
import List from '../../UI/List'
const TenantsList = () => {
  return (
    <Card className={classes.tenants}>
      <h1>TenantsList</h1>
      <Input label="Search By ID" type="search" placeholder="Search ..." />
      <List />

      <nav className={classes.nav}>
        <Link to="categories">CATEGORY</Link>
        <Link to="managers">MANAGE</Link>
      </nav>
      <Outlet />
    </Card>
  )
}

export default TenantsList