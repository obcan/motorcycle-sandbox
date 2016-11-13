// String utilities
// ================

// beside of native coercion this translate undefined and null to empty string
export function coerceToString (any) {
  if (any === null || typeof any === 'undefined') {
    return ''
  } else {
    return String(any)
  }
}
