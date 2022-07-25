const{
    withCallbacks: {
        authenticate,
        listPosts,
        getPost,
    }
} = require('../helpers/social-media')

const firstPost = (username, password, callback) => { // callback error-first
    authenticate(username, password, (errorAuth, token) => { 
        if(errorAuth) {
            callback(errorAuth)
            return
        }
        listPosts(token, (errorList, posts) => {
            if(errorList) {
                callback(errorList)
                return
            }
            const firstPostId = posts[0].id
            getPost(token, firstPostId, (errorPost, post) => {
                if(errorPost) {
                    callback(errorPost)
                    return
                }
                callback(null, post) 
            }
            )
        })
    })
} 

firstPost('staart', 'nodelife', (error, post) => {
    if(error) {
        console.log("Deu ruim", error)
        return
    }
    console.log("Deu bom", post)
})