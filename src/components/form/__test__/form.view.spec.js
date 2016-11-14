/* global describe it */
// Form View tests
// ===============
// TODO:
// * use ramda
// * use helpers

import { run } from 'most-test'
import { just } from 'most'
import chai, { expect } from 'chai'
import chaiSubset from 'chai-subset'

chai.use(chaiSubset)

import view from '../form.view.js'

const initialState = {
  emailDisplay: '',
  emailError: '',
  checkEmailMessage: '',
  submitEnabled: false
}

describe('Form View', () => {
  it('should produce exactly one version of virtual tree sampled by one source change', () => {
    const env = run(view(just(initialState)))
    return env.tick().then(result => {
      return [
        // Make sure the stream didn't terminate
        expect(!('end' in result)).to.be.ok,
        expect(!('error' in result)).to.be.ok,
        // Ensure that the initial `periodic` value was emitted
        expect(result.events.length).to.be.equal(1),
        expect(result.events[0].constructor.name).to.be.equal('MotorcycleVNode')
      ]
    })
  })
  it('should show form field set', () => {
    const env = run(view(just(initialState)))
    return env.tick().then(result => {
      const VTree = result.events[0]
      return [
        expect(VTree).to.containSubset({
          children: [
            { sel: 'h3', text: 'Form example' },
            { sel: 'section',
              children: [
                { sel: 'label', text: 'Email: ' },
                { sel: 'input', data: { props: { className: 'email' } } },
                { sel: 'div', data: { props: { className: 'error' } } },
                { sel: 'button', text: 'Submit' }
              ]
            }
          ]
        })
      ]
    })
  })
  it('should have disabled submit button at beginning', () => {
    const env = run(view(just(initialState)))
    return env.tick().then(result => {
      const VTree = result.events[0]
      return [
        expect(VTree).to.containSubset({
          children: [
            { sel: 'section',
              children: [
                { sel: 'button', text: 'Submit', data: { props: { disabled: true } } }
              ]
            }
          ]
        })
      ]
    })
  })
})
