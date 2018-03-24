(function () {
  const style = document.createElement('style')
  let width = document.documentElement.clientWidth / 10
  style.innerHTML = `html {font-size:${width}px}`
  document.head.appendChild(style)
})()
