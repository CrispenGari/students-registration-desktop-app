import React from 'react'
import './MainApp.css'
import {NavBar, CardsContainer} from '../../Components'
const MainApp = () => {
    return (
        <div className="mainapp">
            <NavBar/>
            <div className="mainapp__cards">
                <CardsContainer/>
            </div>
        </div>
    )
}

export default MainApp
