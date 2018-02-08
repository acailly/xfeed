//Ajouter dans la toolbox le code suivant
//<category name="Custom">
//	<block type="http_get"></block>
//</category>

Blockly.Blocks["http_get"] = {
  init: function() {
    this.jsonInit({
      type: "http_get",
      message0: "Récupérer les données depuis %1 l'adresse %2",
      args0: [
        {
          type: "input_dummy"
        },
        {
          type: "input_value",
          name: "URL",
          check: "String"
        }
      ],
      inputsInline: true,
      output: "String",
      colour: 285,
      tooltip: "Récupère les données depuis un ordinateur distant",
      helpUrl: "https://developer.mozilla.org/fr/docs/HTTP/M%C3%A9thode/GET"
    })
  }
}

Blockly.JavaScript["http_get"] = function(block) {
  var value_url = Blockly.JavaScript.valueToCode(
    block,
    "URL",
    Blockly.JavaScript.ORDER_ATOMIC
  )
  var startFunction = "function(){"
  var xmlHttp = "var xmlHttp = new XMLHttpRequest();"
  var xmlopen = "xmlHttp.open( 'GET', " + value_url + ", false );"
  var xmltry = "xmlHttp.send( null );" + "\n" + "return xmlHttp.responseText;"
  var endFonction = "}()"
  var code =
    startFunction +
    "\n" +
    xmlHttp +
    "\n" +
    xmlopen +
    "\n" +
    xmltry +
    "\n" +
    endFonction
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
