import {run} from '@motorcycle/core'
import {makeDOMDriver} from '@motorcycle/dom'
import main from './counter.js'

run(main, {
  DOM: makeDOMDriver('#app')
})
