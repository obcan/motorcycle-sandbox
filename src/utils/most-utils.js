// Most.js utilities & helpers
// ===========================

import most from 'most'
import { zipObj, keys, values } from 'ramda'

// helper for create form text field changes
export function createInputStream (DOM, className, startWith = '') {
  return DOM
    .select(className)
    .events('keyup')
    .map(ev => ev.target.value)
    .startWith(startWith)
    .skipRepeats()
}

// helper for create button clicks stream
export function createClickStream (DOM, className) {
  return DOM
    .select(className)
    .events('click')
}

// it works very similarly to combineArray but accept an object with values are streams
export const combineObject = most.Stream.prototype.combineObject = function (f, streamsObj) {
  return most.combineArray((current, ...streams) =>
    f(this, zipObj(keys(streamsObj), streams)), [this].concat(values(streamsObj)))
}

export const between = most.Stream.prototype.between = function (first, second) {
  return this.scan(first, () => second).switch()
}

export const notBetween = most.Stream.prototype.notBetween = function (first, second) {
  return most.merge(
    this.takeUntil(first),
    first.flatMapLatest(() => this.skipUntil(second))
  )
}

export const flatMapLatest = most.Stream.prototype.flatMapLatest = function (mapFunction) {
  return this.map(mapFunction).switch()
}

export const withLatestFrom = most.Stream.prototype.withLatestFrom = function (combinator, ...streams$) {
  return this.sample(combinator, this, ...streams$)
}
