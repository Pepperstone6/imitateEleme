export function setLocation (name, value) {
  window.localStorage.setItem(name, value)
}
export function getLocation (name, value) {
  return window.localStorage.getItem(name)
}
export function setSession (name, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value || [])
  }
  window.sessionStorage.setItem(name, value)
}
export function getSession (name, value) {
  return window.sessionStorage.getItem(name)
}
