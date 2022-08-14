const { EventEmitter } = require('events')

const pingpongServer = () => {
  const pingpong = new EventEmitter()
  pingpong
    .on('ping', () => {
      console.log('ping')
      setTimeout(() => {
        pingpong.emit('pong')
        }, 0)
    })
    .on('pong', () => {
      console.log('pong')
      setTimeout(() => {
        pingpong.emit('ping')
        }, 0)
    })
    
  pingpong.emit('ping')
}

const delay = (time) => 
  new Promise(resolve => setTimeout(resolve, time))

const pingPongServerP = () => {
  const pingpong = new EventEmitter()

  pingpong
    .on('ping', async () => {
        console.log('ping')
        await delay(500)
        pingpong.emit('pong')
    })
    .on('pong', async () => {
      console.log('pong')
      await delay(500)
      pingpong.emit('ping')
    })

    pingpong.emit('ping')
}

// pingPongServerP()

const errors = async() => {
  const pingpong = new EventEmitter({
    captureRejections: true
  })

  pingpong
    .on('ping', async () => {
        console.log('ping')
        await delay(500)
        pingpong.emit('pong')
    })
    .on('pong', async () => {
      console.log('pong')
      await delay(500)
      pingpong.emit('ping')
    })
    .on('error', (error) => {
      console.error("Peguei o erro emitido", error.message)
    })
    .on('forceExplodeAsync', error => Promise.reject(error))

  pingpong[Symbol.for('nodejs.rejection')] = (error) => { // This is the same as the line above but using the symbol for NodeJS 14 and below
    console.error("Peguei o erro emitido", error.message)
  }
  
  pingpong.emit('ping')

  await delay(2000)
  pingpong.emit('error', new Error('depois de 2 segundos'))

  await delay(1000)
  pingpong.emit('forceExplodeAsync', new Error('depois de 3 segundos'))
}

errors()
