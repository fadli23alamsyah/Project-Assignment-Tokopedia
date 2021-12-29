import React from "react"
import { useNavigate  } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import{ Container, Box,Typography, Grid } from "@mui/material"
import { READ_POKEMONS } from '../../graphql/Queries'
import { useQuery } from '@apollo/client'
import ItemListWebsite from "../../component/website/itemListWebsite"

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
            top: '0',
            zIndex: '-100',
        }
    }
})

function ListPokemon(){
    const navigate = useNavigate()
    const classes = useStyles()
    const [pokemons, setPokemons] = React.useState([])
    const {loading, error, data} = useQuery(READ_POKEMONS)

    React.useEffect(
        ()=>{
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            setPokemons(data.pokemons.results)
        },[data]
    )

    const onClickCard = (name, image)=> {
        navigate(`/details/${name}`, {state: {image: image}})
    }

    return (
        <Box className={classes.background}>
            <Container>
                <Box paddingTop={3} paddingBottom={2}>
                    <Typography color="#548CFF" fontWeight="700" variant="h4">Pokedex</Typography>
                </Box>
                <Grid container spacing={3}>
                    {
                        pokemons.map((item, index)=>(
                            <Grid item xs={6} md={3} key={index}>
                                <div onClick={()=>onClickCard(item.name, item.image)}>
                                    <ItemListWebsite data={item} />
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Box> 
    )
}

export default ListPokemon