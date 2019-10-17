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


const signup = async (user) => {
    const config = {
        headers: {
        "Content-Type": "application/json"
        }
    }

    try {
        const body = JSON.stringify(user);
        const res = await axios.post(register, body, config);
        const token = localStorage.setItem('token', res.data.token)
        return res.data.token;

    } catch (err) {
        console.log(err.response)
    }
}

const validate = async (token) => {

        return fetch(verify, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            }
        }).then(res => res.json()).then(data => {
            if (!data.error) {
                return data
            } else {
                return data.error
            }
        })
}

const renewToken = (oldToken) => {

}

const login = async (user) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify(user);
        return fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(res => res.json()).then(data => localStorage.setItem('token', data.token))
    } catch (error) {
        console.log(error)
    }
}

export default {
    signup,
    login,
    validate
}