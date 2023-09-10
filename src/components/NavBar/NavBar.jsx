import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Home from '../Home/Home';

function ColorTabs() {
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
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value='0' label="Home" />
                <Tab value='1' label="Admin" />
            </Tabs>
        </Box>
        {currentTabIndex ==='0' && (
            <Home />
        )}
        {currentTabIndex ==='1' && (
            <div> </div>
        )}
        
    </div>
  );
}
export default ColorTabs;