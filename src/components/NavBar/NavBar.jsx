import React, {useState} from 'react';
import { useSelector } from 'react-redux';

//import Components
import Home from '../Home/Home';
import Admin from '../Admin/Admin';

//MUI components
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Badge from '@mui/material/Badge';

function NavBar() {
    const [currentTabIndex, setCurrentTabIndex] = useState('0');

    const handleTabChange = (e,value) => {
        setCurrentTabIndex(value);
    };

    const flaggedCount = useSelector((store)=>store.flaggedNotificationReducer)

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
                <Tab value='1' 
                icon={(flaggedCount>0)?
                     (<Badge badgeContent={flaggedCount} color="secondary">
                        <AdminPanelSettingsIcon color="action" />
                    </Badge>)
                    :<AdminPanelSettingsIcon/>
                } />
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