/* global describe it */

import { run } from 'most-test'
import { just } from 'most'
import chai, { expect } from 'chai'
import chaiSubset from 'chai-subset'
import { mockDOMSource } from '@motorcycle/dom'

chai.use(chaiSubset)
require('../../../utils/most-utils.js')

import component from '../counter.component.js'

const inputElements = {
  '.foo': {
    'click': just({target: {}}),
    'mouseover': just({target: {}})
  },
  '.bar': {
    'scroll': just({target: {}})
  }
}

describe('Counter Component', () => {
  it('should show children components', () => {
    return run(component({ DOM: mockDOMSource(inputElements) }).DOM)
      .tick().then(result => {
        const VTree = result.events[0]
        window.w = VTree
        return expect(VTree).to.containSubset({
          children: [
            { sel: 'button.increment ' },
            { sel: 'button.decrement ' },
            { sel: 'h3', text: 'Counter: 0' }
          ]
        })
      })
  })
})
