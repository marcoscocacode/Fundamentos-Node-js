const logCalled = () => {
    console.log('> Called')
}

setTimeout(() => {
    logCalled()
}, 1000)

const timeoutId = setTimeout(() => { 
    logCalled()
    setTimeout(logCalled, 1000)
}, 3000)

clearTimeout(timeoutId)

const intervalId = setInterval(() => {
    console.log('> Chamada a cada 1 segundo')
}, 1000)

setTimeout(() => {
    clearInterval(intervalId)
}, 5000)