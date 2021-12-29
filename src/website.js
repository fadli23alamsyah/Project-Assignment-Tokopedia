import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import TopAppBar from './component/website/appBar'
import Home from './page/website/home'
import ListPokemon from './page/website/listPokemon'
import DetailsPokemon from './page/website/detailsPokemon'
import MyPokemon from './page/website/myPokemon'

function MainWebsite(){
    return (
        <Router>
            <TopAppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<ListPokemon />} />
                <Route path="/mypokemon" element={<MyPokemon />} />
                <Route path="/details/:name" element={<DetailsPokemon />} />
            </Routes>
        </Router>
    )
}

export default MainWebsite