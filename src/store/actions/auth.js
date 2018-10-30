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

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
    }
}