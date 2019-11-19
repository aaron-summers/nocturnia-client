const index = "http://localhost:3000";
const register = `${index}/register`;
const loginURL = `${index}/auth`;
const verify = `${index}/auth/verify`;
const renew = `${index}/token/renew`;
const myUrl = `${index}/home/me`;
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
            await localStorage.setItem("x_tn", data.token);
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
            if (!jsonRes.error && jsonRes.valid === true) {
                return jsonRes
        }   else if (!jsonRes.valid && jsonRes.error.message === "jwt expired".toLowerCase()) {
                return jsonRes
        }   else {
            return jsonRes
        }
    })
}

const renewToken = async (oldToken) => {
    localStorage.clear()
    return fetch(renew, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': oldToken
        }
    }).then(res => res.json()).then(async resp => {
        await localStorage.setItem("x_tn", resp.data.token);
        await localStorage.setItem("a_id", resp.data.a_id)
        validate(resp.data.token);
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

const getSelf = (token) => {
    return fetch(myUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(res => res.json()).then(data => {
        return data
    })
}

const getAvatars = (userId) => {
    return fetch(`http://localhost:3000/users/${userId}/avatar`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.x_tn
        }
    }).then(res => res.json()).then(async data => {
        if (!data.error) {
            // console.log(data)
            return data
        } else {
            window.location.reload()
            return data
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
    renewToken,
    getSelf,
    getAvatars
}