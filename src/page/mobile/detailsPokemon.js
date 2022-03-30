import React from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { AppBar, Toolbar, Box, IconButton, Typography, Paper, Tab, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { makeStyles } from "@mui/styles"
import { ArrowBackRounded,  FavoriteBorderOutlined } from '@mui/icons-material'
import { READ_POKEMON } from '../../graphql/Queries'
import { useQuery } from '@apollo/client'
import {ucwords} from '../../utils/fontHandler'

const useStyles = makeStyles({
    imageBg: {
        '&::before':{
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right:0, bottom: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL + '/iconpokeballwhite.svg'})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'calc(100% + 50px) calc(100% + 50px)',
            opacity: '0.3',
        }
    },
    tab:{
        '& .MuiTabs-flexContainer':{
            justifyContent: 'center' 
        } 
    }
})


function DetailsPokemon(){
    let navigate = useNavigate()
    const location = useLocation()
    const { name } = useParams()
    const classes = useStyles()
    const [abilities, setAbilities] = React.useState([])
    const [moves, setMoves] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [tab, setTab] = React.useState('1')
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [messsageAlert, setMesssageAlert] = React.useState('');
    const [statusAlert, setStatusAlert] = React.useState('success');
    const [nickname, setNickname] = React.useState("");
    const [mypokemon, setMypokemon] = React.useState(() => {
        const saved = localStorage.getItem("mypokemon");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return [];
        }
    });

    const { loading, error, data } = useQuery(READ_POKEMON, {
        variables: { name },
    })

    const handleClickOpen = () => {
        if (Math.random() >= 0.5) {
            setOpen(true)
        } else {
            setOpenAlert(true)
            setStatusAlert('warning')
            setMesssageAlert('Catch ' + name +' Failed. Please Try Again')
            return false;
        }
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false)
    };

    const savePokemon = () => {
        if(nickname !== ""){
            setMypokemon([
                ...mypokemon,
                {
                    id: mypokemon.length + 1,
                    name: name,
                    image: location.state.image,
                    nickname: nickname
                }
            ])
            setNickname("")
            setOpen(false)

            // alert
            setOpenAlert(true)
            setStatusAlert('success')
            setMesssageAlert('Stored Your Pokemon')
        }
    }

    React.useEffect(
        ()=>{
            if (loading) console.log('loading');
            if (error) console.log(`Error! ${error}`);
            if(data){
                setAbilities(data.pokemon.abilities)
                setMoves(data.pokemon.moves)
                setTypes(data.pokemon.types)
            }
        },[data]
    )

    React.useEffect(
        ()=>{
            localStorage.setItem("mypokemon", JSON.stringify(mypokemon));
        },[mypokemon]
    )

    return (
        <Box sx={{zIndex: 3, height: '100vh', position: 'relative', backgroundColor: 'white', overflow: 'scroll'}}>
            <Box className={classes.imageBg} sx={{height: '300px', position: 'relative', backgroundColor: '#548CFF'}}>
                <AppBar position="static" elevation={0} sx={{backgroundColor: 'transparent'}}>
                    <Toolbar>
                        <IconButton 
                            size="large"
                            edge="start"
                            onClick={ ()=> navigate(-1) }
                        >
                            <ArrowBackRounded fontSize="small" htmlColor='#fff'/>
                        </IconButton>
                        <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
                        <IconButton 
                            size="large"
                            edge="end"
                            onClick={handleClickOpen}
                        >
                            <FavoriteBorderOutlined fontSize="small" htmlColor='#fff'/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Typography paddingLeft="16px" fontSize="25px" fontWeight="900" color="white">{ucwords(name)}</Typography>
                <Paper elevation={0} sx={{width:'100%',height: '30px',backgroundColor: 'white', position: 'absolute', bottom: 0, borderRadius: '20px 20px 0 0'}}/>
                <img style={{ position: 'absolute', bottom: 0, left:0, right:0, width: '200px', margin: '0 auto'}} src={location.state.image} alt={name} />
            </Box>
            <Box sx={{ width: '100%', typography: 'body1', mt:'-25px',}}>
                <TabContext value={tab}>
                    <Box className={classes.tab} sx={{ borderBottom: 1, borderColor: 'divider', }}>
                        <TabList 
                            onChange={
                                (event, newValue) => {
                                    setTab(newValue);
                                }
                            }
                            aria-label="tab pokemon">
                            <Tab label="Abilities" value="1"/>
                            <Tab label="Moves" value="2" />
                            <Tab label="Types" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {
                            (abilities.length > 0) ? abilities.map((item, index)=>(
                                <Typography key={index}>{ucwords(item.ability.name)}</Typography>
                            ))
                            : null                   
                        }
                    </TabPanel>
                    <TabPanel value="2">
                        {
                            (moves.length > 0) ? moves.map((item, index)=>(
                                <Typography key={index}>{ucwords(item.move.name)}</Typography>
                            ))
                            : null                   
                        }
                    </TabPanel>
                    <TabPanel value="3">
                        {
                            (types.length > 0) ? types.map((item, index)=>(
                                <Typography key={index}>{ucwords(item.type.name)}</Typography>
                            ))
                            : null                   
                        }
                    </TabPanel>
                </TabContext>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save {ucwords(name)}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>setNickname(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={savePokemon}>Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert severity={statusAlert}>
                    {messsageAlert}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default DetailsPokemon