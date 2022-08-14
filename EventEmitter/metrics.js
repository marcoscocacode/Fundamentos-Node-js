// client -> [metrics bus] -> logar as metrics

const { timeStamp } = require('console');
const { EventEmitter } = require('events');
const { delay } = require('../helpers')

const MetricsBus = () => {
  const e = new EventEmitter({
    captureRejections: true
  })
    .on('error', error => {
      console.log('MetricsBus capturou o erro', error)
    })

  const publish = (metric) => {
    e.emit('metric', metric)
  }

  const subscribe = (subscribe) => {
    e.on('metric', subscribe)
  }

  return{
    publish,
    subscribe
  }
}

const bus = MetricsBus()

const Metric = ({name, value, unit}) => ({
  name,
  value,
  unit,
  timestamp: new Date()
})

const loggerMetricsSubscriber = async (metric) => {
  await delay(10)
  console.log(JSON.stringify(metric, null, 2))
}

module.exports = {
  bus,
  MetricsBus,
  loggerMetricsSubscriber,
  Metric
}