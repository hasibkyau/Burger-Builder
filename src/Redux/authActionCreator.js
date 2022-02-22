import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (token, userID) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        payLoad: {
            token: token,
            userID: userID,
        }
    }
}

export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }

    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const API_KEY = "AIzaSyCFKfWR043CC2G1c68yYaLozIMsvmAiRbo";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            console.log(response);
        })
}
