import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';

export default function ToolBar({ handleMenuClick = Function.prototype, title = '', handleOnLogin = Function.prototype, handleOnLogout = Function.prototype, handleOnAbout = Function.prototype }) {

  var btn = false

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {btn ? (
            <React.Fragment>
              <Button color="inherit" onClick={handleOnLogin}>Login</Button>
              <Button color="inherit" onClick={handleOnLogout}>Logout</Button>
              <Button color="inherit" onClick={handleOnAbout}>About</Button>
            </React.Fragment>

          ) : (

            <React.Fragment>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                title='Login'
                sx={{ mr: 1 }}
                onClick={handleOnLogin}
              >
                <LoginIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                title='Logout'
                sx={{ mr: 1 }}
                onClick={handleOnLogout}
              >
                <LogoutIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                title='About'
                sx={{ mr: 0 }}
                onClick={handleOnAbout}
              >
                <InfoIcon />
              </IconButton>
            </React.Fragment>

          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}