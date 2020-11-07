import {combineReducers} from 'redux'
import basketReducer from './basketReducer'
import setUserReducer from './setUserReducer'
import selectTabReducer from './selectedTabReducer'

const rootReducers = combineReducers({
    basket: basketReducer,
    user: setUserReducer,
    tab: selectTabReducer
})

export default rootReducers