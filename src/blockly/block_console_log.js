//Ajouter dans la toolbox le code suivant
//<category name="Custom">
//	<block type="console_log"></block>
//</category>

Blockly.Blocks["console_log"] = {
  init: function() {
    this.jsonInit({
      type: "console_log",
      message0: "Afficher dans la console %1 le résultat de %2",
      args0: [
        {
          type: "input_dummy"
        },
        {
          type: "input_value",
          name: "VALUE",
          check: "String"
        }
      ],
      inputsInline: true,
      colour: 285,
      tooltip: "Affiche des données dans la console du navigateur",
      helpUrl: "https://developer.mozilla.org/fr/docs/Web/API/Console/log"
    })
  }
}

Blockly.JavaScript["console_log"] = function(block) {
  var argument0 =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_ATOMIC
    ) || "''"
  return ["console.log(" + argument0 + ");", Blockly.JavaScript.ORDER_MEMBER]
}
