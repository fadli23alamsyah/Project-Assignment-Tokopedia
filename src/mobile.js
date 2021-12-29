import React from 'react'  
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import BottomAppBar from './component/mobile/bottomAppBar'
import HomePage from './page/mobile/home'
import ListPokemonPage from './page/mobile/listPokemon'
import MyPokemon from './page/mobile/myPokemon'
import DetailsPokemon from './page/mobile/detailsPokemon'

function MainMobile(){
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/list" element={<ListPokemonPage/>} />
                    <Route path="/mypokemon" element={<MyPokemon/>} />
                    <Route path="/details/:name" element={<DetailsPokemon/>} />
                </Routes>
                <BottomAppBar />
            </Router>
        </div>
    )
}

export default MainMobile