const index = `http://localhost:3000`
const recommended_url = `${index}/recommended`
const createUrl = `${index}/posts`;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.x_tn
}

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

const createPost = (input) => {
    const post = JSON.stringify(input)
    return fetch(createUrl, {
        method: 'POST',
        headers: headers,
        body: post
    }).then(res => res.json()).then(jsonRes => {
        if (!jsonRes.error) {
            window.location.reload()
            return jsonRes
        } else {
            return jsonRes
        }
    })
}

export default {
    recommendedPosts,
    createPost
}