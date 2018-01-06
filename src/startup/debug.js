import store from "../store"

//DEBUG
window.search = v => store.search(v).then(r => console.log(r))
