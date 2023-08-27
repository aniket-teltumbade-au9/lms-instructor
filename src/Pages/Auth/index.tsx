import React, { MouseEventHandler } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google'
import { Typography } from '@mui/material';

interface AuthProps {
    type: string,
    handler: MouseEventHandler
}

export default function AuthForm({type, handler}: AuthProps) {
  return (
    <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 128px)'}}>
        <Typography>Start your journey</Typography>
        <Button startIcon={<GoogleIcon />} onClick={handler}>{type} with Google</Button>
    </Container>
  )
}
