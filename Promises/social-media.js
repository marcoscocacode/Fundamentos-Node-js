const{
    withPromises: {
        authenticate,
        listPosts,
        getPost
    },
} = require('../helpers/social-media')

const getFirstPost = (username, password) =>
    authenticate(username, password)
        .then(token => 
            listPosts(token)
                .then(([{id}]) => getPost(token, id)) // Destructuring and indenting to get the token
        )
    

const listPostsLinear = (token) =>
    listPosts(token)
        .then(posts => ({posts, token})) //Promisse <{posts [], token}> | Context Object

const getPostLinear = ({token, posts : [{id}]}) =>
    getPost(token, id)

const getFirstPostLinear = (username, password) =>
    authenticate(username, password)
        .then(listPostsLinear)
        .then(getPostLinear)

getFirstPostLinear("staart", "nodelife")
    .then(console.log)
    .catch(console.error)
