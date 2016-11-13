// JSON-P driver for CORS requests
// ===============================

import jsonp from 'browser-jsonp'
import { fromPromise, of } from 'most'

function createResponse (url, data) {
  if (typeof url !== `string`) {
    return of(new Error(`Observable of requests given to JSONP ` +
                        `Driver must emit URL strings.`))
  } else {
    return fromPromise(new Promise((resolve, reject) => {
      try {
        jsonp({ url, data, success: resolve, error: reject })
      } catch (err) {
        reject(err)
      }
    }))
  }
}

function getUrl (request) {
  return request.input && request.input.url || request.url
}

function byKey (response$$, key) {
  return response$$
    .filter(response$ => response$.request.key === key)
}

function byUrl (response$$, url) {
  return response$$
    .filter(response$ => getUrl(response$.request) === url)
}

export function makeJSONPDriver () {
  return function jsonpDriver (request$) {
    let resonse$$ = request$.map(payload => {
      // let
      const url = payload.url || payload
      const data = payload.data || {}
      const key = payload.key || null
      // in
      return Object.assign(createResponse(url, data), { request: { url, key } })
    })
    resonse$$.byKey = byKey.bind(null, resonse$$)
    resonse$$.byUrl = byUrl.bind(null, resonse$$)
    return resonse$$
  }
}
