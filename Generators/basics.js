// Generator function

function* example (arg) {
  const incremented = arg + 1
  console.log(`me invocou com ${arg}`)
  yield arg

  console.log('estava "suspended" mas agora estou "resumed"')
  console.log(`ainda tenho o contexto da função: arg=${arg}, incremented=${incremented}`)
  const resumedArg = yield incremented

  console.log(`fui "resumed" recebendo o valor ${resumedArg}`)
  yield resumedArg + 3

  console.log('"resumed" novamente, mas agora é a última')
  return 42
  // lembrando que não retornar nada === return === return undefined
}

console.log('function:', example)
const generator = example(1)
console.log('generator:', generator)
console.log(generator.next())
console.log(generator.next(69))
console.log(generator.next())
console.log(generator.next())
// chamar mais vezes do que tem yield + return: { value: undefined; done: true }
console.log(generator.next())

function* naturals(){
  let n = 0
  while(true){
    yield n++
  }
}

// não vai travar: só cria um generator
const N = naturals()

const take = (limit, gen) => {
  const acc = []
  for (let i = 0; i < limit; i++) {
    const { value, done } = gen.next()
    if (done) {
      if (value != undefined) {
        acc.push(value)
      }
      break
    }
    acc.push(value)
  }
  return acc
}

console.log(
  take(10_00, N)
)

function* hello() {
  yield 'hello'
  yield 'world'
  yield '!'
}

for (const msg of hello()){
  console.log(msg)
}

for (const n of naturals()){
  if (n >= 20) break
  console.log(n)
}

// Iterator protocol
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol

const zeroToNIterator = (n) => ({
  counter: 0,
  next() {
    const done = this.counter > n
    return {
      done,
      value: done ? undefined : this.counter++
    }
  }
})

// Iterable protocol
// Iterable = { [Symbol.iterator]: () => Iterator }

const zeroToN = (n) => ({
  [Symbol.iterator]() {
    return zeroToNIterator(n)
  }
})

for (const n of zeroToN(10)) {
  console.log(n)
}

const AlternatingMessages = (n) => ({
  messages: ['hello', 'bye'],
  *[Symbol.iterator]() {
    for (let i = 0; i < n; i++) {
      const message = i % 2 === 0 ? this.messages[0] : this.messages[1]
      yield message
    }
  }
})

for (const msg of AlternatingMessages(5)) {
  console.log(msg)
}