import React from "react";
import { useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Menu, Box, IconButton, MenuItem, Button } from '@mui/material'
import {Menu as MenuIcon } from '@mui/icons-material'


function TopAppBar(){
    const pages = ['Home', 'List Pokemon', 'My Pokemon'];
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null)
        if(page !== null){
            let nav = (page === "Home") ? '/' : (page === "List Pokemon") ? '/list' : '/mypokemon'
            navigate(nav)
        }
    }

    return (
        <AppBar position="static" sx={{backgroundColor: '#548CFF'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img width='60px' src={process.env.PUBLIC_URL + '/pokemonlogo.png'} alt="Pokemon"/>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={()=>handleCloseNavMenu(page)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                                <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={()=>handleCloseNavMenu(null)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={()=>handleCloseNavMenu(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1.1, display: { xs: "flex", md: "none" } }}
                    >
                        <img width='60px' src={process.env.PUBLIC_URL + '/pokemonlogo.png'} alt="Pokemon"/>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default TopAppBar