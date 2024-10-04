import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

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
    <section className={styles.navbar}>
      <AppBar elevation={10} sx={{ backgroundColor: '#79369f' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            JobScan
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.title}
                style={{ textDecoration: 'none', color: 'inherit' }}
                activeClassName={styles.active}
              >
                <Button color="inherit">{item.title}</Button>
              </NavLink>
            ))}
          </Box>

          <Button 
            variant="outlined" 
            color="primary" 
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
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ width: 250 }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.title} component={NavLink} to={item.path} activeClassName={styles.active}>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
            <ListItem button component={NavLink} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </section>
  );
}

export default Navbar;
