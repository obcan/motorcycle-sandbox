// Form Intent
// ===========

import { combine } from 'most'
import { partial } from 'ramda'
import { createInputStream, createClickStream } from '../../utils/most-utils.js'

// DOM_Source -> Action
export default function formIntent (DOM) {
  // partial apply arguments
  const _createInputStream = partial(createInputStream, [DOM])
  const _createClickStream = partial(createClickStream, [DOM])

  // user fill form
  const fillForm$ = combine(
    (emailDisplay) => ({
      emailDisplay,
      submitEnabled: !!emailDisplay
    }),
    _createInputStream('.email', ''))

  // user try submit form
  const submit$ = _createClickStream('.submit')
          .debounce(250)

  // return actions
  return { fillForm$, submit$ }
}
