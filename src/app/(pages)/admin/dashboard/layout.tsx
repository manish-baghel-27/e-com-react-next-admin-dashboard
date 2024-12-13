import { Box } from '@mui/material';
import React, { ReactNode } from 'react'

export default function DashboardLayout({
    children,
    users,
    revenue,
    notifications,
}:{
    children: ReactNode;
    users:ReactNode;
    revenue:ReactNode;
    notifications:ReactNode;
}) {
  return (
    <>
      {children}
      <Box>{users}</Box>
      <Box>{revenue}</Box>
      <Box>{notifications}</Box>
    </>
  )
}
