import axios from "axios";
import crypto from 'crypto-js';
import aes from 'crypto-js/aes';

const index = "http://localhost:3000";
const register = `${index}/register`;
const loginURL = `${index}/auth`;
const verify = `${index}/auth/verify`;
const renew = `${index}/token/renew`;
const myUrl = `${index}/users/me`;
const recommended = `${index}/recommended`;

function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}


const signup = async (user) => {
    const body = JSON.stringify(user);

    return fetch(register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    }).then(res => res.json()).then(async data => {
        if (!data.error) {
            await localStorage.setItem("token", data.token);
            window.location.reload();
            return data;            
        } else {
            return data
        }
    })
}

const validate = async (token) => {

        return fetch(verify, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(res => res.json()).then(async (jsonRes) => {
            if (!jsonRes.error) {
                return jsonRes
        }   else if (jsonRes.error.message === "jwt expired".toLowerCase()) {
                await renewToken(token)
                window.location.reload()
                return jsonRes
        }   else {
            return jsonRes
        }
    })
}

const renewToken = async (oldToken) => {
    return fetch(renew, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': oldToken
        }
    }).then(res => res.json()).then(async resp => {
        await localStorage.setItem("x_tn", resp.data.token);
        validate(resp.data.token);
        // window.location.reload()
    })
}

const login = async (user) => {
        const body = JSON.stringify(user);
        return fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(res => res.json()).then(async resp => {
            if (!resp.error) {
                await localStorage.setItem("x_tn", resp.data.token);
                await localStorage.setItem("a_id", resp.data.a_id);
                window.location.reload();
                return resp          
            } else {
                return resp
            }
        })
}

const logout = () => {
    localStorage.clear()
    window.location.reload();
}

export default {
    signup,
    login,
    validate,
    logout,
    renewToken
}