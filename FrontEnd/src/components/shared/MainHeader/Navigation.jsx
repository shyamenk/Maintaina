import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../../store/auth-context'
import classes from './Navigation.module.css'

const Navigation = () => {
  const ctx = useContext(AuthContext)

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <Link to="/home">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Avatar"
              className={classes.avatar}
            ></img>
          </Link>
        )}

        {ctx.isLoggedIn && <button onClick={ctx.onLogout}>Logout</button>}
      </ul>
    </nav>
  )
}

export default Navigation
