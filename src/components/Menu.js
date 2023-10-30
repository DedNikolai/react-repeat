import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { logOut } from "../store/slice/userSlice";


export default function Menu() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  
  const userLogOut = () => dispatch(logOut())

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={NavLink} to={'/'} sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Typography variant="h6" component={NavLink} to={'/users'} sx={{ flexGrow: 1 }}>
            Users
          </Typography>
          {
            !user ?
            <>
              <Button component={NavLink} to={'/login'} color="inherit">Login</Button>
              <Button component={NavLink} to={'/registration'} color="inherit">Registration</Button>
            </>
            :
            <>
            <Button component={NavLink} to={'/profile'} color="inherit">{user.firstName} {user.lastName}</Button>
            <Button onClick={userLogOut} color="inherit">LogOut</Button>
            </>
        
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
