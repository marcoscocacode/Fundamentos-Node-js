const {
    readFileSync,
    writeFileSync,
    readFile,
    writeFile
} = require('fs') // Importing the modules

const {
    join
} = require('path')

const logDuration = (label, startTime) => {
    console.log(`${label}: ${Date.now() - startTime}ms`)
}

const copyFileBlocking = (source, dest) => { 
    const startTime = Date.now()
    console.log('Reading file...')
    const content = readFileSync(source) // Reading the file
    console.log("Copying file...")
    writeFileSync(dest, content) // Synchronous operation
    logDuration('copyFileBlocking', startTime)
} 

const sourcePath = join(__dirname, 'files', 'example.txt') // Source file path
const destPath = join(__dirname, 'files', 'example-copy-blocking.txt') // Destination file path

copyFileBlocking(sourcePath, destPath) // Calling the function

console.log("*".repeat(50))

const copyFileNonBlocking = (source, dest) => {
    const startTime = Date.now()
    console.log("Starting to read file...")
    readFile(source, (err, data) => { // Asynchronous operation
        console.log(">  Reading file...")
        writeFile(dest, data, (_err) => {
            console.log(">>  Copying file...")    
            logDuration('>> copyFileNonBlocking', startTime)
        })
    })
}

const destPathNonBlocking = join(__dirname, 'files', 'example-copy-non-blocking.txt')

copyFileNonBlocking(sourcePath, destPathNonBlocking)

console.log(
    "Continuando...",
    1 + 1,
    Math.PI * Math.E 
)