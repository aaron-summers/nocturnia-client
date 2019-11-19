const index = "http://localhost:3000";
const userProfile = `${index}/user`

const fetchUser = (username) => {
    return fetch(`${userProfile}/${username}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.x_tn
        }
    }).then(res => res.json()).then(data => {
        return data
    })
}


export default {
    fetchUser
}