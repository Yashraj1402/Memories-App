import {AUTH, AUTH_FAILURE} from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({type: AUTH, data});

        navigate('/');
    } catch (error) { 
        console.log("Sign In failed\n");
        console.log(error);
        dispatch({ type: AUTH_FAILURE });
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({type: AUTH, data});

        navigate('/');
    } catch (error) {
        console.log("Sign Up failed\n");
        console.log(error);
    }
};