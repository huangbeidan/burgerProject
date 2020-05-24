import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const autoData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdTjVxC2PptB4WvGWlaE0bE3Cp8nflvWI';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdTjVxC2PptB4WvGWlaE0bE3Cp8nflvWI';
        }
        axios.post(url, autoData)
              .then(response => {
                  console.log(response);
                  dispatch(authSuccess(response.data.idToken, response.data.localId));
              })
              .catch(err => {
                  console.log(err);
                  dispatch(authFail());
              });
    };
};