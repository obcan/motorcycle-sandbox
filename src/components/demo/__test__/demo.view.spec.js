/* global describe it */

import { run } from 'most-test'
import { just } from 'most'
import chai, { expect } from 'chai'
import chaiSubset from 'chai-subset'
import { span } from '@motorcycle/dom'

chai.use(chaiSubset)
require('../../../utils/most-utils.js')

import view from '../demo.view.js'

const childrenDOM = {
  counterA: just(span('.child-a')),
  counterB: just(span('.child-b')),
  form: just(span('.child-c'))
}

describe('Demo View', () => {
  it('should show children components', () => {
    run(view(just({}), childrenDOM)).tick().then(result => {
      const VTree = result.events[0]
      return [
        expect(VTree).to.containSubset({
          children: [
            { sel: 'span.child-a' },
            { sel: 'span.child-b' },
            { sel: 'span.child-c' }
          ]
        })
      ]
    })
  })
})
