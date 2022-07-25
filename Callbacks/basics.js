const {
    readFile,
    writeFile,
    read
} = require('fs')
const { join } = require('path')

const packageJsonPath = join(__dirname, '..', 'package.json')
const destPath = join(__dirname, 'package.copy.json')
const notExistPath = join(__dirname, 'notExist.json') // Create a non existent file to test the error handling

// Sem tratamento de erros
readFile(packageJsonPath, (errorRead, data ) => {
    console.log("> Terminei de Ler")
    writeFile(destPath, data, (errorWrite) => {
        console.log(">> Terminei de Escrever")
    })
})

// Com tratamento de erros rudimentar
readFile(notExistPath, (errorRead, data ) => {
    if (!errorRead) {
        console.log('> Terminei de Ler')
        writeFile(destPath, (errorWrite) => {
            if(!errorWrite) {
                console.log(">> Terminei de Escrever")
            }
        })
    }
})

// Com tratamento de erro: Logar + Early Return
readFile(notExistPath, (errorRead, data ) => {
    if(errorRead) { 
        console.log("> Erro de Leitura", errorRead)
        return 
    }
    console.log("> Terminei de Ler") // Se não houver erro, logar que terminou de ler
    writeFile(destPath, data, (errorWrite) => {
        if(errorWrite) {
            console.log(">> Erro de Escrita", errorWrite)
            return
        }
        console.log(">> Terminei de Escrever") // Se não houver erro, logar que terminou de escrever
    })
})