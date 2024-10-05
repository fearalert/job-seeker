import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';

const MenuButton = ({ item }) => {
  const theme = useTheme();
  return (
    <Button
      key={item.title}
      component={NavLink}
      to={item.path}
      sx={{
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
        '&.active': {
          backgroundColor: theme.palette.primary.light,
        },
      }}
    >
      {item.title}
    </Button>
  );
};

MenuButton.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const DrawerMenu = ({ menuItems }) => {
  const theme = useTheme();
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.title}
          component={NavLink}
          to={item.path}
          sx={{
            textDecoration: 'none',
            color: theme.palette.primary.dark,
            '&.active': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
      <ListItem button component={NavLink} to="/login">
        <ListItemText primary="Login" />
      </ListItem>
    </List>
  );
};

DrawerMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Jobs', path: '/jobs' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Post Application', path: '/post/application/:JobId' },
    { title: 'Register', path: '/register' },
  ];

  return (
    <Box marginBottom={10}>
      <AppBar color='primary' elevation={10} position='fixed'>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            JobScan
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map(item => <MenuButton key={item.index} item={item} />)}
          </Box>
          <Button 
            variant="outlined" 
            sx={{ display: { xs: 'none', md: 'block' }, ml: 2 }}
            component={NavLink} 
            to="/login"
          >
            Login
          </Button>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{ width: 250 }}>
          <DrawerMenu menuItems={menuItems} toggleDrawer={toggleDrawer} />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
