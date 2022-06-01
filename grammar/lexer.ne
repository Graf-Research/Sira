@{%
const moo = require("moo");

const keywords_page = [
  'page', 'Page',
];

const keywords_section_param = [
  '[param]', '[Param]',
];

const keywords_section_data = [
  '[data]', '[Data]',
];

const keywords_query = [
  'query', 'Query',
];

const keywords_section_view = [
  '[view]', '[View]',
];

const keywords_cell = [
  'cell', 'Cell',
];

const keywords_row = [
  'row', 'Row',
];

const keywords_table = [
  'table', 'Table',
];

const keywords_form = [
  'form', 'Form',
];

const keywords_multiform = [
  'multiform', 'Multiform', 'MultiForm',
];

const keywords_dropdown = [
  'dropdown', 'Dropdown',
];

const keywords_radio = [
  'radio', 'Radio',
];

const keywords_source = [
  'source', 'Source',
];

const keywords_goto = [
  'goto', 'Goto',
];

const keywords_alert = [
  'alert', 'Alert',
];

const keywords_confirm = [
  'confirm', 'Confirm',
];

const keywords_button = [
  'button', 'Button',
];

const keywords_type_text = [
  'text', 'Text'
];

const keywords_type_bigtext = [
  'bigtext', 'Bigtext', 'BigText'
];

const keywords_type_numeric = [
  'numeric', 'Numeric'
];

const keywords_type_date = [
  'date', 'Date'
];

const keywords_type_time = [
  'time', 'Time'
];

const keywords_type_datetime = [
  'datetime', 'DateTime', 'Datetime'
];

const lexer = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\n+/, lineBreaks: true },
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  item_begin: /[\-]/,
  comma: /\,/,
  dot: /\./,
  colon: /\:/,
  single_quote: /\'/,
  keywords_section_param,
  keywords_section_data,
  keywords_section_view,
  parenthesis: {
    match: /[\(\)]+/,
    type: moo.keywords({
      empty_row: '()',
      open_parenthesis: '(',
      close_parenthesis: ')',
    })
  },
  brackets: {
    match: /[\{\}]+/,
    type: moo.keywords({
      open_bracket: '{',
      close_bracket: '}',
    })
  },
  sq_brackets: {
    match: /[\[\]]+/,
    type: moo.keywords({
      empty_table: '[]',
      open_sq_bracket: '[',
      close_sq_bracket: ']',
    })
  },
  equals: /\=/,
  param: /\$[a-zA-Z0-9_]+/,
  indent: '\u27F6',
  dedent: '\u27F5',
  variable: {
    match: /[a-zA-Z_][a-zA-Z0-9_]*/,
    type: moo.keywords({
      keywords_page,
      keywords_cell,
      keywords_row,
      keywords_table,
      keywords_query,
      keywords_source,
      keywords_goto,
      keywords_alert,
      keywords_confirm,
      keywords_type_text,
      keywords_type_bigtext,
      keywords_type_numeric,
      keywords_form,
      keywords_dropdown,
      keywords_radio,
      keywords_button,
      keywords_multiform,
      keywords_type_datetime,
      keywords_type_date,
      keywords_type_time
    })
  },
  number: /[0-9]+/,
  any: /.+/
});
%}

@lexer lexer
