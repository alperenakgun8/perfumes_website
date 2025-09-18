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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4f46e5" }}>
      <Toolbar sx={{ width: "90vw" ,display: "flex", justifyContent: "space-between" }}>
        
        {/* Sol kısım: Logo + Yazı */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, letterSpacing: ".1rem" }}
          >
            PERFUMES
          </Typography>
        </Box>

        {/* Orta kısım: Sayfalar */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button sx={{ color: "white" }}>Search by Notes</Button>
          <Button sx={{ color: "white" }}>Perfumes</Button>
          <Button sx={{ color: "white" }}>Blog</Button>
        </Box>

        {/* Sağ kısım: Kullanıcı Menüsü */}
        <Box>
          <Tooltip title="Open menu">
            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Account</MenuItem>
            <MenuItem component={Link} to="/admin/concentration" onClick={handleCloseMenu}>Admin Panel</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
