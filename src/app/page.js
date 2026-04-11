'use client'

import * as React from 'react';


import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box'

import Image from 'next/image'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';



export default function SimpleContainer() {
  const user = localStorage.getItem('userEmail');

  const [open,setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () =>{
    setOpen(newOpen);
  }
  const logout = () =>{
     localStorage.clear();
     window.location = "/login";
  }
  


  return (
    <Box>
      <AppBar position='static'>
        <Container maxWidth="xxl" >
          <Toolbar sx={{gap:3}}>

            <IconButton href='/' sx={{p:0}}>
              <Image src="/Logo.png" 
                alt="Logo" 
                width={100} 
                height={100}/>
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <ButtonGroup variant="contained" size='large'>
              <Button variant='contained' href='/dashboard'>Menu</Button>
              <Button variant='contained' href='/viewCart' >Cart</Button>
            </ButtonGroup>
            <Button onClick={toggleDrawer(true)}>
              <Avatar/>
            </Button>
            
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
        <Stack direction="column" padding={5} gap={2  }>
          {!user && <>
              <Button href='/login'>Log In</Button>
              <Button href='/register'>Register</Button>
          </>}
          {user && <Button onClick={logout}>Log out</Button>}
        </Stack>
        
      </Drawer>

      <Grid paddingTop={10}  sx={{display: '  flex',justifyContent: 'center', alignItems: 'center'}} container spacing={2} >
        <Grid size={8}>
          <Stack spacing={2}>
            <Typography variant='h1' gutterBottom>
              FRESH PIZZA DELIVERY
            </Typography>
            <Typography variant='span' gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco l
              aboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
              velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Button sx={{width:300}} variant='contained' href='/dashboard'>Order now!</Button>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Image src="/images/pizza-man.png" width={500} height={100} alt="Pizza delivery man" />
        </Grid>
      </Grid>

      <Divider sx={{ borderBottomWidth: 2, bgcolor: "white" }} />


      <Grid sx={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant='h1' alignContent='center'>Special Offers</Typography>
      </Grid>
      <Grid container direction="row" sx={{display: 'flex',justifyContent: 'center', alignItems: 'center'}} spacing={2} paddingTop={5}>
        
        <Card sx={{maxWidth:345}}>
          <CardMedia>
            <Image src="/images/pizza-man.png" width={500} height={100} alt="Pizza delivery man"></Image>
          </CardMedia>
          <CardContent>
            <Typography variant='h5'>Sample Pizza</Typography>  
            <Typography variant='span'>Amazingly delisious pizza</Typography>
            <Typography variant='body1'>Price: 999$</Typography>
          </CardContent>
          <CardActions>
            <Button>Add to cart</Button>
          </CardActions>
        </Card>
        
      </Grid>
        
        

    </Box>
  );
}