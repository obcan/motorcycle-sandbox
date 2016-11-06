import { periodic } from 'most'
import { h2 } from '@motorcycle/dom'

export default function counter ({ DOM }) {
  const sinks = {
    DOM: periodic(1000, 1).scan((acc, i) => acc + i, 0).map(i => h2('' + i + ' seconds elapsed.'))
  }

  return sinks
}
