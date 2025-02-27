
'use client';

import { useState } from "react";
import Header from "./header";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from "./nav";
import Main from "./main";

const defaultTheme = createTheme({
  components : {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none'
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          textTransform: 'none'
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          padding: '10px 16px',
          fontSize: '13px'
        },
        head: {
          color: 'rgb(99, 115, 129)',
          backgroundColor: 'rgb(244, 246, 248)',
          fontWeight: 500,
          fontFamily: 'inherit',
          borderBottom: '1px solid rgb(241, 243, 244)',
        },
      },
    },
  },
  palette: {
      primary: {
        main: '#1B459C',
      },
    },
});

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [openNav, setOpenNav] = useState(false);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </ThemeProvider>
  )
}
