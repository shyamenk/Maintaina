import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'

import Home from './components/pages/Home/Home'
import MainHeader from './components/shared/MainHeader/MainHeader'
import AuthContext from './store/auth-context'
import Register from './components/pages/Register/Register'
import Login from './components/pages/Login/Login'
import Users from './components/pages/Users/Users'
import NotFound from './components/pages/404 Not Found/NotFound'
import TenantsList from './components/pages/Tenants/TenantsList'
const App = () => {
  const ctx = useContext(AuthContext)

  return (
    <React.Fragment>
      <MainHeader />
      <Routes>
        <Route path="/" element={!ctx.isLoggedIn && <Register />} />
        <Route exact path="/login" element={!ctx.isLoggedIn && <Login />} />
        <Route path="/home" element={ctx.isLoggedIn && <Home />} />
        <Route path="/users" element={ctx.isLoggedIn && <Users />} />
        <Route path="/tenants" element={ctx.isLoggedIn && <TenantsList />} />
        <Route path="*" element=<NotFound /> />
      </Routes>
    </React.Fragment>
  )
}

export default App
