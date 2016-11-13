// Demo View
// =========

import { div, h2 } from '@motorcycle/dom'
import style from './demo.scss'

// State -> DOM Sink
export default function demoView (state$, children) {
  // inject child components virtual nodes
  return state$.combineObject((state, children) => ({ ...state, children }), children)
    .map(state => div(`.${style.wrapper}`, [

      // root part of application template
      h2(`Demo`),
      state.children.counterA,
      state.children.counterB,
      state.children.form

    ]))
}
