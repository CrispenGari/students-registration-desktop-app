
import constants from '../utils/constants'
const basketReducer =(state=[], action)=>{
    switch (action.type) {
        case constants.ADD_TO_BASKET:
            return [
                ...state, action.value
            ]
        case constants.EMPTY_BASKET:
            return state =[]
        default:
           return state
    }
}
export default basketReducer