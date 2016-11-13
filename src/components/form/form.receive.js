// Form Responses
// ==============

import { of } from 'most'

// JSONP source -> Actions
export default function formReceive (JSONP) {
  // checked email addresses that is not already registered
  const check$ = JSONP
          .byKey('checkEndpoint')
          .flatMapLatest((a) => a.recoverWith(e => of({message: 'Server error'})))

  return { check$ }
}
