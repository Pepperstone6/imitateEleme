export function tabDom (selector, className) {
    const tabDoms = document.querySelectorAll(selector)
    for (tabDom of tabDoms) {
      console.log(tabDom)
     tabDom.addEventListener('click', (ev) => {
       console.log(1)
     })
    }
}