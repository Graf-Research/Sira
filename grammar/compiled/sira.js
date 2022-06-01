// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "__MAIN__", "symbols": ["page"], "postprocess": id},
    {"name": "page", "symbols": [(lexer.has("keywords_page") ? {type: "keywords_page"} : keywords_page), (lexer.has("ws") ? {type: "ws"} : ws), "STR", "OPEN_TAG", "sections", "CLOSE_TAG"], "postprocess":  d => ({
          title: d[2],
          sections: d[4]
        }) },
    {"name": "sections", "symbols": ["sections", "section"], "postprocess": d => [...d[0], d[1]]},
    {"name": "sections", "symbols": ["section"]},
    {"name": "section", "symbols": ["section_param"], "postprocess":  d => ({
          type: 'param',
          data: d[0]
        }) },
    {"name": "section", "symbols": ["section_data"], "postprocess":  d => ({
          type: 'data',
          data: d[0]
        }) },
    {"name": "section", "symbols": ["section_view"], "postprocess":  d => ({
          type: 'view',
          data: d[0]
        }) },
    {"name": "section_param", "symbols": [(lexer.has("keywords_section_param") ? {type: "keywords_section_param"} : keywords_section_param), "OPEN_TAG", "params", "CLOSE_TAG"], "postprocess": d => d[2]},
    {"name": "params", "symbols": ["params", (lexer.has("nl") ? {type: "nl"} : nl), (lexer.has("param") ? {type: "param"} : param)], "postprocess": d => [...d[0], d[2]]},
    {"name": "params", "symbols": [(lexer.has("param") ? {type: "param"} : param)]},
    {"name": "section_data", "symbols": [(lexer.has("keywords_section_data") ? {type: "keywords_section_data"} : keywords_section_data), "OPEN_TAG", "datas", "CLOSE_TAG"], "postprocess": d => d[2]},
    {"name": "datas", "symbols": ["datas", (lexer.has("nl") ? {type: "nl"} : nl), "data"], "postprocess": d => [...d[0], d[2]]},
    {"name": "datas", "symbols": ["data"]},
    {"name": "data", "symbols": ["variable_assignment"], "postprocess": id},
    {"name": "section_view", "symbols": [(lexer.has("keywords_section_view") ? {type: "keywords_section_view"} : keywords_section_view), "OPEN_TAG", "views", "CLOSE_TAG"], "postprocess": d => d[2]},
    {"name": "views$ebnf$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "views$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "views", "symbols": ["views", "views$ebnf$1", "view"], "postprocess": d => [...d[0], d[2]]},
    {"name": "views", "symbols": ["view"]},
    {"name": "view", "symbols": ["view_component"], "postprocess": id},
    {"name": "view_component", "symbols": ["vc_table"], "postprocess":  d => ({
          type: 'table',
          data: d[0]
        }) },
    {"name": "view_component", "symbols": ["vc_multiform"], "postprocess":  d => ({
          type: 'multiform',
          data: d[0]
        }) },
    {"name": "view_component", "symbols": ["vc_form"], "postprocess":  d => ({
          type: 'form',
          data: d[0]
        }) },
    {"name": "view_component", "symbols": ["vc_button"], "postprocess":  d => ({
          type: 'button',
          data: d[0]
        }) },
    {"name": "vc_button$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_button$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_button", "symbols": [(lexer.has("keywords_button") ? {type: "keywords_button"} : keywords_button), (lexer.has("ws") ? {type: "ws"} : ws), "STR", "vc_button$ebnf$1", (lexer.has("open_bracket") ? {type: "open_bracket"} : open_bracket), "OPEN_TAG", "statements", "CLOSE_TAG", (lexer.has("close_bracket") ? {type: "close_bracket"} : close_bracket)], "postprocess":  d => ({
          label: d[2],
          statements: d[6]
        }) },
    {"name": "vc_multiform$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_multiform$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_multiform", "symbols": [(lexer.has("keywords_multiform") ? {type: "keywords_multiform"} : keywords_multiform), (lexer.has("ws") ? {type: "ws"} : ws), "STR", "vc_multiform$ebnf$1", "data_source", "OPEN_TAG", "vc_form_items", "CLOSE_TAG"], "postprocess":  d => ({
          name: d[2],
          source_target: d[4],
          items: d[6]
        }) },
    {"name": "vc_form", "symbols": [(lexer.has("keywords_form") ? {type: "keywords_form"} : keywords_form), (lexer.has("ws") ? {type: "ws"} : ws), "STR", "OPEN_TAG", "vc_form_items", "CLOSE_TAG"], "postprocess":  d => ({
          name: d[2],
          items: d[4]
        }) },
    {"name": "vc_form_items", "symbols": ["vc_form_items", (lexer.has("nl") ? {type: "nl"} : nl), "vc_form_item"], "postprocess": d=> [...d[0], d[2]]},
    {"name": "vc_form_items", "symbols": ["vc_form_item"]},
    {"name": "vc_form_item$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_form_item$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_form_item$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_form_item$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_form_item$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_form_item$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_form_item", "symbols": [(lexer.has("item_begin") ? {type: "item_begin"} : item_begin), "vc_form_item$ebnf$1", "STR", "vc_form_item$ebnf$2", (lexer.has("colon") ? {type: "colon"} : colon), "vc_form_item$ebnf$3", "variable_access", (lexer.has("ws") ? {type: "ws"} : ws), "form_type"], "postprocess":  d => ({
          label: d[2],
          source_target: {
            variable: d[6],
            ...d[8]
          }
        }) },
    {"name": "form_type", "symbols": [(lexer.has("keywords_type_text") ? {type: "keywords_type_text"} : keywords_type_text)], "postprocess":  d => ({
          type: 'text'
        }) },
    {"name": "form_type", "symbols": [(lexer.has("keywords_type_bigtext") ? {type: "keywords_type_bigtext"} : keywords_type_bigtext)], "postprocess":  d => ({
          type: 'bigtext'
        }) },
    {"name": "form_type", "symbols": [(lexer.has("keywords_type_numeric") ? {type: "keywords_type_numeric"} : keywords_type_numeric)], "postprocess":  d => ({
          type: 'numeric'
        }) },
    {"name": "form_type", "symbols": [(lexer.has("keywords_type_datetime") ? {type: "keywords_type_datetime"} : keywords_type_datetime)], "postprocess":  d => ({
          type: 'datetime'
        }) },
    {"name": "form_type", "symbols": [(lexer.has("keywords_type_date") ? {type: "keywords_type_date"} : keywords_type_date)], "postprocess":  d => ({
          type: 'date'
        }) },
    {"name": "form_type", "symbols": [(lexer.has("keywords_type_time") ? {type: "keywords_type_time"} : keywords_type_time)], "postprocess":  d => ({
          type: 'time'
        }) },
    {"name": "form_type", "symbols": ["form_type_dropdown"], "postprocess":  d => ({
          type: 'dropdown',
          source: d[0]
        }) },
    {"name": "form_type", "symbols": ["form_type_radio"], "postprocess":  d => ({
          type: 'radio',
          source: d[0]
        }) },
    {"name": "form_type_dropdown$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "form_type_dropdown$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "form_type_dropdown", "symbols": [(lexer.has("keywords_dropdown") ? {type: "keywords_dropdown"} : keywords_dropdown), "form_type_dropdown$ebnf$1", "data_source"], "postprocess": d => d[2]},
    {"name": "form_type_radio$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "form_type_radio$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "form_type_radio", "symbols": [(lexer.has("keywords_radio") ? {type: "keywords_radio"} : keywords_radio), "form_type_radio$ebnf$1", "data_source"], "postprocess": d => d[2]},
    {"name": "vc_table", "symbols": [(lexer.has("keywords_table") ? {type: "keywords_table"} : keywords_table), (lexer.has("ws") ? {type: "ws"} : ws), "STR", (lexer.has("ws") ? {type: "ws"} : ws), "data_source", "OPEN_TAG", "vc_table_items", "CLOSE_TAG"], "postprocess":  d => ({
          name: d[2],
          source: d[4],
          items: d[6]
        }) },
    {"name": "vc_table_items", "symbols": ["vc_table_items", (lexer.has("nl") ? {type: "nl"} : nl), "vc_table_item"], "postprocess": d => [...d[0], d[2]]},
    {"name": "vc_table_items", "symbols": ["vc_table_item"]},
    {"name": "vc_table_item", "symbols": ["vc_table_item_cell"], "postprocess":  d => ({
          type: 'cell',
          data: d[0]
        }) },
    {"name": "vc_table_item", "symbols": ["vc_table_item_button"], "postprocess":  d => ({
          type: 'button',
          data: d[0]
        }) },
    {"name": "vc_table_item_cell$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_cell$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_cell$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_cell$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_cell$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_cell$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_cell", "symbols": [(lexer.has("item_begin") ? {type: "item_begin"} : item_begin), "vc_table_item_cell$ebnf$1", "STR", "vc_table_item_cell$ebnf$2", (lexer.has("colon") ? {type: "colon"} : colon), "vc_table_item_cell$ebnf$3", "variable_access", (lexer.has("ws") ? {type: "ws"} : ws), "table_type"], "postprocess":  d => ({
          label: d[2],
          source: {
            variable: d[6],
            type: d[8]
          },
        }) },
    {"name": "vc_table_item_button$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_button$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_button$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_button$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_button", "symbols": [(lexer.has("item_begin") ? {type: "item_begin"} : item_begin), "vc_table_item_button$ebnf$1", "STR", "vc_table_item_button$ebnf$2", (lexer.has("open_bracket") ? {type: "open_bracket"} : open_bracket), "OPEN_TAG", "statements", "CLOSE_TAG", (lexer.has("close_bracket") ? {type: "close_bracket"} : close_bracket)], "postprocess":  d => ({
          label: d[2],
          statements: d[6]
        }) },
    {"name": "table_type", "symbols": [(lexer.has("keywords_type_text") ? {type: "keywords_type_text"} : keywords_type_text)], "postprocess": id},
    {"name": "table_type", "symbols": [(lexer.has("keywords_type_bigtext") ? {type: "keywords_type_bigtext"} : keywords_type_bigtext)], "postprocess": id},
    {"name": "table_type", "symbols": [(lexer.has("keywords_type_numeric") ? {type: "keywords_type_numeric"} : keywords_type_numeric)], "postprocess": id},
    {"name": "data_source$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "data_source$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "data_source$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "data_source$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "data_source$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "data_source$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "data_source$ebnf$4", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "data_source$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "data_source", "symbols": [(lexer.has("open_parenthesis") ? {type: "open_parenthesis"} : open_parenthesis), "data_source$ebnf$1", (lexer.has("keywords_source") ? {type: "keywords_source"} : keywords_source), "data_source$ebnf$2", (lexer.has("equals") ? {type: "equals"} : equals), "data_source$ebnf$3", (lexer.has("variable") ? {type: "variable"} : variable), "data_source$ebnf$4", (lexer.has("close_parenthesis") ? {type: "close_parenthesis"} : close_parenthesis)], "postprocess": d => d[6]},
    {"name": "statements", "symbols": ["statements", (lexer.has("nl") ? {type: "nl"} : nl), "statement"], "postprocess": d => [...d[0], d[2]]},
    {"name": "statements", "symbols": ["statement"]},
    {"name": "statement", "symbols": ["query"], "postprocess":  d => ({
          type: 'query',
          data: d[0]
        }) },
    {"name": "statement", "symbols": ["variable_assignment"], "postprocess":  d => ({
          type: 'variable-assignment',
          data: d[0]
        }) },
    {"name": "statement", "symbols": ["goto"], "postprocess":  d => ({
          type: 'goto',
          data: d[0]
        }) },
    {"name": "statement", "symbols": ["alert"], "postprocess":  d => ({
          type: 'alert',
          data: d[0]
        }) },
    {"name": "statement", "symbols": ["confirm"], "postprocess":  d => ({
          type: 'confirm',
          data: d[0]
        }) },
    {"name": "goto", "symbols": [(lexer.has("keywords_goto") ? {type: "keywords_goto"} : keywords_goto), (lexer.has("ws") ? {type: "ws"} : ws), "STR", (lexer.has("ws") ? {type: "ws"} : ws), "params_with_parenthesis"], "postprocess":  d => ({
          page: d[2],
          params: d[4]
        }) },
    {"name": "goto", "symbols": [(lexer.has("keywords_goto") ? {type: "keywords_goto"} : keywords_goto), (lexer.has("ws") ? {type: "ws"} : ws), "STR"], "postprocess":  d => ({
          page: d[2],
          params: []
        }) },
    {"name": "alert", "symbols": [(lexer.has("keywords_alert") ? {type: "keywords_alert"} : keywords_alert), (lexer.has("ws") ? {type: "ws"} : ws), "STR"], "postprocess": d => d[2]},
    {"name": "confirm", "symbols": [(lexer.has("keywords_confirm") ? {type: "keywords_confirm"} : keywords_confirm), (lexer.has("ws") ? {type: "ws"} : ws), "STR"], "postprocess": d => d[2]},
    {"name": "variable_assignment$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_cell") ? {type: "keywords_cell"} : keywords_cell), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$1", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$2", (lexer.has("string") ? {type: "string"} : string)], "postprocess":  d => ({
          type: 'string-cell',
          variable: d[2],
          value: d[6]
        }) },
    {"name": "variable_assignment$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$4", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_cell") ? {type: "keywords_cell"} : keywords_cell), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$3", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$4", (lexer.has("number") ? {type: "number"} : number)], "postprocess":  d => ({
          type: 'numeric-cell',
          variable: d[2],
          value: d[6]
        }) },
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_cell") ? {type: "keywords_cell"} : keywords_cell), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable)], "postprocess":  d => ({
          type: 'empty-cell',
          variable: d[2],
        }) },
    {"name": "variable_assignment$ebnf$5", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$6", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_row") ? {type: "keywords_row"} : keywords_row), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$5", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$6", "query"], "postprocess":  d => ({
          type: 'query-row',
          variable: d[2],
          value: d[6]
        }) },
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_row") ? {type: "keywords_row"} : keywords_row), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable)], "postprocess":  d => ({
          type: 'empty-row',
          variable: d[2],
        }) },
    {"name": "variable_assignment$ebnf$7", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$8", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$8", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_row") ? {type: "keywords_row"} : keywords_row), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$7", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$8", (lexer.has("empty_row") ? {type: "empty_row"} : empty_row)], "postprocess":  d => ({
          type: 'empty-row',
          variable: d[2],
        }) },
    {"name": "variable_assignment$ebnf$9", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$9", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$10", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$10", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_table") ? {type: "keywords_table"} : keywords_table), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$9", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$10", "query"], "postprocess":  d => ({
          type: 'query-table',
          variable: d[2],
          value: d[6]
        }) },
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_table") ? {type: "keywords_table"} : keywords_table), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable)], "postprocess":  d => ({
          type: 'empty-table',
          variable: d[2],
        }) },
    {"name": "variable_assignment$ebnf$11", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$11", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$12", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$12", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_table") ? {type: "keywords_table"} : keywords_table), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$11", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$12", (lexer.has("empty_table") ? {type: "empty_table"} : empty_table)], "postprocess":  d => ({
          type: 'empty-table',
          variable: d[2],
        }) },
    {"name": "query", "symbols": ["query_no_params", (lexer.has("ws") ? {type: "ws"} : ws), "params_with_parenthesis"], "postprocess":  d => ({
          ...d[0],
          type: 'single-row-params',
          params: d[2]
        }) },
    {"name": "query$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "query$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "query$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "query$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "query", "symbols": ["query_no_params", "query$ebnf$1", "data_source", "query$ebnf$2", "params_with_sq_brackets"], "postprocess":  d => ({
          ...d[0],
          type: 'multi-row-params',
          source: d[2],
          params: d[4]
        }) },
    {"name": "query", "symbols": ["query_no_params"], "postprocess": id},
    {"name": "query_no_params", "symbols": [(lexer.has("keywords_query") ? {type: "keywords_query"} : keywords_query), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("single_quote") ? {type: "single_quote"} : single_quote), "STR", (lexer.has("single_quote") ? {type: "single_quote"} : single_quote)], "postprocess":  d => ({
          type: 'empty-params',
          keyword: d[0],
          query: d[3],
          params: []
        }) },
    {"name": "params_with_sq_brackets", "symbols": [(lexer.has("open_sq_bracket") ? {type: "open_sq_bracket"} : open_sq_bracket), "_wl_", "params", "_wl_", (lexer.has("close_sq_bracket") ? {type: "close_sq_bracket"} : close_sq_bracket)], "postprocess": d => d[2]},
    {"name": "params_with_sq_brackets", "symbols": [(lexer.has("empty_row") ? {type: "empty_row"} : empty_row)], "postprocess": d => []},
    {"name": "params_with_parenthesis", "symbols": [(lexer.has("open_parenthesis") ? {type: "open_parenthesis"} : open_parenthesis), "_wl_", "params", "_wl_", (lexer.has("close_parenthesis") ? {type: "close_parenthesis"} : close_parenthesis)], "postprocess": d => d[2]},
    {"name": "params_with_parenthesis", "symbols": [(lexer.has("empty_row") ? {type: "empty_row"} : empty_row)], "postprocess": d => []},
    {"name": "params", "symbols": ["params", "_wl_", (lexer.has("comma") ? {type: "comma"} : comma), "_wl_", "param"], "postprocess": d => [...d[0], d[4]]},
    {"name": "params", "symbols": ["param"]},
    {"name": "param$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param", "symbols": [(lexer.has("param") ? {type: "param"} : param), "param$ebnf$1", (lexer.has("equals") ? {type: "equals"} : equals), "param$ebnf$2", (lexer.has("param") ? {type: "param"} : param)], "postprocess":  d => ({
          type: 'param',
          variable: d[0],
          value: d[4]
        }) },
    {"name": "param$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param$ebnf$4", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param", "symbols": [(lexer.has("param") ? {type: "param"} : param), "param$ebnf$3", (lexer.has("equals") ? {type: "equals"} : equals), "param$ebnf$4", "variable_access"], "postprocess":  d => ({
          type: 'variable-access',
          variable: d[0],
          value: d[4]
        }) },
    {"name": "variable_access", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("variable") ? {type: "variable"} : variable)], "postprocess":  d => ({
          table: d[0],
          column: d[2]
        }) },
    {"name": "STR", "symbols": ["STR", (lexer.has("ws") ? {type: "ws"} : ws), "WRD"], "postprocess": d => d[0] + ' ' + d[2]},
    {"name": "STR", "symbols": ["WRD"], "postprocess": id},
    {"name": "WRD$subexpression$1", "symbols": [/[A-Za-z_]/]},
    {"name": "WRD$subexpression$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "WRD$ebnf$1", "symbols": []},
    {"name": "WRD$ebnf$1$subexpression$1", "symbols": [/[A-Za-z0-9_?-\\\/!@#$%^&*]/]},
    {"name": "WRD$ebnf$1$subexpression$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "WRD$ebnf$1", "symbols": ["WRD$ebnf$1", "WRD$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WRD", "symbols": ["WRD$subexpression$1", "WRD$ebnf$1"], "postprocess": d => d[0] + d[1].join('')},
    {"name": "OPEN_TAG$ebnf$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "OPEN_TAG$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "OPEN_TAG", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), (lexer.has("indent") ? {type: "indent"} : indent), "OPEN_TAG$ebnf$1"]},
    {"name": "CLOSE_TAG", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), (lexer.has("dedent") ? {type: "dedent"} : dedent)]},
    {"name": "_wl_$ebnf$1", "symbols": []},
    {"name": "_wl_$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_wl_$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "_wl_$ebnf$1$subexpression$1", "symbols": [(lexer.has("indent") ? {type: "indent"} : indent)]},
    {"name": "_wl_$ebnf$1$subexpression$1", "symbols": [(lexer.has("dedent") ? {type: "dedent"} : dedent)]},
    {"name": "_wl_$ebnf$1", "symbols": ["_wl_$ebnf$1", "_wl_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_wl_", "symbols": ["_wl_$ebnf$1"]}
]
  , ParserStart: "__MAIN__"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
