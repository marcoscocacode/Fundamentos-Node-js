const {
    promises: {
        readFile,
        writeFile,
    }
} = require('fs')

const {join} = require('path')

// Promise: Rejected | Fulfilled

// .then ((data) => {...})
// .catch ((error) => {...})

const packageJsonPath = join(__dirname, '..', 'package.json')
const destPath = join(__dirname, 'package.copy.promise.json')
const notExists = join(__dirname, 'notexists')

readFile(notExists) // Promise de leitura
    .catch((error) => {
        console.error('Deu erro, to logando para avisar mas vou deixar subir', error.message)
        return Promise.reject(error)
    })
    .then((data) => {
        console.log('Leitura realizada com sucesso')
        return writeFile(destPath, data) // Promise de escrita
    })
    // Resultado da promise de escrita
    .then(() => {
        console.log('Terminou de copiar')
    })
    .catch((error) => {
        console.error("Deu ruim de novo", error.message)
    })

    Promise.resolve(
    //Valor Puro
    //Outra Promise
)

let cachedContent = null

const readPackageJson = () => {
        console.log('Lendo arquivo')
        return readFile(packageJsonPath, { encoding: 'utf8'}).then(data => {
            console.log('Leitura realizada com sucesso')
            cachedContent = data
            return data
        })
    }
const getPackageJsonContent = () => 
    Promise.resolve(
        cachedContent ?? readPackageJson()
    )

getPackageJsonContent()
    .then(data => console.log(data))
    .then(() => getPackageJsonContent())
    .then(data => console.log(data))

// const readPromise = readFile(packageJsonPath)
// const copyPromise = readPromise.then((data) => {
//     console.log('> Leitura realizada com sucesso')
//     return writeFile(destPath, data)
// })
// const endPromise = copyPromise.then(() => {
//     console.log('Terminou de copiar')
// })