export const initialState = {
    list: [],

}


export const listReducer = (state, action) => {

    // console.log(state, action)
    switch (action.type) {
        case "changeList": {
            return { ...state, list: [...state.list, action.payload] }
        }
        case "replaceList": {
            return { ...state, list: action.payload }
        }

        default: return state
    }
}