import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
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

const DrawerMenu = ({ menuItems, onClose }) => {
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
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.contrastText,
            },
          }}
          onClick={onClose}
        >
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
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
  onClose: PropTypes.func.isRequired,
};

function Navbar() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLoginClick = (event) => {
    setShowLoginOptions(!showLoginOptions);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowLoginOptions(false); // Close login options
  };

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Jobs', path: '/jobs' },
    { title: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <Box marginBottom={10}>
      <AppBar elevation={10} position='fixed' sx={{ backgroundColor: theme.palette.primary.dark }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            JobScan
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map(item => (
              <MenuButton key={item.title} item={item} />
            ))}
          </Box>
          <Button 
            variant="register"
            sx={{ display: { xs: 'none', md: 'block' }, ml: 2 }}
            component={NavLink} 
            to="/register"
          >
            Register
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleLoginClick}
            sx={{ display: { xs: 'block', md: 'block' }, ml: 2 }}
          >
            Login
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={showLoginOptions}
            onClose={handleClose}
          >
            <MenuItem component={NavLink} to="/login/job-seeker" onClick={handleClose}>
              Job Seeker
            </MenuItem>
            <MenuItem component={NavLink} to="/login/employer" onClick={handleClose}>
              Employer
            </MenuItem>
          </Menu>
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
          <DrawerMenu menuItems={menuItems} onClose={toggleDrawer(false)} />
          <ListItem button component={NavLink} to="/register" onClick={toggleDrawer(false)}>
            <ListItemText primary="Register" />
          </ListItem>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
