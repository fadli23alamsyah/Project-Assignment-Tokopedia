import React from "react"
import{ Container, Typography, Grid, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar, Alert } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ItemListMyPokemonMobile from '../../component/mobile/itemListMyPokemonMobile'
import { ucwords } from "../../utils/fontHandler"

const useStyles = makeStyles({
    background: {
        position: 'relative',
        minHeight: '100vh',
        paddingBottom: '70px',
        '&::before': {
            content: '""',
            position: 'absolute',
            backgroundImage: `url(${process.env.PUBLIC_URL + '/iconpokeball.svg'})`,
            backgroundPosition: 'calc(100% + 100px) -70px',
            backgroundRepeat: `no-repeat`,
            opacity: '0.2',
            right: '0',
            left: '0',
            bottom: '0',
            top: '0'
        }
    }
})

function MyPokemon(){
    const classes = useStyles()
    const [id, setId] = React.useState()
    const [name, setName] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [openAlert, setOpenAlert] = React.useState(false)
    const [messsageAlert, setMesssageAlert] = React.useState('')
    const [statusAlert, setStatusAlert] = React.useState('success')
    const [mypokemon, setMypokemon] = React.useState(() => {
        const saved = localStorage.getItem("mypokemon");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return [];
        }
    })

    React.useEffect(
        ()=>{
            localStorage.setItem("mypokemon", JSON.stringify(mypokemon));
        },[mypokemon]
    )

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false)
    }

    const handleReleaseClick = (id, name )=>{
        setOpen(true)
        setId(id)
        setName(name)
    }

    const releasePokemon = ()=>{
        const removeItem = mypokemon.filter((pokemon) => {
            return pokemon.id !== id;
        });
        setMypokemon(removeItem);

        setOpen(false)
        setOpenAlert(true)
        setMesssageAlert('Release Pokemon')
        setStatusAlert('success')
    }

    return (
        <Container className={classes.background}>
            <Box paddingTop={3} paddingBottom={2}>
                <Typography color="#548CFF" fontWeight="700" variant="h4">My Pokemon</Typography>
            </Box>
            <Grid container spacing={1}>
                {
                    mypokemon.map((item)=>(
                        <Grid item xs={6} key={item.id}>
                            <ItemListMyPokemonMobile data={item} onReleaseClick={handleReleaseClick} />
                        </Grid>
                    ))
                }
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Release {ucwords(name)}</DialogTitle>
                <DialogContent>
                    Do you want to release your pokemon ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={releasePokemon}>Release</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={4000} onClose={handleCloseAlert} sx={{ bottom: { xs: 90, sm: 0 } }}>
                <Alert severity={statusAlert}>
                    {messsageAlert}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default MyPokemon