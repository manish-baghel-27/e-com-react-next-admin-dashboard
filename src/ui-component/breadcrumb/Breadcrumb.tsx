import React from 'react';
import { Breadcrumbs, Card, Link, Typography } from '@mui/material'
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';

type Props ={
    pageName: string
};

export default function Breadcrumb(props: Props) {
    const { pageName='' } = props;

    return (
        <>
            <Box sx={{paddingBottom: 3}}>
                <Card sx={{p: 2, boxShadow: 0, borderRadius: '9px'}}>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                    >
                        <div>{pageName}</div>
                        <Breadcrumbs aria-label="breadcrumb" separator="›">
                            <Link
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            href="/admin/dashboard"
                            >
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            </Link>
                            <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                            >
                                List
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                </Card>
            </Box>
        </>
    )
}
