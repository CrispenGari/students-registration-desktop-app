import constants from '../utils/constants'
const setUserReducer =(state=[], action)=>{
    switch (action.type) {
        case constants.SET_USER:
            return state=action.value
        default:
           return state
    }
}
export default setUserReducer