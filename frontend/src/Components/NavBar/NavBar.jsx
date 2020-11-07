import React from 'react'
import './NavBar.css'
import {NavBarItem} from '../../Components'
import constants from '../../utils/constants'
import {selectTab} from '../../actions'
import {useDispatch} from 'react-redux'
import { Update, AddCircleOutline, DeleteForeverOutlined, CallSplit,  Search } from '@material-ui/icons'
const NavBar = () => {
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div onClick={()=>dispatch(selectTab(constants.SELECT_ADD))}>
                <NavBarItem Icon={<AddCircleOutline />} label ="add" />
            </div>
            <div onClick={()=>dispatch(selectTab(constants.SLECT_UPDATE))}>
                <NavBarItem Icon={<Update />} label ="update"/>
            </div>
            <div onClick={()=>dispatch(selectTab(constants.SELECT_DELETE))}>
                <NavBarItem Icon={<DeleteForeverOutlined/>} label ="delete"/>
            </div>
            <div onClick={()=>dispatch(selectTab(constants.SELECT_ALL_STUDENTS))}>
                <NavBarItem Icon={<CallSplit />} label ="all students"/>
            </div>
            <div onClick={()=>dispatch(selectTab(constants.SELECT_SEARCH))}>
                <NavBarItem Icon={<Search />} label ="search student"/>
            </div>       
        </div>
    )
}

export default NavBar
