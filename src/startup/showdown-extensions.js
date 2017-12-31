import showdown from "showdown"

//https://developer.mozilla.org/fr/docs/D%C3%A9coder_encoder_en_base64#Premi%C3%A8re_solution_%E2%80%93_%C3%A9chapper_la_cha%C3%AEne_avant_de_l'encoder
const encodeInBase64 = str => window.btoa(unescape(encodeURIComponent(str)))

var encodeMFContent = {
  type: "lang",
  filter: function(text, converter, options) {
    return text.replace(
      /(<MF [^>]*>)([\s\S]*)(<\/MF>)/g,
      (match, p1, p2, p3) => {
        return `${p1}${encodeInBase64(p2)}${p3}`
      }
    )
  }
}
showdown.extension("encodeMFContent", encodeMFContent)
