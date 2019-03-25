import { createStore, combineReducers } from 'redux'
import appInfo from 'CommonFF/appHelperReducer.js'
import likeInfo from './likeReducer.js'
import todoInfo from './todoReducer.js'


const rootReducer = combineReducers({
    appInfo,
    likeInfo,
    todoInfo
})

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store