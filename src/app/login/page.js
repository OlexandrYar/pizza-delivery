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

import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';


export default function SimpleContainer() {

  const [open,setOpen] = React.useState(false);

  const [email,setEmail] = React.useState('');
  const [pass,setPassword] = React.useState('');

  const toggleDrawer = (newOpen) => () =>{
    setOpen(newOpen);
  }

  const handleSubmit = () =>{
    runDBCall(`http://localhost:3000/api/login?email=${email}&pass=${pass}`);
  }


async function runDBCall(url){
  const res = await fetch(url);
  const data =  await res.json();
  
  if(data.data == "valid"){
    localStorage.setItem("userEmail", email);
    window.location="/dashboard";
  }
  else{
    alert("Error: Invalid credentials!");
  }
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
          </Toolbar>
          </Container>
      </AppBar>

      <Grid container gap={1} direction="column" sx={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
          <Typography paddingTop={10} variant='h1'>Log in</Typography>
          <TextField id="email" type='email' label="Email" value={email} variant="filled" onChange={(e)=> setEmail(e.target.value)}/>
          <TextField id="password" type='password' label="Password" value={pass} variant="filled" onChange={(e)=> setPassword(e.target.value)}/>
          <Typography variant='p'>Don't have an account? <Link href ="/register">Register</Link></Typography>
          <Button variant='contained' onClick={handleSubmit}>Log In</Button>
      </Grid>

    </Box>
  );
}   