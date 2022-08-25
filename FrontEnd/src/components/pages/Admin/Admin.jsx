import React, {useState} from 'react'
import {Link, Outlet} from 'react-router-dom'

import Card from '../../UI/Card'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import RoofingIcon from '@mui/icons-material/Roofing'
import ManageAccounts from '@mui/icons-material/ManageAccounts'

import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'

const Admin = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      {/* <Card className={classes.admin}>
        <h1>Admin Panel</h1>
      </Card> */}
      <Card>
        <Box sx={{width: '100%', padding: '0px', borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              icon={<HolidayVillageIcon />}
              iconPosition="start"
              label="Real Estate"
              component={Link}
              to="realestate"
            />
            <Tab
              label="INVENTORY"
              component={Link}
              to="inventory"
              icon={<PeopleAltIcon />}
              iconPosition="start"
            />
            <Tab
              label="SERVICE"
              component={Link}
              to="service"
              icon={<RoofingIcon />}
              iconPosition="start"
            />
            <Tab
              label="MaintenanceS"
              component={Link}
              to="settings"
              icon={<ManageAccounts />}
              iconPosition="start"
            />
            <Tab
              label="Technician"
              component={Link}
              to="settings"
              icon={<ManageAccounts />}
              iconPosition="start"
            />
            <Tab
              label="Service Reqst"
              component={Link}
              to="settings"
              icon={<ManageAccounts />}
              iconPosition="start"
            />
          </Tabs>
          <Outlet />
        </Box>
      </Card>
    </>
  )
}

export default Admin
