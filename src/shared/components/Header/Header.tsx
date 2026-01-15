import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '../../../assets/logo1.png';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { logout } from '../../../features/users/slices/userSlice';
import { BASE_URL } from '../../../config/axiosInstance';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const baseurl = BASE_URL;
  const user = useSelector((state: RootState) => state.user.user);

  let isAuthenticated = false;
  let isAdmin = false;
  let isSuperAdmin = false;

  if (user._id) {
    isAuthenticated = true;
    if (user.role === 'ADMIN') isAdmin = true;
    else if (user.role === 'SUPER_ADMIN') isSuperAdmin = true;
  }

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const pages = [
    { label: 'Nota Bazlı Arama', path: '/' },
    { label: 'Parfümler', path: '/perfumes' },
    // { label: 'Forum', path: '/forum' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    dispatch(logout());
    setAnchorElUser(null);
    navigate('/');
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Menü
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem
            key={page.label}
            component={Link}
            to={page.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="absolute" sx={{ width: '100%', backgroundColor: '#3A632E' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Sol taraf: Menü butonu (mobilde) + Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }}
              onClick={handleDrawerToggle}
            >
              <FaBars />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: 50, marginRight: 8, marginLeft: 10 }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'white',
                }}
              >
                𝒦𝑜𝓀𝓊𝓃𝓊 𝐵𝓊𝓁
              </Typography>
            </Box>
          </Box>

          {/* Orta taraf: Menü (sadece büyük ekranlarda) */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 3,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                sx={{ color: 'white', fontWeight: 600 }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Sağ taraf: Kullanıcı menüsü */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Kullanıcı menüsü">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={user.profile_picture ? `${baseurl}${user.profile_picture}` : undefined}
                  alt={user.nickname}
                >
                  {user.first_name?.[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {isAuthenticated
                ? [
                    <MenuItem
                      component={Link}
                      to="/profile/profile"
                      key="profile"
                      onClick={handleCloseUserMenu}
                    >
                      Profil
                    </MenuItem>,
                    (isAdmin || isSuperAdmin) && (
                      <MenuItem
                        key="admin"
                        component={Link}
                        to="/admin/concentration"
                        onClick={handleCloseUserMenu}
                      >
                        Admin Panel
                      </MenuItem>
                    ),
                    <MenuItem key="logout" onClick={handleLogout}>
                      Çıkış Yap
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="login"
                      component={Link}
                      to="/login"
                      onClick={handleCloseUserMenu}
                    >
                      Giriş Yap
                    </MenuItem>,
                    <MenuItem
                      key="register"
                      component={Link}
                      to="/register"
                      onClick={handleCloseUserMenu}
                    >
                      Kayıt Ol
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (mobil menü) */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;
