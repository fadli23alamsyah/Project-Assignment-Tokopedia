import React from "react"
import{ Container, Typography, Grid, Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ItemListMyPokemonMobile from '../../component/mobile/itemListMyPokemonMobile'

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

    const handleReleaseClick = (id)=>{
        const removeItem = mypokemon.filter((pokemon) => {
            return pokemon.id !== id;
        });
        setMypokemon(removeItem);
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
        </Container>
    )
}

export default MyPokemon