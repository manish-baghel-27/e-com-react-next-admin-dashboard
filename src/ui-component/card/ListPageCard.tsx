import { Card } from '@mui/material'
import React from 'react'

export default function ListPageCard(props: any) {
  return (
    <Card sx={{ p: 2, boxShadow: 0, borderRadius: '9px'}}>
        {props.children}
    </Card>
  )
}
