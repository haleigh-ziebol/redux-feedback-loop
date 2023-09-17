import NavBar from '../NavBar/NavBar';
import LoginButtons from '../LoginButtons/LoginButtons';

import Stack from '@mui/material/Stack';

function UserBar(){

    return (

        <div>
            <Stack direction="row" justifyContent="space-between">
                <NavBar />
                <LoginButtons />
            </Stack>
        </div>
    )
}

export default UserBar;