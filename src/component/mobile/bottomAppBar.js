import React from "react";
import { useNavigate } from "react-router-dom"
import BottomNavigation from '@mui/material/BottomNavigation'
import MBottomNavigationAction from '@mui/material/BottomNavigationAction'
import { 
    Home,
    Ballot,
    Bookmark
} from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import { styled } from "@mui/material/styles"

const BottomNavigationAction = styled(MBottomNavigationAction)(`
    &.Mui-selected {
        color: #548CFF;
    }
    font-weight: bold;
`);

function BottomAppBar(){
    const [nav, setNav] = React.useState('');
    let navigate = useNavigate();

    React.useEffect(
        ()=>{
            let url = window.location.href;
            let url_split = url.split("/");
            let page = (url_split[3] === "") ? "home" : url_split[3]
            setNav(page)
        },[]
    )

    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2}} elevation={3}>
            <BottomNavigation
                value={nav}
                onChange={(event, newValue) => {
                    setNav(newValue)
                    if(newValue === 'home') newValue= '';
                    navigate(`/${newValue}`)
                }}
                >
                <BottomNavigationAction label="Home" value="home" icon={<Home />} />
                <BottomNavigationAction label="List" value="list" icon={<Ballot />} />
                <BottomNavigationAction label="My Pokemon" value="mypokemon" icon={<Bookmark />} />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomAppBar