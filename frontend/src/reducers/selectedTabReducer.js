
import constants from '../utils/constants'
const selectedTabReducer = (state= constants.SELECT_ADD, action)=>{
    switch(action.type){
        case constants.SELECT_TAB:
            return state= action.value
        default:
            return state;
    }
}
export default selectedTabReducer