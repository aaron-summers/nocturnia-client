const index = `http://localhost:3000`
const recommended_url = `${index}/recommended`

const recommendedPosts = (token) => {
    return fetch(recommended_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(res => res.json()).then(jsonRes => {
        if (!jsonRes.error) {
            return jsonRes
        } else {
            return jsonRes
        }
    })
}

export default {
    recommendedPosts
}