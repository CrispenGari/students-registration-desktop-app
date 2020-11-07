import React from 'react'

import './NavBarItem.css'
const NavBarItem = ({Icon, active, label}) => {
    return (
        <div className={`navbaritem ${label}`}title={label}>
            {Icon}
         <h1> {label}</h1>   
        </div>
    )
}

export default NavBarItem
