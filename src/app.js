// Root
// ====

import { run } from '@motorcycle/core'
import { makeDOMDriver } from '@motorcycle/dom'
import { makeJSONPDriver } from './drivers/JSONPDriver.js'

// root component
import main from './components/demo'

// base style definition
require('./app-style.scss')

// entry point - run application loop
run(main, {
  DOM: makeDOMDriver('#app', {
    modules: [
      require('snabbdom/modules/props')
    ],
    transposition: true
  }),
  JSONP: makeJSONPDriver()
})
