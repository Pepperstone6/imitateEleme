import BMap from 'BMap'
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

export function createPosition () {
  return new Promise((resolve, reject) => {
    const map = new BMap.Map("allmap");
    const point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12)
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        const mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        resolve(r.point)
      }
      else {
        alert('failed'+this.getStatus());
      }        
    },{enableHighAccuracy: true})
  })
}