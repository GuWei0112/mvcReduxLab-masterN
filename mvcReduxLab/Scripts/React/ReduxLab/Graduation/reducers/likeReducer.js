import { Ks } from 'CommonFF/actions.js'

const initialState = {
    idName: 'Z',
    likeCount: 0,
    dislikeCount: 0
}

export default function likeReducer(state = initialState, action) {

    const match = action.targetReducer === undefined ||
        action.targetReducer === null ||
        action.targetReducer === 'likeReducer';

    if (!match) return state;

    switch (action.type) {
        case Ks.ASSIGN_VALUE:
            return { ...state, [action.name]: action.value }
        case Ks.ASSIGN_STATE_PROPS:
            return { ...state, ...(action.properties) }
        case Ks.FILL_FORM_DATA:
            /// action = { type, formData }
            return { ...state, ...(action.formData.likeInfo) }
        case 'INCREASE_LIKE':
            return { ...state, likeCount: state.likeCount + 1 }
        case 'DECREASE_LIKE':
            return {...state, dislikeCount: state.dislikeCount +1}
        default:
            return state;
    }
}
