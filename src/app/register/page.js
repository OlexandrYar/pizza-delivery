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
  //Form variables
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [address, setAddress] = React.useState('');
  const toggleDrawer = (newOpen) => () =>{
    setOpen(newOpen);
  }

  const handleSubmit = () => {
    runDBCall(`http://localhost:3000/api/register?fname=${fname}&lname=${lname}&username=${username}&email=${email}&password=${password}&address=${address}`);
  }


async function runDBCall(url){
    const res = await fetch(url);
    const data =  await res.json();
    if(data.data == "created"){
        window.location = "/login";
    }
    else{
        alert("Error: Failed to create a user!")
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
            <Typography paddingTop={10} variant='h1'>Register</Typography>
            <Stack direction="row" gap={1} maxWidth={220}>
                <TextField value={fname} onChange={(e)=> setFname(e.target.value)} id="f-name" label="First Name" variant="filled"/>
                <TextField value={lname} onChange={(e)=> setLname(e.target.value)} id="l-name" label="Last Name" variant="filled"/>
            </Stack>
            
            <TextField value={username} onChange={(e)=> setUsername(e.target.value)} id="username" label="Username" variant="filled"/>
            <TextField value={email} onChange={(e)=> setEmail(e.target.value)} id="email" type='email' label="Email" variant="filled"/>
            <TextField value={password} onChange={(e)=> setPassword(e.target.value)} id="password" type='password' label="Password" variant="filled"/>
            <TextField value={address} onChange={(e)=> setAddress(e.target.value)} id="address" label="Delivery Address" variant="filled"/>
            <Typography variant='p'>Already have an account? <Link href ="/login">Log In</Link></Typography>
            <Button onClick={handleSubmit} variant='contained'>Register</Button>
        </Grid>
        

    </Box>
  );
}   