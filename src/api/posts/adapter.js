import adapter from "../auth/adapter";
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

const createPost = async (input) => {
    const post = JSON.stringify(input)
    return fetch(createUrl, {
        method: 'POST',
        headers: headers,
        body: post
    }).then(res => res.json()).then(async jsonRes => {
        if (!jsonRes.error) {
            // window.location.reload()
            if (localStorage.tmpContent) {
                await localStorage.removeItem('tmpContent')
                await localStorage.removeItem('tmpTags')
            }
            return jsonRes
        } else if (jsonRes.error.message === "jwt expired".toLowerCase()) {
            await localStorage.setItem("tmpContent", input.content)
            await localStorage.setItem("tmpTags", input.tags)
            window.location.reload();
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