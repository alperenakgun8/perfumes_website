import { useState } from "react";
import { Box, List, ListItemButton, ListItemText, Drawer, Toolbar, Divider } from "@mui/material";
import { Link, useLocation, Outlet } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 5;

function AdminPage() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: "Concentrations", path: "/admin/concentration" },
    { text: "Notes", path: "/admin/note" },
    { text: "Perfumes", path: "/admin/perfume" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s",
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{ justifyContent: open ? "initial" : "center", px: 2.5 }}
            >
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet /> {/* Nested route’lar buraya render olacak */}
      </Box>
    </Box>
  );
}

export default AdminPage;
