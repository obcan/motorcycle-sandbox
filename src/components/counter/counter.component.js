// Counter Component
// =================
// automatic counter

import { periodic, merge, sample } from 'most'
import { div, h3, button } from '@motorcycle/dom'
import { compose } from 'ramda'
import { coerceToString as cs } from '../../utils/string-utils.js'
import style from './counter.scss'

// State -> DOM_Sink
export const view = state$ => state$.map(count => div([
  button(`.increment ${cs(style.increment)}`, 'Increment'),
  button(`.decrement ${cs(style.decrement)}`, 'Decrement'),
  h3(`Counter: ${count}`)
]))

// Action -> State
export const model = ({ sampler$, action$ }) =>
  sample(a => a, sampler$, action$)
  .scan((x, y) => x + y, 0)
  .skipRepeats()

// DOM_Source -> Action
export const intent = DOM => ({
  action$: merge(
    DOM.select('.decrement').events('click').map(() => -1),
    DOM.select('.increment').events('click').map(() => +1)
  ).startWith(0),
  sampler$: periodic(1000)
})

// DOM_Source -> DOM Sink
export const MVI = compose(view, model, intent)

// Sources -> Sinks
export default function CounterComponent ({ DOM }) {
  // produce virtual DOM
  return { DOM: MVI(DOM) }
}
