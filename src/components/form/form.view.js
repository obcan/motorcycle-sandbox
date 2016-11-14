// Form View
// =========

import { section, label, div, h3, button, input } from '@motorcycle/dom'
import style from './form.scss'
import { coerceToString as cs } from '../../utils/string-utils.js'

// State -> DOM_Sink
export default function formView (state$) {
  return state$.map(state => div([
    h3(`Form example`),
    section(
      { props: { className: cs(style.formSection) } },
      [
        // form fields
        label('Email: ' + cs(state.checkEmailMessage)),
        input({ props: {
          className: 'email',
          type: 'text',
          value: state.emailDisplay
        } }),
        div({ props: {
          className: 'error'
        } }, state.emailError),
        // form actions
        button({ props: {
          disabled: !state.submitEnabled,
          className: 'submit'
        } }, 'Submit')
      ])

  ]))
}
