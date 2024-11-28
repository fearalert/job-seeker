import React, { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

function Navbar() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Jobs', path: '/jobs' },
  ];

  const moreOptions = [
    { title: 'Employer Portal', path: '/login/employer' },
    { title: 'JobSeeker Portal', path: '/login/job-seeker' },
  ];

  return (
    <Box sx={{ marginBottom: 8 }}>
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: theme.palette.primary.dark }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: theme.palette.background.paper,
              textDecoration: 'none',
            }}
            component={NavLink}
            to="/"
          >
            JobScan
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.title}
                component={NavLink}
                to={item.path}
                sx={{
                  color: theme.palette.primary.contrastText,
                  '&.active': {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                {item.title}
              </Button>
            ))}

            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <Button
                onClick={toggleMenu}
                sx={{
                  color: theme.palette.text.primary.contrastText,
                  fontWeight: 200,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                More
              </Button>

              {menuOpen && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: 'full',
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[3],
                    borderRadius: 1,
                    padding: 1,
                    zIndex: 1,
                  }}
                >
                  {moreOptions.map((option) => (
                    <Button
                      key={option.title}
                      component={NavLink}
                      to={option.path}
                      sx={{
                        display: 'block',
                        textAlign: 'left',
                        width: '100%',
                        color: theme.palette.text.primary,
                        padding: '16px 16px',
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {option.title}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          <IconButton
            edge="end"
            color="background.paper"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' , backgroundColor: theme.palette.primary.dark} }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: 2 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Typography variant="h6" sx={{ marginBottom: 2, color: theme.palette.primary.dark }}>
            Menu
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.title} component={NavLink} to={item.path}>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
              {!isAuthenticated &&
                <List>
                    {moreOptions.map((option) => (
                      <ListItem button key={option.title} component={NavLink} to={option.path}>
                        <ListItemText primary={option.title} />
                      </ListItem>
                    ))}
                </List>
              }
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
