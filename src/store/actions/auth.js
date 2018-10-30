import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBinBwBCgC2_1s2V0Z5kJTQ6PTGRCrGJss', authData)
            .then(
                response => {
                    console.log(response);
                    dispatch(authSuccess(response.data));
                }
            )
            .catch(
                error => {
                    console.log(error);
                    dispatch(authFail(error));
                }
            )
    }
}