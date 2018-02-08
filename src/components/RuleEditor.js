import React, {
  Component
} from "react"

//TODO ACY Ajouter un éditeur texte ? https://github.com/securingsincity/react-ace


//TODO ACY Creuser de ce coté https://github.com/google/blockly/issues/733
import "blockly/blockly_compressed"
import "blockly/blocks_compressed"
import "blockly/msg/js/en.js"
import "blockly/javascript_compressed"
// import "../blockly/block_console_log"

//TODO ACY Reproduire https://blockly-demo.appspot.com/static/demos/code/index.html
//=> https://github.com/google/blockly/tree/master/demos/code

//TODO ACY Autres liens utiles ?
//https://github.com/sbryant31/nativesync-frontend/blob/e5291a2b9f0ab230d7465bbbde7cb8f9ab9ce252/app/components/blockly/blockly_blocks.js
//https://github.com/sbryant31/nativesync-frontend/blob/e5291a2b9f0ab230d7465bbbde7cb8f9ab9ce252/app/components/blockly/editor.js

const toolbox = `
  <xml>
  <category name="%{BKY_CATLOGIC}" colour="%{BKY_LOGIC_HUE}">
  <block type="controls_if"></block>
  <block type="logic_compare"></block>
  <block type="logic_operation"></block>
  <block type="logic_negate"></block>
  <block type="logic_boolean"></block>
  <block type="logic_null"></block>
  <block type="logic_ternary"></block>
</category>
<category name="%{BKY_CATLOOPS}" colour="%{BKY_LOOPS_HUE}">
  <block type="controls_repeat_ext">
    <value name="TIMES">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
  </block>
  <block type="controls_whileUntil"></block>
  <block type="controls_for">
    <value name="FROM">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="TO">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
    <value name="BY">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="controls_forEach"></block>
  <block type="controls_flow_statements"></block>
</category>
<category name="%{BKY_CATMATH}" colour="%{BKY_MATH_HUE}">
  <block type="math_number"></block>
  <block type="math_arithmetic">
    <value name="A">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="B">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="math_single">
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">9</field>
      </shadow>
    </value>
  </block>
  <block type="math_trig">
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">45</field>
      </shadow>
    </value>
  </block>
  <block type="math_constant"></block>
  <block type="math_number_property">
    <value name="NUMBER_TO_CHECK">
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    </value>
  </block>
  <block type="math_round">
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">3.1</field>
      </shadow>
    </value>
  </block>
  <block type="math_on_list"></block>
  <block type="math_modulo">
    <value name="DIVIDEND">
      <shadow type="math_number">
        <field name="NUM">64</field>
      </shadow>
    </value>
    <value name="DIVISOR">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
  </block>
  <block type="math_constrain">
    <value name="VALUE">
      <shadow type="math_number">
        <field name="NUM">50</field>
      </shadow>
    </value>
    <value name="LOW">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="HIGH">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
  </block>
  <block type="math_random_int">
    <value name="FROM">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="TO">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
  </block>
  <block type="math_random_float"></block>
</category>
<category name="%{BKY_CATTEXT}" colour="%{BKY_TEXTS_HUE}">
  <block type="text"></block>
  <block type="text_join"></block>
  <block type="text_append">
    <value name="TEXT">
      <shadow type="text"></shadow>
    </value>
  </block>
  <block type="text_length">
    <value name="VALUE">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_isEmpty">
    <value name="VALUE">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="text_indexOf">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">{textVariable}</field>
      </block>
    </value>
    <value name="FIND">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_charAt">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">{textVariable}</field>
      </block>
    </value>
  </block>
  <block type="text_getSubstring">
    <value name="STRING">
      <block type="variables_get">
        <field name="VAR">{textVariable}</field>
      </block>
    </value>
  </block>
  <block type="text_changeCase">
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_trim">
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_print">
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_prompt_ext">
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
</category>
<category name="%{BKY_CATLISTS}" colour="%{BKY_LISTS_HUE}">
  <block type="lists_create_with">
    <mutation items="0"></mutation>
  </block>
  <block type="lists_create_with"></block>
  <block type="lists_repeat">
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">5</field>
      </shadow>
    </value>
  </block>
  <block type="lists_length"></block>
  <block type="lists_isEmpty"></block>
  <block type="lists_indexOf">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">{listVariable}</field>
      </block>
    </value>
  </block>
  <block type="lists_getIndex">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">{listVariable}</field>
      </block>
    </value>
  </block>
  <block type="lists_setIndex">
    <value name="LIST">
      <block type="variables_get">
        <field name="VAR">{listVariable}</field>
      </block>
    </value>
  </block>
  <block type="lists_getSublist">
    <value name="LIST">
      <block type="variables_get">
        <field name="VAR">{listVariable}</field>
      </block>
    </value>
  </block>
  <block type="lists_split">
    <value name="DELIM">
      <shadow type="text">
        <field name="TEXT">,</field>
      </shadow>
    </value>
  </block>
  <block type="lists_sort"></block>
</category>
<category name="%{BKY_CATCOLOUR}" colour="%{BKY_COLOUR_HUE}">
  <block type="colour_picker"></block>
  <block type="colour_random"></block>
  <block type="colour_rgb">
    <value name="RED">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
    <value name="GREEN">
      <shadow type="math_number">
        <field name="NUM">50</field>
      </shadow>
    </value>
    <value name="BLUE">
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    </value>
  </block>
  <block type="colour_blend">
    <value name="COLOUR1">
      <shadow type="colour_picker">
        <field name="COLOUR">#ff0000</field>
      </shadow>
    </value>
    <value name="COLOUR2">
      <shadow type="colour_picker">
        <field name="COLOUR">#3333ff</field>
      </shadow>
    </value>
    <value name="RATIO">
      <shadow type="math_number">
        <field name="NUM">0.5</field>
      </shadow>
    </value>
  </block>
</category>
<sep></sep>
<category name="%{BKY_CATVARIABLES}" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>
<category name="%{BKY_CATFUNCTIONS}" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></category>
  </xml>`

const workspaceConfiguration = {
  grid: {
    spacing: 20,
    length: 3,
    colour: "#ccc",
    snap: true
  }
}

const rootStyle = {
  height: "100vh",
  width: "100%"
}

const toolboxCategories = []

class RuleEditor extends Component {
  render() {
    return <div ref = {
      elem => (this.root = elem)
    }
    style = {
      rootStyle
    }
    />
  }

  componentDidMount() {
    var workspacePlayground = window.Blockly.inject(this.root, {
      toolbox: toolbox
    })
  }
}

export default RuleEditor