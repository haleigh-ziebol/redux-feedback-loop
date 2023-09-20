import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

//child components
import Home from '../Home/Home';
import AdminOrUser from '../AdminOrUser/AdminOrUser';

//MUI components
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Badge from '@mui/material/Badge';

function NavBar() {
    
    const [currentTabIndex, setCurrentTabIndex] = useState('0');
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const authToken = cookies.AuthToken;
    const history = useHistory();

    const flaggedCount = useSelector((store)=>store.flaggedNotificationReducer)

    const handleTabChange = (e,value) => {
        if (!authToken) {
            history.push('/entersite')
            setCurrentTabIndex('0')
        }
        else {
            setCurrentTabIndex(value);
        }
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
        {(currentTabIndex ==='1' && authToken) && (
            <AdminOrUser />
        )}

    </div>
  );

}
export default NavBar;