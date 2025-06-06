const average = {
  init: function() {
    this.appendValueInput('v1')
    .setCheck('Number')
      .appendField('value1');
    this.appendValueInput('v2')
    .setCheck('Number')
      .appendField('value2');
    this.appendDummyInput('labl')
      .appendField('average');
    this.setOutput(true, 'Number');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({average: average});

const class4logic = {
  init: function() {
    this.appendDummyInput('expl')
      .appendField(new Blockly.FieldDropdown([
          ['int', 'int'],
          ['float', 'float'],
          ['str', 'str'],
          ['list', 'list']
        ]), 'class');
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(210);
  }
};
Blockly.common.defineBlocks({class4logic: class4logic});

const get_listelem = {
  init: function() {
    this.appendValueInput('list')
      .setCheck('Array')
        .appendField(new Blockly.FieldNumber(0), 'index')
          .appendField('th element of');
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(270);
  }
};
Blockly.common.defineBlocks({get_listelem: get_listelem});

const typeof_var = {
  init: function() {
    this.appendValueInput('variable')
      .appendField('type of');
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(135);
  }
};
Blockly.common.defineBlocks({typeof_var: typeof_var});

const gpio_out_ctl = {
  init: function() {
    this.appendDummyInput('explanation')
      .appendField('set GPIO No. ')
        .appendField(new Blockly.FieldNumber(0, 0, 27), 'pin')
        .appendField('to output ')
        .appendField(new Blockly.FieldDropdown([
          ['high', '1'],
          ['low', '0']
        ]), 'gpioval');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(75);
  }
};
Blockly.common.defineBlocks({gpio_out_ctl: gpio_out_ctl});

const gpio_set_read = {
  init: function() {
    this.appendDummyInput('explanation')
      .appendField('set GPIO No. ')
        .appendField(new Blockly.FieldNumber(0, 0, 27), 'pin')
        .appendField('reading mode')
        .appendField(new Blockly.FieldDropdown([
          ['high', '1'],
          ['low', '0']
        ]), 'pud');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(75);
  }
};
Blockly.common.defineBlocks({gpio_set_read: gpio_set_read});

const gpio_read_status = {
  init: function() {
    this.appendDummyInput('explanation')
      .appendField('status of GPIO pin')
        .appendField(new Blockly.FieldNumber(12, 0, 27), 'pin');
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(75);
  }
};
Blockly.common.defineBlocks({gpio_read_status: gpio_read_status});

const gpio_pwm_ctl = {
  init: function() {
    this.appendValueInput('duty')
    .setCheck('Number')
      .appendField('set  GPIO No. ')
        .appendField(new Blockly.FieldDropdown([
          ['12(PWM0)', '12'],
          ['18(PWM0)', '18'],
          ['13(PWM1)', '13']
        ]), 'pin')
      .appendField('PWM with Duty');
    this.appendDummyInput('expl1')
      .appendField('%, and Freq');
    this.appendValueInput('freq')
    .setCheck('Number');
    this.appendDummyInput('expl2')
      .appendField('Hz');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(75);
  }
};
Blockly.common.defineBlocks({gpio_pwm_ctl: gpio_pwm_ctl});

const gpio_servo_ctl = {
  init: function() {
    this.appendDummyInput('explanation')
      .appendField('set GPIO No. ')
      .appendField(new Blockly.FieldDropdown([
          ['12(PWM0)', '12'],
          ['18(PWM0)', '18'],
          ['13(PWM1)', '13']
        ]), 'pin')
      .appendField('to servo ctl. pulse')
      .appendField(new Blockly.FieldNumber(0, 0, 2500), 'pulse');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(75);
  }
};
Blockly.common.defineBlocks({gpio_servo_ctl: gpio_servo_ctl});

const sleep = {
  init: function() {
    this.appendDummyInput('length')
      .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), 'sec')
      .appendField('sec sleep');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({sleep: sleep});

const do_nothing = {
  init: function() {
    this.appendDummyInput('explanation')
      .appendField('do nothing');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(45);
  }
};
Blockly.common.defineBlocks({do_nothing: do_nothing});

const test_statement = {
  init: function() {
    this.appendValueInput('bol');
    this.appendDummyInput('exp1')
      .appendField('IF True');
    this.appendStatementInput('iftrue')
      .appendField('do');
    this.appendDummyInput('exp2')
      .appendField('IF False');
    this.appendStatementInput('ifalse')
      .appendField('do');
    this.setInputsInline(false)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({test_statement: test_statement});

const my_PiController = {
  init: function() {
    this.appendDummyInput('exp1')
      .appendField('my PiController with ')
      .appendField(new Blockly.FieldDropdown([
          ['Joy-Con', 'Joy-Con'],
          ['Joy-Con(R)', 'Joy-Con(R)'],
          ['Joy-Con(L)', 'Joy-Con(L)']
        ]), 'name');
    this.appendStatementInput('command')
      .appendField('command set');
    this.setInputsInline(false)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(270);
  }
};
Blockly.common.defineBlocks({my_PiController: my_PiController});

const cmd_distributor = {
  init: function() {
    this.appendStatementInput('btn_cmd')
      .appendField('Button cmd');
    this.appendStatementInput('jst_cmd')
      .appendField('JoyStick cmd');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(270);
  }
};
Blockly.common.defineBlocks({cmd_distributor: cmd_distributor});

const button_handler_joyconR = {
  init: function() {
    this.appendDummyInput('showside')
      .appendField('Joy-Con R');
    this.appendDummyInput('exp1')
      .appendField('if button')
      .appendField(new Blockly.FieldDropdown([
          ['X', 'NORTH'],
          ['A', 'EAST'],
          ['B', 'SOUTH'],
          ['Y', 'WEST'],
        ]), 'name')
      .appendField('is')
      .appendField(new Blockly.FieldDropdown([
          ['push', '1'],
          ['release', '0']
        ]), 'state');
    this.appendStatementInput('action')
      .appendField('do');
    this.setInputsInline(false)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(315);
  }
};
Blockly.common.defineBlocks({button_handler_joyconR: button_handler_joyconR});

const buton_handler_joyconL = {
  init: function() {
    this.appendDummyInput('showside')
      .appendField('Joy-Con L');
    this.appendDummyInput('expl')
      .appendField('if  button')
      .appendField(new Blockly.FieldDropdown([
          ['up', 'UP'],
          ['right', 'RIGHT'],
          ['down', 'DOWN'],
          ['left', 'LEFT'],
          ['L', 'TL']
        ]), 'name')
      .appendField('is')
      .appendField(new Blockly.FieldDropdown([
          ['push', '1'],
          ['release', '0']
        ]), 'state');
    this.appendStatementInput('action')
      .appendField('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('controller shall be vertical handed');
    this.setHelpUrl('');
    this.setColour(315);
  }
};
Blockly.common.defineBlocks({buton_handler_joyconL: buton_handler_joyconL});

const button_value = {
  init: function() {
    this.appendDummyInput('btnval')
      .appendField('Button input');
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(315);
  }
};
Blockly.common.defineBlocks({button_value: button_value});

const joystick_value = {
  init: function() {
    this.appendDummyInput('jskval')
      .appendField('JoyStick Input');
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({joystick_value: joystick_value});
