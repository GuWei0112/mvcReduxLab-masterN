﻿import { Ks } from 'CommonFF/actions.js'

const initialState = [
    
]

export default function todoReducer(state = initialState, action) {

    const match = action.targetReducer === undefined ||
        action.targetReducer === null ||
        action.targetReducer === 'todoReducer';

    if (!match) return state;

    switch (action.type) {
        case Ks.ASSIGN_VALUE:
            return { ...state, [action.name]: action.value }
        case Ks.ASSIGN_STATE_PROPS:
            state = action.properties
            return state
        case Ks.INSERT_ITEM:
            {
                const itemList = state.slice()
                itemList.push(action.payload)
                state = itemList
                return state
            }
        case Ks.INSERT_AITEM:
            {
                const itemList = state.slice()
                itemList.push(action.payload)
                action.formData = itemList
                console.log('i am here',action.formData)
              //  state = itemList
                return action.formData
            }
        case Ks.REMOVE_ITEM:
            {
                const itemList = state.slice()
                itemList.splice(action.index, 1)
                return itemList
            }
        case Ks.CHANGE_STATE:
            {
                const itemList = state.slice()
                if (itemList[action.index].complete === false) {
                    itemList[action.index].complete = true
                }
                else {
                    itemList[action.index].complete = false
                }
                return itemList
            }
        case Ks.DELETE_DO:
            {
                return state.filter((complete) => complete.complete === false)            
            }
        case Ks.OPPSITE_LIST:
            {
                return state.map(item => {
                    if (item.id === action.id) {
                        item.complete = !item.complete;
                    }
                    return item
                })
            }
        case Ks.UPDATE_KCOUNT:
            {               
                const itemList = state.slice()
                itemList[action.index] = action.payload
                return itemList
            }
        case Ks.UPDATE_DCOUNT:
            {
                const itemList = state.slice()
                itemList[action.index] = action.payload
                return itemList
            }
        case Ks.FILL_FORM_DATA:
            /// action = { type, formData }            
            return { ...state, ...(action.formData.todoInfo) }
        default:
            return state;
    }
}
