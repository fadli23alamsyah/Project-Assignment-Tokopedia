import React from "react"
import{ Card, CardContent, CardHeader, CardMedia, Typography, Box} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { ucwords } from '../../utils/fontHandler'

const useStyles = makeStyles({
    bgImage:{
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

function ItemListWebsite({data}) {
    const classes = useStyles()
    const [total, setTotal] = React.useState(0)
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
            setTotal(ownedTotal)
            localStorage.setItem("mypokemon", JSON.stringify(mypokemon))
        },[mypokemon]
    )

    const ownedTotal = ()=>{
        const total = mypokemon.filter((item)=>{
            return item.name === data.name 
        })
        return total.length
    }

    return (
        <Card className={classes.bgImage} sx={{backgroundColor: '#A9E4D7', borderRadius: "8px", position: 'relative', zIndex: 1,}} >
            <CardHeader className={classes.titleCard} title={ucwords(data.name)} sx={{pb: 0, color: "#fff",}}/>
            <Box sx={{ display: 'flex',}}>
                <CardContent sx={{ pr: '5px', pt: '5px', flex: 'auto'}}>
                    <Typography variant="body1" color="#6998AB" sx={{fontSize: '12px',}}>Owned Total</Typography>
                    <Typography variant="h6" sx={{lineHeight: 1,}}>{total}</Typography>
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

export default ItemListWebsite