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
import { useSearchParams } from 'next/navigation';


export default function SimpleContainer() {
    const user = localStorage.getItem('userEmail');
    const searchParams = useSearchParams();
    const id = searchParams.get("id")
    const [product, setProduct] = React.useState(null);

    React.useEffect(() => {
        if (!user) window.location = "/login";
    }, []);

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState('');
    const [topping, setTopping] = React.useState('');
    const [extra, setExtra] = React.useState('');

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }

    React.useEffect(() => {
        fetch(`/api/getSingleProduct?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.item)
            })
    }, [id])

    if (!product) return <p>Loading...</p>

    const handleClick = () =>{
        runDBCall(`/api/addToCart?id=${id}&user=${user}`);
    }
    const logout = () =>{
        localStorage.clear();
        window.location = "/login";
    }

async function runDBCall(url){
    const res = await fetch(url);
    const data =  await res.json();
    
    if(data.data == "added"){
        window.location="/dashboard";
    }
    else{
        alert("Error: Unable to add to cart");
    }
}


    return (
        <Box>
            <AppBar position='static'>
                <Container maxWidth="xxl" >
                    <Toolbar sx={{ gap: 3 }}>

                        <IconButton href='/' sx={{ p: 0 }}>
                            <Image src="/Logo.png"
                                alt="Logo"
                                width={100}
                                height={100} />
                        </IconButton>

                        <Box sx={{ flexGrow: 1 }} />

                        <ButtonGroup variant="contained" size='large'>
                            <Button variant='contained' href='/dashboard'>Menu</Button>
                            <Button variant='contained' href='/viewCart' >Cart</Button>
                        </ButtonGroup>
                        <Button onClick={toggleDrawer(true)}>
                            <Avatar />
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

            <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
                <Grid container spacing={4}>
                    <Grid size={5}>
                        <Image src={product.image} width={400} height={350} style={{ border: '1px solid #ccc' }} alt={product.pname} />
                    </Grid>
                    <Grid size={7}>
                        <Typography variant='h3' gutterBottom>
                            {product.pname}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            {product.description}
                        </Typography>

                        <Typography variant='h4' gutterBottom sx={{ mt: 2 }}>
                            Select
                        </Typography>

                        <FormControl>
                            <FormLabel><Typography variant='h5'>Size:</Typography></FormLabel>
                            <RadioGroup value={size} onChange={(e) => setSize(e.target.value)}>
                                <FormControlLabel value="small" control={<Radio />} label="Small" />
                                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="large" control={<Radio />} label="Large" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mt: 2, display: 'block' }}>
                            <FormLabel><Typography variant='h5'>Toppings:</Typography></FormLabel>
                            <RadioGroup value={topping} onChange={(e) => setTopping(e.target.value)}>
                                <FormControlLabel value="topping1" control={<Radio />} label="Topping1" />
                                <FormControlLabel value="topping2" control={<Radio />} label="Topping2" />
                                <FormControlLabel value="topping3" control={<Radio />} label="Topping3" />
                                <FormControlLabel value="topping4" control={<Radio />} label="Topping4" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mt: 2, display: 'block' }}>
                            <FormLabel><Typography variant='h5'>Extra ingridients:</Typography></FormLabel>
                            <RadioGroup value={extra} onChange={(e) => setExtra(e.target.value)}>
                                <FormControlLabel value="extra1" control={<Radio />} label="ExtraOption" />
                                <FormControlLabel value="extra2" control={<Radio />} label="ExtraOption" />
                                <FormControlLabel value="extra3" control={<Radio />} label="ExtraOption" />
                            </RadioGroup>
                        </FormControl>

                        <Button variant='outlined' sx={{ mt: 3 }} onClick={handleClick}>Add to cart</Button>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    );
}