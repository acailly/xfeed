import store from "../store"

//DEBUG
window.search = v => store.searchFacts(v).then(r => console.log(r))
