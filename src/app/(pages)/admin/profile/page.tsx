"use client"

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Card, Divider, Grid, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabPanel } from '@mui/lab';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import HttpsTwoToneIcon from '@mui/icons-material/HttpsTwoTone';
import { CustomComponents } from '@/ui-component';

export default function Profile() {
  const [value, setValue] = useState("1");
  const Breadcrumb = CustomComponents.Breadcrumb;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Breadcrumb pageName="Profile"/>
        <Card sx={{p: 2, boxShadow: 0, borderRadius: '9px'}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab icon={<AccountCircleTwoToneIcon />} iconPosition="start" label="Profile" value="1"/>
                <Tab icon={<BusinessTwoToneIcon />} iconPosition="start" label="Address" value="2"/>
                <Tab icon={<HttpsTwoToneIcon />} iconPosition="start" label="Change Password" value="3"/>
              </Tabs>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{boxShadow: 0, borderRadius: '9px'}}>
                    <Box sx={{ p: 2 }}>
                      <Typography>
                        Profile Picture
                      </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{ p: 2, pt:3, pb:3 }}>
                      <Box sx={{display: 'flex', justifyContent: 'center', pb:2}}>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://berrydashboard.io/assets/avatar-1-Dja0YEDP.png"
                          sx={{ width: 100, height: 100 }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center', pb:2}}>
                        <Typography variant="caption" color="text.secondary">
                          Upload/Change Your Profile Image
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" size='small' sx={{textTransform: 'none'}}>Upload Avatar</Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                {/* edit profile */}
                <Grid item xs={12} md={8}>
                  <Card variant="outlined" sx={{boxShadow: 0, borderRadius: '9px'}}>
                    <Box sx={{ p: 2 }}>
                      <Typography>
                        Edit Account Details
                      </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{p:2}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField id="name" label="Name" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField id="email" label="Email address" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField id="company" label="Company" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField id="country" label="Country" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField id="phone" label="Phone number" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField id="birthday" label="Birthday" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="contained" sx={{textTransform: 'none'}}>Change Details</Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            {/* change password */}
            <TabPanel value="3">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{boxShadow: 0, borderRadius: '9px'}}>
                    <Box sx={{ p: 2 }}>
                      <Typography>
                        Change Password
                      </Typography>
                    </Box>
                    <Divider/>
                    <Box sx={{p:2}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField id="currentPassword" label="Current Password" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField id="newPassword" label="New Password" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField id="confirmPassword" label="Confirm Password" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="contained" sx={{textTransform: 'none'}}>Change Password</Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    </>
  )
}
