export function tabDom (selector, className) {
    const tabDoms = document.querySelectorAll(selector)
    for (tabDom of tabDoms) {
      console.log(tabDom)
     tabDom.addEventListener('click', (ev) => {
       console.log(1)
     })
    }
}
export function hasClass (node, className) {
  if(!node || !node.className){
    return
  }
  let reg = '/'+className+'/g'
  let str = node.className
  return eval(reg).exec(str) ? true : false
}
export function addClass (node, className) {
  if(hasClass(node, className)){
    return
  }
  let arr = node.className.split(' ')
  arr.push(className)
  node.className = arr.join(' ')
}
export function removeClass (node, className){
  if(!hasClass(node, className)){
    return
  }
  let str = node.className
  let reg = '/'+className+'/g'
  node.className = str.replace(eval(reg),'')

}