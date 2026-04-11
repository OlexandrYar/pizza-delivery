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

import Drawer from '@mui/material/Drawer';

export default function SimpleContainer() {
    const user = localStorage.getItem('userEmail');
    const [data, setData] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [total, setTotal] = React.useState(0);

    if (!user) window.location = "/login";

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }

    const logout = () => {
        localStorage.clear();
        window.location = "/login";
    }

    const delelteItem = (item) => {
        console.log(item.productId);
        runDBCall(`http://localhost:3000/api/removeFromCart?user=${user}&id=${item._id}`);
    }

    async function runDBCall(url) {
        const res = await fetch(url);
        const data = await res.json();

        if (data.data == "deleted") {
            window.location = "/cart";
        } else {
            alert("Can not delete an item!");
        }
    }

    React.useEffect(() => {
        fetch(`http://localhost:3000/api/getCart?user=${user}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
    }, [user])

    React.useEffect(() => {
        if (!data) return;
        const sum = data.reduce((acc, item) => acc + parseFloat(item.price), 0);
        setTotal(sum);
    }, [data])

    if (!data) return <p>Loading...</p>

    return (
        <Box>
            <AppBar position='static'>
                <Container maxWidth="xxl">
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
                            <Button variant='contained' href='/cart'>Cart</Button>
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

            <Typography variant='h1' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Cart</Typography>

            <Container sx={{ paddingTop: 10 }}>
                <Grid container direction="column" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }} spacing={2}>

                    {data.map((item, i) => (
                        <Card sx={{ display: 'flex', flexDirection: 'row', maxWidth: 800, maxHeight: 500, m: 2 }} key={i}>
                            <CardMedia>
                                <Image src={item.productImage} width={500} height={100} alt={item.pname} />
                            </CardMedia>
                            <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: "center" }}>
                                <Typography variant='h3'>{item.pname}</Typography>
                                <Typography variant='h3'>€{item.price}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => delelteItem(item)}>Remove</Button>
                            </CardActions>
                        </Card>
                    ))}

                </Grid>
                <Typography sx={{ display: 'flex', justifyContent: "right" }} variant='h3'>Total: €{total}</Typography>
                {/* ✅ Fix 3: `data == []` always false, use data.length === 0 */}
                <Button variant='contained' href='/checkout' disabled={data.length === 0}>Checkout</Button>
            </Container>
        </Box>
    );
}