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
import CardActionArea from '@mui/material/CardActionArea';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function SimpleContainer() {
  const user = localStorage.getItem('userEmail');

  if (!user) window.location = "/login";

  const [open,setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () =>{
    setOpen(newOpen);
  }

  const [alignment, setAlignment] = React.useState('web');
  const [data,setData] = React.useState(null);
  const [category, setCategory] = React.useState("pizza");

  const logout = () =>{
     localStorage.clear();
     window.location = "/login";
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  
  const changeCategory = (event, value) =>{
    setCategory(value);
  }

  React.useEffect(()=>{
    fetch("http://localhost:3000/api/getProducts")
    .then((res) => res.json())
    .then((data)=>{
      setData(data)
    })
  },[])

  if (!data) return <p>Loading...</p>
  


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


        <ToggleButtonGroup sx={{display: 'flex',justifyContent: 'center', alignItems: 'center'}} defaultValue="Pizza" color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform" onChange={changeCategory}>
          <ToggleButton value="pizza">Pizza</ToggleButton>
          <ToggleButton value="sides">Sides</ToggleButton>
          <ToggleButton value="desserts">Desserts</ToggleButton>
          <ToggleButton value="drinks">Drinks</ToggleButton>
        </ToggleButtonGroup>



        <Grid container direction="row" sx={{display: 'flex',justifyContent: 'center', alignItems: 'center'}} spacing={2} paddingTop={5}>
          
          {
            data.filter((item) => item.category === category).map((item, i) => (
              <CardActionArea sx={{minWidth:400,maxWidth:400,maxHeight:500, minHeight:500}} key={i} href={`/viewSingleProduct?id=${item._id}`} >
                <Card sx={{minWidth:400,maxWidth:400,maxHeight:500, minHeight:500}}>

                  <CardMedia sx={{ height: 250, position: 'relative', overflow: 'hidden' }}>
                      <Image src={item.image} fill style={{ objectFit: 'cover' }} alt={item.pname} />
                  </CardMedia>
                  <CardContent>
                      <Typography variant='h5'>{item.pname}</Typography>  
                      <Typography variant='span'>{item.description}</Typography>
                      <Typography variant='body1'>Price: €{item.cost}</Typography>
                  </CardContent>
              </Card>
            </CardActionArea>
            ))
          }
        
        </Grid>
        
        
    </Box>
  );
}   