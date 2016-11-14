/* global describe it */

import { run } from 'most-test'
import { just, from } from 'most'
import chai, { expect } from 'chai'
import chaiSubset from 'chai-subset'
import { span, mockDOMSource } from '@motorcycle/dom'
chai.use(chaiSubset)
require('../../../utils/most-utils.js')

// most simple component
const MockComponent = () => ({
  DOM: just(span('.mock-component')),
  JSONP: from(['/'])
})

// create instances of tested component with overridden require statements
const component = require('proxy!../demo.component.js')({
  '../counter': MockComponent,
  '../form': MockComponent
}).default

const inputElements = {
  '.foo': {
    'click': just({target: {}}),
    'mouseover': just({target: {}})
  },
  '.bar': {
    'scroll': just({target: {}})
  }
}

const mockJSONPSource = {
  byKey: key => {
    switch (key) {
      case 'checkEndpoint':
        return just({ message: 'OK' })
      default:
        throw Error(`Non-mocked response ${key}`)
    }
  }
}

describe('Demo Component', () => {
  it('should produce virtual dom stream', done => {
    run(component({ DOM: mockDOMSource(inputElements), JSONP: mockJSONPSource }).DOM)
      .tick().then(result => {
        expect(result.events[0].constructor.name).to.be.equal('MotorcycleVNode')
        done()
      })
  })
  it('should produce request stream', done => {
    run(component({ DOM: mockDOMSource(inputElements), JSONP: mockJSONPSource }).JSONP)
      .tick().then(result => {
        expect(result.events[0].constructor.name).to.be.equal('String')
        done()
      })
  })
  it('should have exactly one emitted initial value', done => {
    run(component({ DOM: mockDOMSource(inputElements), JSONP: mockJSONPSource }).DOM)
      .tick(500).then(result => {
        expect(result.events.length).to.be.equal(1)
        done()
      })
  })
})
