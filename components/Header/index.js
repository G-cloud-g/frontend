import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const router = useRouter();
  useEffect(() => {
    //redirection code on condition
    if (localStorage.getItem('UserType')) {
      setUserType(localStorage.getItem('UserType'));
    }
    // else router.push('/');
    // console.log('type user ', userType);
    setOpen(localStorage.getItem('token') === null);
  }, [userType]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const onhandleClick = (val) => {
  //   console.log('val ', val);
  //   if (val == 'Logout') {
  //     localStorage.clear();
  //     window.location.replace('/');
  //   }
  //   if (val == 'Profile') {
  //     router.push('/profile');
  //   }
  // };
  // console.log('router.pathname ', user);
  return (
    <AppBar
      position="static"
      sx={{
        // background: 'rgb(2,0,36)',
        zIndex: 99,
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,14,146,0.8018557764902836) 41%, rgba(0,212,255,1) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: open ? 'space-between' : 'null',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() =>
              !open ? router.push('/dashboard') : router.push('/')
            }
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              cursor: 'pointer',
            }}
          >
            LOGO
          </Typography>
          {!open && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() =>
              !open ? router.push('/dashboard') : router.push('/')
            }
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          {!open && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {open ? (
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: '#fff' }}
                onClick={() =>
                  router.pathname === '/' ||
                  router.pathname === '/signup' ||
                  router.pathname.split('/')[2] === `[id]` ||
                  router.pathname === '/EmployeeLogin'
                    ? router.push('/AdminLogin')
                    : router.push('/EmployeeLogin')
                }
              >
                {router.pathname === '/' ||
                router.pathname === '/signup' ||
                router.pathname.split('/')[2] === `[id]`
                  ? // router.pathname === '/EmployeeLogin'
                    'Admin or Employee login'
                  : router.pathname === '/EmployeeLogin'
                  ? 'Admin login'
                  : 'Employee Login'}
              </Button>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      // src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push('/profile');
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  {userType === 'Admin' && (
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        router.push('/createEmployee');
                      }}
                    >
                      <Typography textAlign="center">
                        Create Employee
                      </Typography>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push('/dashboard');
                    }}
                  >
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>{' '}
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push('/dashboard');
                    }}
                  >
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>{' '}
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      localStorage.clear();
                      window.location.replace('/');
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
