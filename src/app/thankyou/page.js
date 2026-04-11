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
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';

export default function SimpleContainer() {
	const user = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
	const [open,setOpen] = React.useState(false);
	const toggleDrawer = (newOpen) => () =>{
		setOpen(newOpen);
	}
	const logout = () => {
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
				<Stack direction="column" padding={5} gap={2}>
					{!user && <>
						<Button href='/login'>Log In</Button>
						<Button href='/register'>Register</Button>
					</>}
					{user && <Button onClick={logout}>Log out</Button>}
				</Stack>
			</Drawer>

			<Container maxWidth="md" sx={{paddingTop: 5, textAlign: 'center'}}>
				<Typography variant='h3' gutterBottom>
					Thank you!
				</Typography>
				<Typography variant='h5' gutterBottom>
					Your order has been placed
				</Typography>
				<Typography variant='h5' gutterBottom>
					and will be delivered in 15 minutes
				</Typography>
				<Button variant='outlined' href='/' sx={{mt: 4}}>Go home</Button>
			</Container>
		</Box>
	);
}