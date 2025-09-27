import React from 'react'
import { useState, useEffect } from "react";
import { Box, List, ListItemButton, ListItemText, Drawer, Toolbar, Divider, Typography } from "@mui/material";
import { Link, useLocation, Outlet } from "react-router-dom";

const drawerWidth = 240;

function ProfilePage() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
    { text: "Profil", path: "/profile/profile" },
    { text: "Favoriler", path: "/profile/favorites" },
    { text: "Şifre Değiştir", path: "/profile/passwordchange"}
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if(e.clientX <= 30) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
        <Drawer
            variant='temporary'
            open={open}
            onClose={() => setOpen(false)}
            ModalProps={{keepMounted: true}}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    overflowX: "hidden",
                },
            }}
        >
            <Toolbar>
                <Typography variant='h5' fontWeight={700}>
                    Profil Yönetimi
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {
                    menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{justifyContent: "initial", px: 2.5}}
                        >
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    ))
                }
            </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow:1, p: 3}}>
            <Outlet />
        </Box>
    </Box>
  )
}

export default ProfilePage