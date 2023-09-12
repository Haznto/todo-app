export let initialState = {
      loggedIn: false,
      user: { capabilities: [] },
      token:'',
      error: null,
    }




export function loginReducer (state, action) {
    switch (action.type){
        case 'changeLoginStatus': {
            return {...state, loggedIn:action.payload}
        }
        case 'changeLogoutStatus': {
            return {...state, loggedIn:false}
        }
        case 'changeUser': {
            return {...state, user: action.payload}
        }
        case 'changeToken': {
            return {...state, token: action.payload}
        }
        case 'changeError': {
            return {...state, error: action.payload}
        }
        default:{
            return state
        }
    }
}