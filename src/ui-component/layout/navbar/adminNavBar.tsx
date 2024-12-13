// "use client"

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setOpen } from '@/lib/store/features/drawer/drawerSlice';
import ThemeToggleButton from '../../ThemeToggleButton/ThemeToggleButton';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void; }>,
}

const AdminNavBar = (props: HeaderProps) => {
  const ColorModeContext = (props.ColorModeContext);
  
  const dispatch = useAppDispatch();
  const open = useAppSelector(state=>state.drawer.open);

  const handleDrawerOpen = () => {
    dispatch(setOpen(true));
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <ThemeToggleButton ColorModeContext={ColorModeContext}/>
          
          {/* <Typography variant="h6" noWrap component="div">
            Seva
          </Typography> */}
        </Toolbar>
      </AppBar>
    </>
    //   <Toolbar>
    //     {navLinks.map((link)=>{
    //       const isActive = pathname.startsWith(link.href);
    //       const mystyle = {
    //         color: isActive ? "red" : "",
    //       };
    //       return(
    //         <Link href={link.href} key={link.name} style={mystyle}>{link.name}</Link>
    //       )
    //     })}
    //   </Toolbar>
  );
};

export default AdminNavBar;
