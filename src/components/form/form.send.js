// Form Requests
// =============

const checkEndpoint = 'http://localhost:3001/check-already-registered'
const signUpEndpoint = 'http://localhost:3001/submit'

// State -> JSONP_Sink
export default function formSend ({ checkEmail$, submited$ }) {
  // check already registered user email addresses
  const checkEmailrequests$ = checkEmail$
          .debounce(500)
          .filter(query => query.length > 0)
          .map(q => ({ url: `${checkEndpoint}?q=${encodeURI(q)}`, key: 'checkEndpoint' }))

  // sign up request
  const submitRequest$ = submited$
          .map(data => ({ url: `${signUpEndpoint}`, data: data, key: 'submit' }))

  return checkEmailrequests$.merge(submitRequest$)
}
