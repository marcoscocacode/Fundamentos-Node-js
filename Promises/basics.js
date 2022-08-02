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
    .finally(() => {
        console.log('Eu rodo independente de seu resultado')
    })

    Promise.resolve(
    //Valor Puro
    //Outra Promise
)

// let cachedContent = null

// const readPackageJson = () => {
//         console.log('Lendo arquivo')
//         return readFile(packageJsonPath, { encoding: 'utf8'}).then(data => {
//             console.log('Leitura realizada com sucesso')
//             cachedContent = data
//             return data
//         })
//     }
// const getPackageJsonContent = () => 
//     Promise.resolve(
//         cachedContent ?? readPackageJson()
//     )

// getPackageJsonContent()
//     .then(data => console.log(data))
//     .then(() => getPackageJsonContent())
//     .then(data => console.log(data))

// const readPromise = readFile(packageJsonPath)
// const copyPromise = readPromise.then((data) => {
//     console.log('> Leitura realizada com sucesso')
//     return writeFile(destPath, data)
// })
// const endPromise = copyPromise.then(() => {
//     console.log('Terminou de copiar')
// })

const bagulhoBaseadoEmCallback = (param, callback) => {
    setTimeout(() => {
        callback(null, param)
    }, 1000)
}

const bagulhoBaseadoEmPromise = param =>
    new Promise((resolve, reject) => {
        bagulhoBaseadoEmCallback(param, (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    } )

bagulhoBaseadoEmPromise('Será mesmo?')
    .then(data => console.log(`${data}\n É mesmo hein...`))

// Multiplas Promises

Promise.all([ // Array de Promises
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
    //...
])
    .then(([ r1, r2, r3 ]) => r1 + r2 + r3)
    .then(console.log)

// Promises.allSettled

Promise.allSettled([
    Promise.resolve(1),
    Promise.reject(Error('Problema na segunda Promise')),
    Promise.resolve(3)
])
    // [{ status: 'fulfilled', value: T } | { status: 'rejected', reason: Error }]
    .then(results => 
        results.filter(r => r.status === 'fulfilled').map(r => r.value)   
    )
    .then(console.log)


// Promises.race

const delay = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time)
    })

Promise.race([
    delay(500).then(() => '500ms'),
    delay(1000).then(() => '1s')
])
    .then(console.log)

// Promise.any

Promise.any([
    Promise.reject(Error('Erro 1')),
    Promise.resolve('Deu certo!'),
    Promise.reject(Error('Erro 3'))
])
    .then(console.log)
    .catch(err => console.error("Não devo ser chamando", err))