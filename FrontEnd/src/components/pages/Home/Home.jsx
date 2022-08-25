import React, {useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import RoofingIcon from '@mui/icons-material/Roofing'
import ManageAccounts from '@mui/icons-material/ManageAccounts'

const Home = props => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{width: '100%', padding: '0px', borderColor: 'divider'}}>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          icon={<AdminPanelSettingsIcon />}
          iconPosition="start"
          label="Admin"
          component={Link}
          to="admin"
        />
        <Tab
          label="Users"
          component={Link}
          to="users"
          icon={<PeopleAltIcon />}
          iconPosition="start"
        />
        <Tab
          label="Tenants"
          component={Link}
          to="tenants"
          icon={<RoofingIcon />}
          iconPosition="start"
        />
        <Tab
          label="Settings"
          component={Link}
          to="settings"
          icon={<ManageAccounts />}
          iconPosition="start"
        />
      </Tabs>
      <Outlet />
    </Box>
  )
}

export default Home
