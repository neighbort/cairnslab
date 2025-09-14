var toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
			kind: 'category',
			name: 'Logic',
			categorystyle: 'logic_category',
			contents: [
				{
					kind: 'block',
					type: 'controls_if',
				},
				{
					kind: 'block',
					type: 'logic_compare',
				},
				{
					kind: 'block',
					type: 'logic_operation',
				},
				{
					kind: 'block',
					type: 'logic_negate',
				},
				{
					kind: 'block',
					type: 'logic_boolean',
				},
				{
					kind: 'block',
					type: 'logic_null',
				},
				{
					kind: 'block',
					type: 'logic_ternary',
				},
				{
					kind: 'block',
					type: 'class4logic',
				},
      ],
		},
		{
			kind: 'category',
			name: 'Loops',
			categorystyle: 'loop_category',
			contents: [
				{
					kind: 'block',
					type: 'controls_repeat_ext',
					inputs: {
						TIMES: {
							block: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'controls_whileUntil',
				},
				{
					kind: 'block',
					type: 'controls_for',
					inputs: {
							FROM: {
							block: {
									type: 'math_number',
									fields: {
									NUM: 1
									},
							},
							},
							TO: {
							block: {
									type: 'math_number',
									fields: {
									NUM: 10
									},
							},
							},
							BY: {
							block: {
									type: 'math_number',
									fields: {
									NUM: 1
									},
							},
							},
					},
				},
				{
					kind: 'block',
					type: 'controls_forEach',
				},
				{
					kind: 'block',
					type: 'controls_flow_statements'
				},
      ],
    },
    {
			kind: 'category',
			name: 'Math',
			categorystyle: 'math_category',
			contents: [
        {
					kind: 'block',
					type: 'math_number',
					fields: {
						NUM: 123,
					},
        },
       	{
					kind: 'block',
					type: 'math_arithmetic',
				},
				{
					kind: 'block',
					type: 'math_single',
				},
				{
					kind: 'block',
					type: 'math_round',
					inputs: {
							NUM: {
							block: {
									type: 'math_number',
									fields: {
										NUM: 3.14
									},
							},
						},
					}
				},
        {
					kind: 'block',
					type: 'math_modulo',
					inputs: {
						DIVIDEND: {
							block: {
								type: 'math_number',
								fields: {
									NUM: 64
								},
							},
						},
						DIVISOR: {
							block: {
								type: 'math_number',
								fields: {
									NUM: 10
								},
							},
						},
					},
				},
        {
					kind: 'block',
					type: 'math_random_int',
					inputs: {
            FROM: {
      	      block: {
                type: 'math_number',
                fields: {
                  NUM: 1
                },
              },
            },
            TO: {
              block: {
                type: 'math_number',
                fields: {
                  NUM: 100
                },
              },
            },
          },
        },
      ],
		},
		{
			kind: 'category',
			name: 'Text',
			categorystyle: 'text_category',
			contents: [
        {
					kind: 'block',
					type: 'text',
				},
				{
					kind: 'block',
					type: 'text_length',
				},
				{
					kind: 'block',
					type: 'text_print',
				},
				{
					kind: 'block',
					type: 'typeof_var',
				},
			],
		},
		{
			kind: 'category',
			name: 'Lists',
			categorystyle: 'list_category',
			contents: [
				{
					kind: 'block',
					type: 'lists_create_with',
				},
				{
					kind: 'block',
					type: 'lists_repeat',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 5,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_length',
				},
				{
					kind: 'block',
					type: 'lists_sort',
				},
				{
					kind: 'block',
					type: 'lists_reverse',
				},
				{
					kind: 'block',
					type: 'get_listelem',
				},
			],
		},
		{
			kind: 'category',
			name: 'Excutables',
			categorystyle: 'text_category',
			contents: [
				{
					kind: 'block',
					type: 'text_print',
				},
				{
					kind: 'block',
					type: 'sleep'
				},
				{
					kind: 'block',
					type: 'do_nothing',
				},
			],
		},
		{
			kind: 'category',
			name: 'Variables',
			categorystyle: 'variable_category',
			custom: 'VARIABLE',
		},
		{
			kind: 'category',
			name: 'Functions',
			categorystyle: 'procedure_category',
			custom: 'PROCEDURE',
		},
		{
			kind: 'category',
			name: 'RPi',
			categorystyle: 'text_category',
			contents: [
				{
					kind: 'block',
					type: 'init_gpio',
				},
				{ 
					kind: 'block',
					type: 'gpio_out_ctl',
				},
				{
					kind: 'block',
					type: 'gpio_set_read',
				},
				{
					kind: 'block',
					type: 'gpio_read_status',
				},
				{
					kind: 'block',
					type: 'gpio_pwm_ctl',
				},
				{
					kind: 'block',
					type: 'gpio_servo_ctl',
				},
			],
		},
		{
			kind: 'category',
			name: 'JoyCon',
			categorystyle: 'text_category',
			contents: [
				{
					kind: 'block',
					type: 'my_PiController',
				},
				{
					kind: 'block',
					type: 'cmd_distributor',
				},
				{
					kind: 'block',
					type: 'button_handler_joyconR',
				},
				{
					kind: 'block',
					type: 'buton_handler_joyconL',
				},
				{
					kind: 'block',
					type: 'button_value',
				},
				{
					kind: 'block',
					type: 'joystick_value',
				},
			],
		},
	],
};