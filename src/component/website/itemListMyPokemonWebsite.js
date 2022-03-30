import React from "react"
import{ Card, CardContent, CardHeader, CardMedia, Typography, Box, IconButton} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { ucwords } from '../../utils/fontHandler'
import { Favorite } from '@mui/icons-material'

const useStyles = makeStyles({
    bgImage:{
        cursor: 'pointer',
        backgroundColor: '#A9E4D7', 
        borderRadius: "8px", 
        position: 'relative', 
        zIndex: 1,
        '&::before':{
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right:0, bottom: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL + '/iconpokeballwhite.svg'})`,
            backgroundSize: '120px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'calc(100% + 20px) calc(100% + 40px)',
            opacity: '0.8',
            zIndex: -1,
        }
    },
    titleCard:{
        '& span':{
            fontSize: '18px',
            fontWeight: '600'
        }
    }
})

function ItemListMyPokemonWebsite({data, onReleaseClick}) {
    const classes = useStyles()

    return (
        <Card className={classes.bgImage}>
            <CardHeader className={classes.titleCard} title={ucwords(data.name)} sx={{pb: 0, color: "#fff",}} 
                action={
                    <IconButton aria-label="add to favorites" onClick={()=>onReleaseClick(data.id, data.name)}>
                        <Favorite fontSize="small" htmlColor="pink"/>
                    </IconButton>
                }
            />
            <Box sx={{ display: 'flex',}}>
                <CardContent sx={{ pr: '5px', pt: '5px', flex: 'auto'}}>
                    <Typography variant="body1" color="#6998AB" sx={{fontSize: '12px',}}>Nickname</Typography>
                    <Typography variant="h6" sx={{lineHeight: 1,}}>{ucwords(data.nickname)}</Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: '95px', objectFit: 'contain', alignSelf: 'flex-end',}}
                    src={data.image}
                    alt={data.name}
                />
            </Box>
        </Card>
    )
}

export default ItemListMyPokemonWebsite