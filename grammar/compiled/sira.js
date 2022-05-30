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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "__MAIN__", "symbols": ["page"]},
    {"name": "page", "symbols": [(lexer.has("keywords_page") ? {type: "keywords_page"} : keywords_page), (lexer.has("ws") ? {type: "ws"} : ws), "STR", "OPEN_TAG", "sections", "CLOSE_TAG"]},
    {"name": "sections", "symbols": ["sections", (lexer.has("nl") ? {type: "nl"} : nl), "section"]},
    {"name": "sections", "symbols": ["section"]},
    {"name": "section", "symbols": ["section_param"]},
    {"name": "section", "symbols": ["section_data"]},
    {"name": "section", "symbols": ["section_view"]},
    {"name": "section_param", "symbols": [(lexer.has("keywords_section_param") ? {type: "keywords_section_param"} : keywords_section_param), "OPEN_TAG", "params", "CLOSE_TAG"]},
    {"name": "params", "symbols": ["params", (lexer.has("nl") ? {type: "nl"} : nl), (lexer.has("param") ? {type: "param"} : param)]},
    {"name": "params", "symbols": [(lexer.has("param") ? {type: "param"} : param)]},
    {"name": "section_data", "symbols": [(lexer.has("keywords_section_data") ? {type: "keywords_section_data"} : keywords_section_data), "OPEN_TAG", "datas", "CLOSE_TAG"]},
    {"name": "datas", "symbols": ["datas", (lexer.has("nl") ? {type: "nl"} : nl), "data"]},
    {"name": "datas", "symbols": ["data"]},
    {"name": "data", "symbols": ["variable_assignment"]},
    {"name": "section_view", "symbols": [(lexer.has("keywords_section_view") ? {type: "keywords_section_view"} : keywords_section_view), "OPEN_TAG", "views", "CLOSE_TAG"]},
    {"name": "views", "symbols": ["views", (lexer.has("nl") ? {type: "nl"} : nl), "view"]},
    {"name": "views", "symbols": ["view"]},
    {"name": "view", "symbols": ["view_component"]},
    {"name": "view_component", "symbols": ["vc_table"]},
    {"name": "vc_table", "symbols": [(lexer.has("keywords_table") ? {type: "keywords_table"} : keywords_table), (lexer.has("ws") ? {type: "ws"} : ws), "STR", (lexer.has("ws") ? {type: "ws"} : ws), "vc_table_source", "OPEN_TAG", "vc_table_items", "CLOSE_TAG"]},
    {"name": "vc_table_source$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_source$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_source$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_source$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_source$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_source$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_source$ebnf$4", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_source$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_source", "symbols": [(lexer.has("open_parenthesis") ? {type: "open_parenthesis"} : open_parenthesis), "vc_table_source$ebnf$1", (lexer.has("keywords_source") ? {type: "keywords_source"} : keywords_source), "vc_table_source$ebnf$2", (lexer.has("equals") ? {type: "equals"} : equals), "vc_table_source$ebnf$3", (lexer.has("variable") ? {type: "variable"} : variable), "vc_table_source$ebnf$4", (lexer.has("close_parenthesis") ? {type: "close_parenthesis"} : close_parenthesis)]},
    {"name": "vc_table_items", "symbols": ["vc_table_items", (lexer.has("nl") ? {type: "nl"} : nl), "vc_table_item"]},
    {"name": "vc_table_items", "symbols": ["vc_table_item"]},
    {"name": "vc_table_item", "symbols": ["vc_table_item_cell"]},
    {"name": "vc_table_item", "symbols": ["vc_table_item_button"]},
    {"name": "vc_table_item_cell$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_cell$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_cell$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_cell$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_cell$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_cell$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_cell", "symbols": [(lexer.has("item_begin") ? {type: "item_begin"} : item_begin), "vc_table_item_cell$ebnf$1", "STR", "vc_table_item_cell$ebnf$2", (lexer.has("colon") ? {type: "colon"} : colon), "vc_table_item_cell$ebnf$3", "variable_access", (lexer.has("ws") ? {type: "ws"} : ws), "table_type"]},
    {"name": "vc_table_item_button$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_button$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_button$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "vc_table_item_button$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "vc_table_item_button", "symbols": [(lexer.has("item_begin") ? {type: "item_begin"} : item_begin), "vc_table_item_button$ebnf$1", "STR", "vc_table_item_button$ebnf$2", (lexer.has("open_bracket") ? {type: "open_bracket"} : open_bracket), "OPEN_TAG", "statements", "CLOSE_TAG", (lexer.has("nl") ? {type: "nl"} : nl), (lexer.has("close_bracket") ? {type: "close_bracket"} : close_bracket)]},
    {"name": "table_type", "symbols": [{"literal":"text"}]},
    {"name": "statements", "symbols": ["statements", (lexer.has("nl") ? {type: "nl"} : nl), "statement"]},
    {"name": "statements", "symbols": ["statement"]},
    {"name": "statement", "symbols": ["query"]},
    {"name": "statement", "symbols": ["variable_assignment"]},
    {"name": "statement", "symbols": ["goto"]},
    {"name": "statement", "symbols": ["alert"]},
    {"name": "statement", "symbols": ["confirm"]},
    {"name": "goto", "symbols": [(lexer.has("keywords_goto") ? {type: "keywords_goto"} : keywords_goto), (lexer.has("ws") ? {type: "ws"} : ws), "STR", (lexer.has("ws") ? {type: "ws"} : ws), "params_with_parenthesis"]},
    {"name": "alert", "symbols": [(lexer.has("keywords_alert") ? {type: "keywords_alert"} : keywords_alert), (lexer.has("ws") ? {type: "ws"} : ws), "STR"]},
    {"name": "confirm", "symbols": [(lexer.has("keywords_confirm") ? {type: "keywords_confirm"} : keywords_confirm), (lexer.has("ws") ? {type: "ws"} : ws), "STR"]},
    {"name": "variable_assignment$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_row") ? {type: "keywords_row"} : keywords_row), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$1", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$2", "query"]},
    {"name": "variable_assignment$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$4", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_row") ? {type: "keywords_row"} : keywords_row), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$3", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$4", (lexer.has("empty_row") ? {type: "empty_row"} : empty_row)]},
    {"name": "variable_assignment$ebnf$5", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$6", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_table") ? {type: "keywords_table"} : keywords_table), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$5", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$6", "query"]},
    {"name": "variable_assignment$ebnf$7", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment$ebnf$8", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "variable_assignment$ebnf$8", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "variable_assignment", "symbols": [(lexer.has("keywords_table") ? {type: "keywords_table"} : keywords_table), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("variable") ? {type: "variable"} : variable), "variable_assignment$ebnf$7", (lexer.has("equals") ? {type: "equals"} : equals), "variable_assignment$ebnf$8", (lexer.has("empty_table") ? {type: "empty_table"} : empty_table)]},
    {"name": "query", "symbols": ["query_no_params", (lexer.has("ws") ? {type: "ws"} : ws), "params_with_parenthesis"]},
    {"name": "query", "symbols": ["query_no_params"]},
    {"name": "query_no_params", "symbols": [(lexer.has("keywords_query") ? {type: "keywords_query"} : keywords_query), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("single_quote") ? {type: "single_quote"} : single_quote), "STR", (lexer.has("single_quote") ? {type: "single_quote"} : single_quote)]},
    {"name": "params_with_parenthesis$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "params_with_parenthesis$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "params_with_parenthesis$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "params_with_parenthesis$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "params_with_parenthesis", "symbols": [(lexer.has("open_parenthesis") ? {type: "open_parenthesis"} : open_parenthesis), "params_with_parenthesis$ebnf$1", "params", "params_with_parenthesis$ebnf$2", (lexer.has("close_parenthesis") ? {type: "close_parenthesis"} : close_parenthesis)]},
    {"name": "params$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "params$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "params$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "params$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "params", "symbols": ["params", "params$ebnf$1", (lexer.has("comma") ? {type: "comma"} : comma), "params$ebnf$2", "param"]},
    {"name": "params", "symbols": ["param"]},
    {"name": "param$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param$ebnf$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param", "symbols": [(lexer.has("param") ? {type: "param"} : param), "param$ebnf$1", (lexer.has("equals") ? {type: "equals"} : equals), "param$ebnf$2", (lexer.has("param") ? {type: "param"} : param)]},
    {"name": "param$ebnf$3", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param$ebnf$4", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "param$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "param", "symbols": [(lexer.has("param") ? {type: "param"} : param), "param$ebnf$3", (lexer.has("equals") ? {type: "equals"} : equals), "param$ebnf$4", "variable_access"]},
    {"name": "variable_access", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("variable") ? {type: "variable"} : variable)]},
    {"name": "STR", "symbols": ["STR", (lexer.has("ws") ? {type: "ws"} : ws), "WRD"], "postprocess": d => d[0] + ' ' + d[2]},
    {"name": "STR", "symbols": ["WRD"], "postprocess": id},
    {"name": "WRD$ebnf$1", "symbols": []},
    {"name": "WRD$ebnf$1", "symbols": ["WRD$ebnf$1", /[A-Za-z0-9_?-\\\/!@#$%^&*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WRD", "symbols": [/[A-Za-z_]/, "WRD$ebnf$1"], "postprocess": d => d[0] + d[1].join('')},
    {"name": "OPEN_TAG", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), (lexer.has("indent") ? {type: "indent"} : indent), (lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "CLOSE_TAG", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), (lexer.has("dedent") ? {type: "dedent"} : dedent)]}
]
  , ParserStart: "__MAIN__"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
