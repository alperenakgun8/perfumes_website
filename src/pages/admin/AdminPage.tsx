import { useState, useEffect } from "react";
import { Box, List, ListItemButton, ListItemText, Drawer, Toolbar, Divider, Typography } from "@mui/material";
import { Link, useLocation, Outlet } from "react-router-dom";

const drawerWidth = 240;

function AdminPage() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: "Concentrations", path: "/admin/concentration" },
    { text: "Notes", path: "/admin/note" },
    { text: "Perfumes", path: "/admin/perfume" },
    { text: "Users", path: "/admin/user"}
  ];

  // Mouse konumunu takip et
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Eğer mouse sol kenardan 60px içinde ise sidebar aç
      if (e.clientX <= 30) {
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
      {/* Sidebar */}
      <Drawer
        variant="temporary" // geçici drawer, boşluk bırakmaz
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
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
          <Typography variant="h5" fontWeight={700}>
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{ justifyContent: "initial", px: 2.5 }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminPage;
