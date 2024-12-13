'use client'

import { Box, Container, CssBaseline, Grid, ThemeProvider, Toolbar, Typography, createTheme, styled } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import { useAppSelector } from "@/lib/store/hooks";
import AdminNavBar from "@/ui-component/layout/navbar/adminNavBar";
import Sidebar from "@/ui-component/layout/sidebar/sidebar";
import Footer from "@/ui-component/layout/footer/footer";
import { CustomComponents } from "@/ui-component";

const drawerWidth = 240;

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Layout = ({children}: Readonly<{children: React.ReactNode;}>)=>{
  const ConfirmDialog = CustomComponents.ConfirmDialog;
  const SnackbarNotification = CustomComponents.SnackbarNotification;

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const darkThemeChosen = useMemo(
    () =>
        createTheme({
          ...darkTheme
        }),
    [mode],
  );

  const lightThemeChosen = useMemo(
    () =>
        createTheme({
            ...lightTheme,
        }),
    [mode],
  );

  const open = useAppSelector(state=>state.drawer.open);

  return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}>
        <CssBaseline />
        <AdminNavBar ColorModeContext={ColorModeContext}/>
        <Sidebar/>
        <Box sx={{paddingLeft: '240px'}}>
          <Main open={open}>
            <DrawerHeader/>
              {children}
              <ConfirmDialog/>
              <SnackbarNotification/>
            <Footer/>
          </Main>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default Layout;