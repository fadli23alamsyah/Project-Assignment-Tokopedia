import React from "react"
import{ Container, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    container: {
        textAlign: `center`,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/iconpokeball.svg'})`,
        backgroundPosition: '-100px -55px',
        backgroundRepeat: `no-repeat`,
        paddingBottom: '70px',
    }
})

function Home(){
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <center>
                <img width="300vw" src={process.env.PUBLIC_URL + '/pokemonlogo.png'} alt="Pokemon" /> 
            </center>
            <Typography color="#548CFF" variant="h6">Project Assignment</Typography>
            <Typography color="#FABB51" fontWeight="bold" variant="h4">Tokopedia</Typography>
        </Container>
    )
}

export default Home