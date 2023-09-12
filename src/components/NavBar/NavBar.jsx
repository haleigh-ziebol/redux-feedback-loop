import React, {useState} from 'react';

//import Components
import Home from '../Home/Home';
import Admin from '../Admin/Admin';

//MUI components
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function NavBar() {
    const [currentTabIndex, setCurrentTabIndex] = useState('0');

    const handleTabChange = (e,value) => {
        setCurrentTabIndex(value);
    };

  return (
    <div>
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={currentTabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="primary tabs example"
            >
                <Tab value='0' icon={<HomeIcon />}/>
                <Tab value='1' icon={<AdminPanelSettingsIcon/>} />
            </Tabs>
        </Box>
        {currentTabIndex ==='0' && (
            <Home />
        )}
        {currentTabIndex ==='1' && (
            <Admin />
        )}
        
    </div>
  );
}
export default NavBar;