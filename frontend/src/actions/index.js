import constants from '../utils/constants'
const selectTab =(value)=>{
    return{
        type: constants.SELECT_TAB,
        value: value
    }
}
const setUser =(value)=>{
    return{
        type: constants.SET_USER,
        value: value
    }
}
const addToBasket =(value)=>{
    return{
        type: constants.ADD_TO_BASKET,
        value: value
    }
}

const emptyBasket =()=>{
    return{
        type: constants.EMPTY_BASKET
    }
}
export {emptyBasket, setUser, addToBasket, selectTab}