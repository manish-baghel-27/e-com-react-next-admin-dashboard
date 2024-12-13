// "use client"

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setOpen } from '@/lib/store/features/drawer/drawerSlice';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import navLinks  from '@/routes/navLinks';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const open = useAppSelector(state=>state.drawer.open);

  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {navLinks.map((link, index)=>{
          const isActive = pathname.startsWith(link.href);
          return(
            <Link key={index} href={link.href} style={{textDecoration: 'none', color: 'inherit'}}>
              <ListItem disablePadding>
                <ListItemButton selected={isActive}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                    <ListItemText primary={link.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
      </List>
      <Divider />
    </Drawer>
  );
}