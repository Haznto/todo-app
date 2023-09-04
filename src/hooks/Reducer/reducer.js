export const initialState = {
    showDone: false,
    sortBy: 'difficulty',
    taskPerPage: 3,

}


export const stateReducer = (state, action) => {

    // console.log(state, action)
    switch (action.type) {
        case "changeShow": {
            return { ...state, showDone: action.payload }
        }
        case "changeSort": {
            return { ...state, sortBy: action.payload }
        }
        case "changeTasksNum": {
            return { ...state, taskPerPage: action.payload }
        }
        default: return state
    }
}