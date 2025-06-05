python.pythonGenerator.forBlock['average'] = function(block, generator) {
    // TODO: change Order.ATOMIC to the correct operator precedence strength
    const value_v1 = generator.valueToCode(block, 'v1', python.Order.ATOMIC);
    // TODO: change Order.ATOMIC to the correct operator precedence strength
    const value_v2 = generator.valueToCode(block, 'v2', python.Order.ATOMIC);
    // TODO: Assemble javascript into the code variable.
    const code = '(' + value_v1 + '+' + value_v2 + ')/2';
    // TODO: Change Order.NONE to the correct operator precedence strength
    return [code, python.Order.NONE];
  }

python.pythonGenerator.forBlock['class4logic'] = function(block, generator) {
  const dropdown_class = block.getFieldValue('class');
  // TODO: Assemble python into the code variable.
  const code = dropdown_class;
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
}

python.pythonGenerator.forBlock['get_listelem'] = function(block, generator) {
  const number_index = block.getFieldValue('index');
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_list = generator.valueToCode(block, 'list', python.Order.ATOMIC);
  // TODO: Assemble python into the code variable.
  const code = value_list + '[' + number_index + ']';
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
}

python.pythonGenerator.forBlock['typeof_var'] = function(block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_variable = generator.valueToCode(block, 'variable', python.Order.ATOMIC);
  // TODO: Assemble python into the code variable.
  const code = 'type(' + value_variable + ')';
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
}

python.pythonGenerator.forBlock['gpio_out_ctl'] = function(block, generator) {
  const number_pin = block.getFieldValue('pin');
  const dropdown_gpioval = block.getFieldValue('gpioval');
  // TODO: Assemble python into the code variable.
  const code = 'import pigpio\n'
	+ 'pi = pigpio.pi()\n'
	+ 'pi.set_mode(' + number_pin + ', pigpio.OUTPUT)\n'
	+ 'pi.write(' + number_pin + ',' + dropdown_gpioval + ')\n';
  return code;
}

python.pythonGenerator.forBlock['gpio_set_read'] = function(block, generator) {
  const number_pin = block.getFieldValue('pin');
  const dropdown_pud = block.getFieldValue('pud');
  // TODO: Assemble python into the code variable.
  const code = 'import pigpio\n'
	+ 'pi = pigpio.pi()\n'
	+ 'pi.set_mode(' + number_pin + ', pigpio.INPUT)\n'
	+ 'pi.set_pull_up_down(' + number_pin + ', pigpio.PUD_UP) if ' + dropdown_pud + '== 1 else pi.set_pull_up_down(' + number_pin + ', pigpio.PUD_DOWN)\n';
  return code;
}

python.pythonGenerator.forBlock['gpio_read_status'] = function(block, generator) {
  const number_pin = block.getFieldValue('pin');
  // TODO: Assemble python into the code variable.
  const code = 'pi.read(' + number_pin + ')';
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
}

python.pythonGenerator.forBlock['gpio_pwm_ctl'] = function(block, generator) {
  const dropdown_pin = block.getFieldValue('pin');
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_duty = generator.valueToCode(block, 'duty', python.Order.ATOMIC);
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_freq = generator.valueToCode(block, 'freq', python.Order.ATOMIC);
  // TODO: Assemble python into the code variable.
  const code = 'import pigpio\n'
	+ 'pi = pigpio.pi()\n'
	+ 'if ' + value_duty + '<0 or 100<' + value_duty + ':\n'
	+ '\tduty=0\n'
	+ 'else:\n'
	+ '\tduty=int(' + value_duty + '*1000000/100)\n'
	+ 'if ' + value_freq + '<0 or 2e+07<' + value_freq + ':\n'
	+ '\tfreq=0\n'
	+ 'else:\n'
	+ '\tfreq=' + value_freq + '\n'
	+ 'pi.hardware_PWM(' + dropdown_pin + ', freq, duty)\n';
  return code;
}

python.pythonGenerator.forBlock['gpio_servo_ctl'] = function(block, generator) {
  const dropdown_pin = block.getFieldValue('pin');
  const number_pulse = block.getFieldValue('pulse');
  // TODO: Assemble python into the code variable.
  const code = 'import pigpio\n'
	+ 'pi = pigpio.pi()\n'
	+ 'if ' + number_pulse + '<500:\n'
	+ '\tpi.set_servo_pulsewidth(' + dropdown_pin + ', 0)\n'
	+ 'else:\n'
	+ '\tpi.set_servo_pulsewidth(' + dropdown_pin + ', ' + number_pulse + ')\n';
  return code;
}

