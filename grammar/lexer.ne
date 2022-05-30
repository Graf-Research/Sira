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

const keywords_row = [
  'row', 'Row',
];

const keywords_table = [
  'table', 'Table',
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

const keywords_view_component = [
  'form', 'Form',
  'multiform', 'Multiform',
  'button', 'Button',
  'alert', 'Alert',
  'confirm', 'Confirm',
];

const lexer = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\n+/, lineBreaks: true },
  item_begin: /[\-]/,
  number: /[0-9]+/,
  comma: /\,/,
  dot: /\./,
  colon: /\:/,
  single_quote: /\'/,
  keywords_section_param,
  keywords_section_data,
  keywords_section_view,
  parenthesis: {
    match: /[\(\)\[\]\{\}]+/,
    type: moo.keywords({
      open_parenthesis: '(',
      close_parenthesis: ')',
      empty_row: '()',
      empty_table: '[]',
      open_bracket: '{',
      close_bracket: '}',
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
      keywords_row,
      keywords_table,
      keywords_view_component,
      keywords_query,
      keywords_source,
      keywords_goto,
      keywords_alert,
      keywords_confirm
    })
  },
  any: /.+/
});
%}

@lexer lexer
