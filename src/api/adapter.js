import axios from "axios";
import crypto from 'crypto-js';
import aes from 'crypto-js/aes';
// import dotenv from "dotenv";

// dotenv.config();

const index = "http://localhost:3000";
const register = `${index}/register`;
const login = `${index}/auth`;
const verify = `${index}/auth/verify`;
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
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
//temporary console log
    try {
        const res = await axios.get(verify, config)
        console.log(res)
    } catch (error) {
        console.log(error.response.data.message)
    }
}

export default {
    signup,
    validate
}