python.pythonGenerator.forBlock['sleep'] = function(block, generator) {
  const number_sec = block.getFieldValue('sec');
  // TODO: Assemble python into the code variable.
//  const code = 'from time import sleep;';
  const code = 'from time import sleep\n'
	+ 'sleep(' + number_sec + ')\n';
  return code;
}

python.pythonGenerator.forBlock['do_nothing'] = function(block, generator) {
  // TODO: Assemble python into the code variable.
  const code = 'pass';
  return code;
}

python.pythonGenerator.forBlock['test_statement'] = function(block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_bol = generator.valueToCode(block, 'bol', python.Order.ATOMIC);
  const statement_iftrue = generator.statementToCode(block, 'iftrue');
  const statement_ifalse = generator.statementToCode(block, 'ifalse');
  // TODO: Assemble python into the code variable.
  const code = 'print("start")\n'
	+ 'if ' + value_bol + ' == True:\n'
	+ statement_iftrue + '\n'
	+ 'elif ' + value_bol + ' == False:\n'
	+ statement_ifalse + '\n';
  return code;
}

python.pythonGenerator.forBlock['my_PiController'] = function(block, generator) {
  const dropdown_name = block.getFieldValue('name');
  const statement_command = generator.statementToCode(block, 'command');
  // TODO: Assemble python into the code variable.
  const code = 'from evdev import InputDevice, categorize, ecodes, list_devices\n'
	+ 'print(list_devices())\n'
	+ 'joycon = False\n'
	+ 'for path in list_devices():\n'
	+ '\tprint(InputDevice(path).name, path)\n'
	+ '\tif "' + dropdown_name + '" in InputDevice(path).name:\n'
	+ '\t\tjoycon = InputDevice(path)\n'
	+ '\t\tjoycon_name = joycon.name\n'
	+ '\t\tbreak\n'
	+ 'print("Failed, please connect the Joy-Con to RaspberryPi") if not joycon else print("success")\n'
	+ 'for event in joycon.read_loop():\n'
	+ statement_command + '\n';
  return code;
}

python.pythonGenerator.forBlock['cmd_distributor'] = function(block, generator) {
  const statement_btn_cmd = generator.statementToCode(block, 'btn_cmd');
  const statement_jst_cmd = generator.statementToCode(block, 'jst_cmd');
  // TODO: Assemble python into the code variable.
  const code = 'if event.type == ecodes.EV_KEY:\n'
	+ statement_btn_cmd + '\n'
	+ 'elif event.type == ecodes.EV_ABS:\n'
	+ statement_jst_cmd + '\n';
  return code;
}

python.pythonGenerator.forBlock['button_handler_joyconR'] = function(block, generator) {
  const dropdown_name = block.getFieldValue('name');
  const dropdown_state = block.getFieldValue('state');
  const statement_action = generator.statementToCode(block, 'action');
  // TODO: Assemble python into the code variable.
  const code = 'keyev = categorize(event)\n'
//	+ 'print(keyev)\n'
	+ 'if (event.type==ecodes.EV_KEY) and any("' + dropdown_name + '" in each for each in keyev.keycode) and (keyev.keystate==' + dropdown_state + '):\n'
	+ statement_action + '\n';
  return code;
}

python.pythonGenerator.forBlock['buton_handler_joyconL'] = function(block, generator) {
  const dropdown_name = block.getFieldValue('name');
  const dropdown_state = block.getFieldValue('state');
  const statement_action = generator.statementToCode(block, 'action');
  // TODO: Assemble python into the code variable.
  const code = 'keyev = categorize(event)\n'
//	+ 'print(keyev)\n'
	+ 'if (event.type==ecodes.EV_KEY) and ("' + dropdown_name + '" in keyev.keycode) and (keyev.keystate==' + dropdown_state + '):\n'
	+ statement_action + '\n';
  return code;
}

python.pythonGenerator.forBlock['button_value'] = function(block, generator) {
  // TODO: Assemble python into the code variable.
  const code = '[categorize(event).keycode, event.value]';
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
}

python.pythonGenerator.forBlock['joystick_value'] = function(block, generator) {
  // TODO: Assemble python into the code variable.
  const code = '[ecodes.ABS[event.code], event.value]';
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
}
