import axios from "axios";
import crypto from 'crypto-js';
import aes from 'crypto-js/aes';
// import dotenv from "dotenv";

// dotenv.config();

const index = "http://localhost:3000";
const register = `${index}/register`;
const loginURL = `${index}/auth`;
const verify = `${index}/auth/verify`;
const renew = `${index}/token/renew`;
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
        }).then(res => res.json()).then(async (data) => {
            if (!data.error) {
                // window.location.reload();
                return data
        }   else if (data.error.message.toLowerCase() === "jwt expired".toLowerCase()) {
            await renewToken(token)
            return data
        }   else {
            return data
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
    }).then(res => res.json()).then(async data => {
        await validate(data.token);
        await localStorage.setItem("token", data.token);
        window.location.reload()
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
        }).then(res => res.json()).then(async data => {
            if (!data.error) {
                window.location.reload();
                await localStorage.setItem("token", data.token);
                return data          
            } else {
                return data
            }
        })
}

export default {
    signup,
    login,
    validate
}