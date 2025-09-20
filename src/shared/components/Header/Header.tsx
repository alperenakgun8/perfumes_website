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
import { Link } from 'react-router-dom';

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const pages = [
    { label: "Search by Notes", path: "/search" },
    { label: "Perfumes", path: "/perfumes" },
    { label: "Blog", path: "/blog" },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="absolute" sx={{ width: "100%", backgroundColor: "#4f46e5" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: ".1rem" }}>
            PERFUMES
          </Typography>
        </Box>

        {/* Orta Menü (Büyük ekran) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {pages.map((page) => (
            <Button
              key={page.label}
              component={Link}
              to={page.path}
              sx={{ color: "white", fontWeight: 500 }}
            >
              {page.label}
            </Button>
          ))}
        </Box>

        {/* Kullanıcı Menüsü */}
        <Box>
          <Tooltip title="Open menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Account</MenuItem>
            <MenuItem component={Link} to="/admin/concentration" onClick={handleCloseUserMenu}>Admin Panel</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
