import {AUTH, LOGOUT, AUTH_FAILURE} from '../constants/actionTypes';

export default (state = {authData: null, loginError: false}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));

            return {...state, authData: action?.data, loginError: false};
        case AUTH_FAILURE:
            return {...state, loginError: true};
        case LOGOUT:
            localStorage.clear();

            return {...state, authData: null};
        default:
            return state;
    }
}