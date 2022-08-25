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
import Sidebar from './components/shared/MainHeader/Sidebar'
import Admin from './components/pages/Admin/Admin'
import Settings from './components/pages/Settings/Settings'
import RealEstate from './components/pages/RealEstate/RealEstate'
import Inventory from './components/pages/Inventory/Inventory'
import Service from './components/pages/Service/Service'
const App = () => {
  const ctx = useContext(AuthContext)

  return (
    <React.Fragment>
      <MainHeader />
      <Sidebar />
      <Routes>
        <Route path="/" element={!ctx.isLoggedIn && <Register />} />
        <Route exact path="/login" element={!ctx.isLoggedIn && <Login />} />

        <Route path="home" element={ctx.isLoggedIn && <Home />}>
          <Route path="admin" element=<Admin />>
            <Route path="realestate" element=<RealEstate /> />
            <Route path="inventory" element=<Inventory /> />
            <Route path="service" element=<Service /> />
          </Route>

          <Route path="users" element=<Users /> />
          <Route path="tenants" element=<TenantsList /> />
          <Route path="settings" element=<Settings /> />
          <Route path="*" element=<NotFound /> />
        </Route>

        <Route path="*" element=<NotFound /> />
      </Routes>
    </React.Fragment>
  )
}

export default App
