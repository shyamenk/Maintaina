import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../../store/auth-context'
import classes from './Navigation.module.css'

const Navigation = () => {
  const ctx = useContext(AuthContext)

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <NavLink className={classes.lnk} to="/home">
            Admin
          </NavLink>
        )}
        {ctx.isLoggedIn && (
          <NavLink className={classes.lnk} to="/users">
            Users
          </NavLink>
        )}
        {ctx.isLoggedIn && (
          <NavLink className={classes.lnk} to="/tenants">
            Tenants
          </NavLink>
        )}

        {ctx.isLoggedIn && (
          <a href="/users">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Avatar"
              className={classes.avatar}
            ></img>
          </a>
        )}

        {ctx.isLoggedIn && <button onClick={ctx.onLogout}>Logout</button>}
      </ul>
    </nav>
  )
}

export default Navigation
