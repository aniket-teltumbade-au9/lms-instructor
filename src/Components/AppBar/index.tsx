import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DrawerComponent from '../Drawer';
import { Link, Outlet } from 'react-router-dom';
import fireReact from '../../Utils/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar } from '@mui/material';

const Media = React.forwardRef<HTMLImageElement, any>(({photo}:any, ref: any) => (
  <Avatar alt='avatar' src={photo}/>
));
export default function AppBarComponent() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user] = useAuthState(fireReact.auth);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = ()=>{
    fireReact.auth.signOut()
  }
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
         <DrawerComponent/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Instructor Panel
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {user ?(<Media  photo={user.photoURL}/>) : (<AccountCircle />)}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem><Link to='/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Outlet />
      </React.Fragment>
  );
}
