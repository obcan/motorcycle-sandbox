// Form Component
// ==============

// the component parts
import { model, view, intent, send, receive } from '.'

// Sources -> Sinks
export default function FormComponent ({ DOM, JSONP }) {
  // component abstract MVI-SR declaration
  // let
  const actions = intent(DOM)
  const responses = receive(JSONP)
  // in
  const states = model({ actions, responses })

  // produce virtual DOM && outgoing requests
  return {
    DOM: view(states.DOM),
    JSONP: send(states.JSONP)
  }
}
