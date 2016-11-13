// Demo Component
// ==============

import { of } from 'most'
import isolate from '@cycle/isolate'
import { prop, map } from 'ramda'
import view from './demo.view.js'
import CounterComponent from '../counter'
import FormComponent from '../form'

// Action -> State ( currently without business logic )
export const model = ({ actions, props$ }) => {
  return { DOM: props$ }
}

// DOM_Source -> Action ( currently without interaction with user )
export const intent = () => null

// Sources -> Sinks
export default function demoComponent (sources) {
  // constant attributes
  const props$ = of({
    title: 'Demo'
  })

  // responsibility for preparing child-components
  const children = {
    counterA: isolate(CounterComponent)(sources),
    counterB: isolate(CounterComponent)(sources),
    form: FormComponent(sources)
  }
  const childrenDOM = map(prop('DOM'), children)

  // component abstract MVI-RS declaration
  // let
  const actions = intent(sources.DOM, children)
  // in
  const states = model({ actions, props$ })
  const vnodes = view(states.DOM, childrenDOM)

  // produce virtual DOM && outgoing requests
  return {
    DOM: vnodes,
    JSONP: children.form.JSONP
  }
}
