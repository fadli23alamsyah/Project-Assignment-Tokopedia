import React from "react"
import{ Container, Box,Typography, Grid } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ItemListMobile from "../../component/mobile/itemListMobile"
import { useNavigate } from "react-router-dom"
import { READ_POKEMONS } from '../../graphql/Queries'
import { useQuery } from '@apollo/client'

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
    const classes = useStyles()
    const navigate = useNavigate()
    const { loading, error, data } = useQuery(READ_POKEMONS);
    const [pokemons, setPokemons] = React.useState([])

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
        <Container className={classes.background}>
            <Box paddingTop={3} paddingBottom={2}>
                <Typography color="#548CFF" fontWeight="700" variant="h4">Pokedex</Typography>
            </Box>
            <Grid container spacing={1}>
                {
                    pokemons.map((item, index)=>(
                        <Grid item xs={6} key={index}>
                            <div onClick={()=>onClickCard(item.name, item.image)}>
                                <ItemListMobile data={item} />
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default ListPokemon