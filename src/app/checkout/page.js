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
import Drawer from '@mui/material/Drawer';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function SimpleContainer() {
    const user = localStorage.getItem('userEmail');
    const [open,setOpen] = React.useState(false);
    const [payment, setPayment] = React.useState('cash');
    const [checkoutData, setCheckoutData] = React.useState(null);

    React.useEffect(() => {
        fetch(`http://localhost:3000/api/getCheckoutData?user=${user}`)
            .then((res) => res.json())
            .then((data) => {
                setCheckoutData(data);
            })
    }, [user])

    const logout = () =>{
        localStorage.clear();
        window.location = "/login";
    }

    const toggleDrawer = (newOpen) => () =>{
        setOpen(newOpen);
    }
    const handleSubmit = () =>{
        runDBCall(`http://localhost:3000/api/checkOut?user=${user}&payment=${payment}`);
    }


async function runDBCall(url){
  const res = await fetch(url);
  const data =  await res.json();
  
  if(data.data == "added"){
    window.location="/thankyou";
  }
  else{
    alert("Error: Items can not be added");
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
            <Stack direction="column" padding={5} gap={2}>
            {!user && <>
                <Button href='/login'>Log In</Button>
                <Button href='/register'>Register</Button>
            </>}
            {user && <Button onClick={logout}>Log out</Button>}
            </Stack>
        </Drawer>

        <Container maxWidth="md" sx={{paddingTop: 5}}>
            <Typography variant='h3' align='center' gutterBottom>
            Checkout
            </Typography>

            <Typography variant='h6' gutterBottom sx={{mt: 3}}>
            Your delivery address:
            </Typography>
            <Typography variant='body1'>{checkoutData ? checkoutData.address : "Loading..."}</Typography>

            <Typography variant='h6' gutterBottom sx={{mt: 3}}>
            Order summary:
            </Typography>
            {checkoutData && checkoutData.products.map((item, i) => (
                <Typography key={i} variant='body1'>{item.pname} - €{item.price}</Typography>
            ))}

            <FormControl sx={{mt: 3}}>
            <FormLabel><Typography variant='body1' fontWeight='bold'>Select Payment method:</Typography></FormLabel>
            <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
                <FormControlLabel defaultChecked value="cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="card" control={<Radio />} label="Card" />
            </RadioGroup>
            </FormControl>

            <Stack direction="row" spacing={4} sx={{mt: 4}}>
            <Button variant='outlined' href='/viewCart'>Go back</Button>
            <Button onClick={handleSubmit} variant='outlined'>Confirm</Button>
            </Stack>
        </Container>
        </Box>
    );
}