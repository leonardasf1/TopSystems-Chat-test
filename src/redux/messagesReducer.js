const initialState = {
    work: [],
    fun: []
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'WORK': {
            return {
                ...state,
                work: action.payload
            }
        }
        case 'FUN': {
            return {
                ...state,
                fun: action.payload
            }
        }
        default: {
            return state
        }
    }
}

// ACTIONS -----------------------------------------------------

export function setMessages(json, type) {
    return {
        type: type,
        payload: jsonToArr(json)
    }
}

// scripts ------------------------------------------------- 

export function jsonToArr(json) {
    return Object.keys(json)
    .map( key => ({ ...json[key], id: key }))
}