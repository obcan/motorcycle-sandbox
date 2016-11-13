// Form Model
// ==========

// Action -> State
export default function signUpFormModel ({ actions, responses }) {
  const { fillForm$, submit$ } = actions
  const { check$ } = responses

  // form validation
  const validated$ = fillForm$.map(state => {
    // check only non-empty fields
    const emailIsFilled = state.emailDisplay.length > 1

    // very primitive validation add show error messages
    const emailError = emailIsFilled && !isValidEmail(state.emailDisplay)
      ? 'Please enter valid email address' : ''

    return {
      ...state,
      emailError,
      submitEnabled: emailIsFilled && !emailError
    }
  })

  const checkedEmail$ = validated$.combine((a, b) => {
    return {...a, checkEmailMessage: b.message}
  }, check$)

  // check only valid email address
  const checkEmail$ = validated$
          .filter(state => !state.emailError)
          .map(state => state.emailDisplay)

  // prepare sanitized data before request and send request on  if the email is checked
  const submited$ = checkedEmail$
          .filter(state => state.checkEmailMessage === 'OK')
          .sampleWith(submit$).map((state) => ({
            emailValue: state.emailDisplay.trim()
          }))

  return { DOM: validated$.merge(checkedEmail$), JSONP: { checkEmail$, submited$ } }
}

function isValidEmail (input) {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))
}
