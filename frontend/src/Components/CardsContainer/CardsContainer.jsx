import React from 'react'

import './CardsContainer.css'
import {Add, Delete, Update, Search, AllStudents} from '../../Components'
import constants from '../../utils/constants'
import {useSelector} from 'react-redux'
const CardsContainer = () => {
    const tab = useSelector(state => state.tab)
    return (
        <div className="cardscontainer">
            {
                tab === constants.SELECT_DELETE? <Delete/> : tab=== constants.SLECT_UPDATE? <Update/>: tab===constants.SELECT_SEARCH? <Search/>: tab === constants.SELECT_ALL_STUDENTS?<AllStudents/>: <Add/>
            }
        </div>
    )
}

export default CardsContainer
