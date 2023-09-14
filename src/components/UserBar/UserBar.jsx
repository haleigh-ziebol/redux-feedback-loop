import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';

import Stack from '@mui/material/Stack';

function UserBar(){

    return (

        <div>
            <Stack direction="row" justifyContent="space-between">
                <NavBar />
                <Login />
            </Stack>
        </div>
    )
}

export default UserBar;