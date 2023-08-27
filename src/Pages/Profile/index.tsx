import { Avatar, Card, CardActionArea, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'

export default function Profile({user}:any) {
  return (
    <Container style={{height: 'calc(100vh - 128px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card style={{width: 350, marginBottom: 10}}>
            <CardActionArea>
                <CardMedia
                    image={user.photoURL}
                    title="Profile Card"
                    style={{height: 400}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.displayName}
                    </Typography>
                    <Typography component="p">
                        {user.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </Container>
  )
}
