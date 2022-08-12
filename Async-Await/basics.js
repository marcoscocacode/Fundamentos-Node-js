const {
    promises: {
        readFile,
        writeFile
    },
} = require('fs')
const { join } = require('path')

const {
    withPromises: {
        authenticate,
        listPosts,
        getPost
    },
} = require('../helpers/social-media')

const copyFile = async (source, dest) =>{
    try {
        const data = await readFile(source)
        await writeFile(dest, data)
    } catch (error) {
        console.error(error)
    }
}

const exemplo = async () => {
    const [r1, r2, r3] = await Promise.all([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
    ])
    return r1 + r2 + r3
}

const packageJsonPath = join(__dirname, '..', 'package.json')
const destPath = join(__dirname,'package-copy.json')

copyFile(packageJsonPath, destPath)
    .then(() => console.log('File copied successfully'))

exemplo().then(console.log)

const getFirstPost = async (username, password) => {
    const token = await authenticate(username, password)
    const posts = await listPosts(token)
    const firstPostId = posts[0].id
    // const firstPost = await getPost(token, id)
    // return firstPost
    return getPost(token, firstPostId)
} // Promise<Post>

(async() => {
    try {
        const post = await getFirstPost('staart', 'nodelife')
        console.log(post)
    }catch(error){
        console.error("Deu Erro", error)
    }
})()