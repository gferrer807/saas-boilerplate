import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { styled } from '@mui/material/styles';
import Logo from './icons/Logo';

const PREFIX = `AdminDashboardLayout`;
const classes = {
  root: `${PREFIX}-root`,
  drawer: `${PREFIX}-drawer`,
  content: `${PREFIX}-content`,
  list: `${PREFIX}-list`,
  listItem: `${PREFIX}-listItem`,
  footer: `${PREFIX}-footer`,
}
const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
     display: 'flex',
    },
    [`& .${classes.drawer}`]: {
      background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
      width: 180,
    },
    [`& .${classes.content}`]: {
      flexGrow: 1,
      padding: 24,
    },
    [`& .${classes.list}`]: {
      width: 180,
      textAlign: 'center',
    },
    [`& .${classes.listItem}`]: {},
    [`& .${classes.footer}`]: {
      position: "fixed",
      bottom: 0,
    }
}))

type Props = {
  userId?: string;
  children?: React.ReactNode;
  window?: () => Window;
  menuOptions?: Array<string>;
  setActiveWindow: Function;
};

const drawerWidth = 240;

const AdminDashboardLayout = ({ menuOptions, setActiveWindow, children, window }: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getIcon = (text: string) => {
    if (text === 'Create Job') {
      return <AddIcon />
    }
    if (text === 'My Jobs') {
      return <FolderCopyIcon />
    }
    if (text === 'Settings') {
      return <SettingsIcon />
    }
  }

  const drawer = (
    <div>
      <Logo width="100px" height="100"/>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {menuOptions?.map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => setActiveWindow(text)}>
            <ListItemButton>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
