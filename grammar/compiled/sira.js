// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["main", "__n", "page"], "postprocess": d => [...d[0], d[2]]},
    {"name": "main", "symbols": ["page"]},
    {"name": "page$string$1", "symbols": [{"literal":"p"}, {"literal":"a"}, {"literal":"g"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "page", "symbols": ["page$string$1", "__", "allowed_string", "__n", "indent", "__n", "page_items", "__n", "dedent", "_n"], "postprocess":  d => ({
          title: d[2],
          items: d[6]
        }) },
    {"name": "page_items", "symbols": ["page_items", "__n", "page_item"], "postprocess": d => [...d[0], d[2]]},
    {"name": "page_items", "symbols": ["page_item"]},
    {"name": "page_item", "symbols": ["view_section"], "postprocess": id},
    {"name": "page_item", "symbols": ["data_section"], "postprocess": id},
    {"name": "page_item", "symbols": ["param_section"], "postprocess": id},
    {"name": "view_section$string$1", "symbols": [{"literal":"["}, {"literal":"v"}, {"literal":"i"}, {"literal":"e"}, {"literal":"w"}, {"literal":"]"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "view_section", "symbols": ["view_section$string$1", "__n", "indent", "__n", "view_items", "__n", "dedent", "_n"], "postprocess":  d => ({
          type: 'view',
          items: d[4]
        }) },
    {"name": "view_items", "symbols": ["view_items", "__n", "view_item"], "postprocess": d => [...d[0], d[2]]},
    {"name": "view_items", "symbols": ["view_item"]},
    {"name": "view_item", "symbols": ["button"], "postprocess": id},
    {"name": "view_item", "symbols": ["single_form"], "postprocess": id},
    {"name": "view_item", "symbols": ["multiple_form"], "postprocess": id},
    {"name": "view_item", "symbols": ["table"], "postprocess": id},
    {"name": "data_section$string$1", "symbols": [{"literal":"["}, {"literal":"d"}, {"literal":"a"}, {"literal":"t"}, {"literal":"a"}, {"literal":"]"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "data_section", "symbols": ["data_section$string$1", "__n", "indent", "__n", "data_items", "__n", "dedent", "_n"], "postprocess":  d => ({
          type: 'data',
          items: d[4]
        }) },
    {"name": "data_items", "symbols": ["data_items", "__n", "data_item"], "postprocess": d => [...d[0], d[2]]},
    {"name": "data_items", "symbols": ["data_item"]},
    {"name": "data_item", "symbols": ["row_data_empty"], "postprocess": id},
    {"name": "data_item", "symbols": ["row_data_query"], "postprocess": id},
    {"name": "data_item", "symbols": ["table_data_empty"], "postprocess": id},
    {"name": "data_item", "symbols": ["table_data_query"], "postprocess": id},
    {"name": "row_data_empty$string$1", "symbols": [{"literal":"r"}, {"literal":"o"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "row_data_empty", "symbols": ["row_data_empty$string$1", "__", "allowed_variable", "_", {"literal":"="}, "_", "empty_row_data"], "postprocess":  d => ({
          type: 'variable-assignment',
          kind: 'empty-row',
          variable: d[2],
          value: '()'
        }) },
    {"name": "row_data_query$string$1", "symbols": [{"literal":"r"}, {"literal":"o"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "row_data_query", "symbols": ["row_data_query$string$1", "__", "allowed_variable", "_", {"literal":"="}, "_", "query_call"], "postprocess":  d => ({
          type: 'variable-assignment',
          kind: 'call-query-result-row',
          variable: d[2],
          value: {
            ...d[6],
            query: {
              ...d[6].query,
              type: 'row'
            }
          }
        }) },
    {"name": "table_data_empty$string$1", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "table_data_empty", "symbols": ["table_data_empty$string$1", "__", "allowed_variable", "_", {"literal":"="}, "_", "empty_table_data"], "postprocess":  d => ({
          type: 'variable-assignment',
          kind: 'empty-table',
          variable: d[2],
          value: '[]'
        }) },
    {"name": "table_data_query$string$1", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "table_data_query", "symbols": ["table_data_query$string$1", "__", "allowed_variable", "_", {"literal":"="}, "_", "query_call"], "postprocess":  d => ({
          type: 'variable-assignment',
          kind: 'call-query-result-table',
          variable: d[2],
          value: {
            ...d[6],
            query: {
              ...d[6].query,
              type: 'table'
            }
          }
        }) },
    {"name": "empty_row_data$string$1", "symbols": [{"literal":"("}, {"literal":")"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "empty_row_data", "symbols": ["empty_row_data$string$1"], "postprocess": id},
    {"name": "empty_table_data$string$1", "symbols": [{"literal":"["}, {"literal":"]"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "empty_table_data", "symbols": ["empty_table_data$string$1"], "postprocess": id},
    {"name": "param_section$string$1", "symbols": [{"literal":"["}, {"literal":"p"}, {"literal":"a"}, {"literal":"r"}, {"literal":"a"}, {"literal":"m"}, {"literal":"]"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "param_section", "symbols": ["param_section$string$1", "__n", "indent", "__n", "param_items", "__n", "dedent", "_n"], "postprocess":  d => ({
          type: 'param',
          variable: d[4]
        }) },
    {"name": "param_items", "symbols": ["param_items", "__n", "param_item"], "postprocess": d => [...d[0], d[2]]},
    {"name": "param_items", "symbols": ["param_item"]},
    {"name": "param_item", "symbols": ["param"], "postprocess": id},
    {"name": "button$string$1", "symbols": [{"literal":"b"}, {"literal":"u"}, {"literal":"t"}, {"literal":"t"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "button", "symbols": ["button$string$1", "_", "allowed_string", "__", {"literal":"{"}, "_", "__n", "indent", "__n", "statements", "__n", "dedent", "__n", "_", {"literal":"}"}], "postprocess":  d => ({
          type: 'button',
          label: d[2],
          statements: d[9]
        }) },
    {"name": "table", "symbols": ["table_header", "_n", "indent", "_n", "table_items", "_n", "dedent"], "postprocess":  d => ({
          type: 'table',
          label: d[0].title,
          data_source_variable: d[0].data_source_variable,
          items: d[4]
        }) },
    {"name": "table_header$string$1", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "table_header", "symbols": ["table_header$string$1", "_", {"literal":"("}, "_", "allowed_variable", "_", {"literal":")"}, "_", "allowed_string"], "postprocess":  d => ({
          title: d[0],
          data_source_variable: d[4]
        }) },
    {"name": "table_items", "symbols": ["table_items", "__n", "table_item"], "postprocess": d => [...d[0], d[2]]},
    {"name": "table_items", "symbols": ["table_item"]},
    {"name": "table_item", "symbols": ["form_item_input_casual"], "postprocess": id},
    {"name": "table_item", "symbols": ["form_item_action"], "postprocess": id},
    {"name": "single_form", "symbols": ["single_form_header", "_n", "indent", "_n", "form_items", "_n", "dedent"], "postprocess":  d => ({
          type: 'form',
          title: d[0],
          items: d[4]
        }) },
    {"name": "multiple_form", "symbols": ["multi_form_header", "_n", "indent", "_n", "form_items", "_n", "dedent"], "postprocess":  d => ({
          type: 'multiform',
          title: d[0].title,
          data_source_variable: d[0].data_source_variable,
          items: d[4]
        }) },
    {"name": "single_form_header$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "single_form_header", "symbols": ["single_form_header$string$1", "__", "allowed_string"], "postprocess": d => d[2]},
    {"name": "multi_form_header$string$1", "symbols": [{"literal":"m"}, {"literal":"u"}, {"literal":"l"}, {"literal":"t"}, {"literal":"i"}, {"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "multi_form_header", "symbols": ["multi_form_header$string$1", "_", {"literal":"("}, "_", "allowed_variable", "_", {"literal":")"}, "_", "allowed_string"], "postprocess":  d => ({
          title: d[8],
          data_source_variable: d[4]
        }) },
    {"name": "form_items", "symbols": ["form_items", "__n", "form_item"], "postprocess": d => [...d[0], d[2]]},
    {"name": "form_items", "symbols": ["form_item"]},
    {"name": "form_item", "symbols": ["form_item_input_casual"], "postprocess": id},
    {"name": "form_item", "symbols": ["form_item_input_dropdown"], "postprocess": id},
    {"name": "form_item", "symbols": ["form_item_action"], "postprocess": id},
    {"name": "form_item_input_casual", "symbols": [{"literal":"-"}, "__", "allowed_string", "_", {"literal":":"}, "_", "possible_variable", "__", "possible_form_type_casual"], "postprocess":  d => ({
          label: d[2],
          variable: d[6],
          type: d[8]
        }) },
    {"name": "form_item_input_dropdown$string$1", "symbols": [{"literal":"d"}, {"literal":"r"}, {"literal":"o"}, {"literal":"p"}, {"literal":"d"}, {"literal":"o"}, {"literal":"w"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form_item_input_dropdown", "symbols": [{"literal":"-"}, "__", "allowed_string", "_", {"literal":":"}, "_", "possible_variable", "__", "form_item_input_dropdown$string$1", "_", {"literal":"("}, "_", "allowed_variable", "_", {"literal":")"}], "postprocess":  d => ({
          type: 'dropdown',
          label: d[2],
          variable: d[6],
          dropdown_data_variable: d[12]
        }) },
    {"name": "form_item_action", "symbols": [{"literal":"-"}, "__", "allowed_string", "_", {"literal":"{"}, "_", "__n", "indent", "__n", "statements", "__n", "dedent", "__n", "_", {"literal":"}"}], "postprocess":  d => ({
          type: 'button',
          label: d[2],
          statements: d[9]
        }) },
    {"name": "possible_form_type_casual", "symbols": ["form_type_numeric"], "postprocess": id},
    {"name": "possible_form_type_casual", "symbols": ["form_type_text"], "postprocess": id},
    {"name": "possible_form_type_casual", "symbols": ["form_type_bigtext"], "postprocess": id},
    {"name": "form_type_numeric$string$1", "symbols": [{"literal":"n"}, {"literal":"u"}, {"literal":"m"}, {"literal":"e"}, {"literal":"r"}, {"literal":"i"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form_type_numeric", "symbols": ["form_type_numeric$string$1"], "postprocess": id},
    {"name": "form_type_text$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"x"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form_type_text", "symbols": ["form_type_text$string$1"], "postprocess": id},
    {"name": "form_type_bigtext$string$1", "symbols": [{"literal":"b"}, {"literal":"i"}, {"literal":"g"}, {"literal":"t"}, {"literal":"e"}, {"literal":"x"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form_type_bigtext", "symbols": ["form_type_bigtext$string$1"], "postprocess": id},
    {"name": "statements", "symbols": ["statements", "__n", "statement"], "postprocess": d => [...d[0], d[2]]},
    {"name": "statements", "symbols": ["statement"]},
    {"name": "statement", "symbols": ["variable_assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["query_call"], "postprocess": id},
    {"name": "statement", "symbols": ["alert"], "postprocess": id},
    {"name": "statement", "symbols": ["confirm"], "postprocess": id},
    {"name": "statement", "symbols": ["goto"], "postprocess": id},
    {"name": "variable_assignment", "symbols": ["data_item"], "postprocess": id},
    {"name": "alert$string$1", "symbols": [{"literal":"a"}, {"literal":"l"}, {"literal":"e"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "alert", "symbols": ["alert$string$1", "__", "allowed_string"], "postprocess":  d => ({
          type: 'alert',
          text: d[2]
        }) },
    {"name": "confirm$string$1", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"n"}, {"literal":"f"}, {"literal":"i"}, {"literal":"r"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "confirm", "symbols": ["confirm$string$1", "__", "allowed_string"], "postprocess":  d => ({
          type: 'confirm',
          text: d[2]
        }) },
    {"name": "goto$string$1", "symbols": [{"literal":"g"}, {"literal":"o"}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "goto", "symbols": ["goto$string$1", "__", "allowed_string", "_", "query_param"], "postprocess":  d => ({
          type: 'goto',
          page: d[2],
          params: d[4].values
        }) },
    {"name": "goto$string$2", "symbols": [{"literal":"g"}, {"literal":"o"}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "goto", "symbols": ["goto$string$2", "__", "allowed_string"], "postprocess":  d => ({
          type: 'goto',
          page: d[2],
          params: []
        }) },
    {"name": "query_call$string$1", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}, {"literal":"r"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "query_call", "symbols": ["query_call$string$1", "__", {"literal":"'"}, "allowed_string", {"literal":"'"}, "_", "query_param"], "postprocess":  d => ({
          type: 'call-query',
          query: {
            multirow: d[6].multirow,
            data_source_variable: d[6].data_source_variable,
            value: d[3]
          },
          params: d[6].values
        }) },
    {"name": "query_call$string$2", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}, {"literal":"r"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "query_call", "symbols": ["query_call$string$2", "__", {"literal":"'"}, "allowed_string", {"literal":"'"}], "postprocess":  d => ({
          type: 'call-query',
          query: {
            multirow: false,
            value: d[3]
          },
          params: []
        }) },
    {"name": "query_param", "symbols": [{"literal":"("}, "_id", "query_param_assign_values", "_id", {"literal":")"}], "postprocess":  d => ({
          multirow: false,
          values: d[2]
        }) },
    {"name": "query_param", "symbols": [{"literal":"("}, "_", {"literal":")"}], "postprocess":  d => ({
          multirow: false,
          values: []
        }) },
    {"name": "query_param", "symbols": [{"literal":"("}, "_", "allowed_variable", "_", {"literal":")"}, "_", {"literal":"["}, "_id", "query_param_assign_values", "_id", {"literal":"]"}], "postprocess":  d => ({
          data_source_variable: d[2],
          multirow: true,
          values: d[8]
        }) },
    {"name": "query_param_assign_values", "symbols": ["query_param_assign_values", "_id", {"literal":","}, "_id", "query_param_assign_value"], "postprocess": d => [...d[0], d[4]]},
    {"name": "query_param_assign_values", "symbols": ["query_param_assign_value"]},
    {"name": "query_param_assign_value", "symbols": ["query_param_variable"], "postprocess": id},
    {"name": "query_param_assign_value", "symbols": ["query_param_param"], "postprocess": id},
    {"name": "query_param_variable", "symbols": ["param", "_", {"literal":"="}, "_", "possible_variable"], "postprocess":  d => ({
          param: d[0],
          assign_value: {
            type: 'variable',
            value: d[4]
          }
        }) },
    {"name": "query_param_param", "symbols": ["param", "_", {"literal":"="}, "_", "param"], "postprocess":  d => ({
          param: d[0],
          assign_value: {
            type: 'param',
            value: d[4]
          }
        }) },
    {"name": "possible_variable", "symbols": ["possible_variable", {"literal":"."}, "allowed_variable"], "postprocess": d => [...d[0], d[2]]},
    {"name": "possible_variable", "symbols": ["allowed_variable"]},
    {"name": "allowed_variable$ebnf$1", "symbols": []},
    {"name": "allowed_variable$ebnf$1", "symbols": ["allowed_variable$ebnf$1", /[A-Za-z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "allowed_variable", "symbols": [/[A-Za-z_]/, "allowed_variable$ebnf$1"], "postprocess": d => d[0] + d[1].join('')},
    {"name": "allowed_string", "symbols": ["allowed_string", "__", "allowed_word"], "postprocess": d => d[0] + ' ' + d[2]},
    {"name": "allowed_string", "symbols": ["allowed_word"], "postprocess": id},
    {"name": "allowed_word$ebnf$1", "symbols": []},
    {"name": "allowed_word$ebnf$1", "symbols": ["allowed_word$ebnf$1", /[A-Za-z0-9_?-\\\/!@#$%^&*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "allowed_word", "symbols": [/[A-Za-z_]/, "allowed_word$ebnf$1"], "postprocess": d => d[0] + d[1].join('')},
    {"name": "param$ebnf$1", "symbols": []},
    {"name": "param$ebnf$1", "symbols": ["param$ebnf$1", /[A-Za-z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "param", "symbols": [{"literal":"$"}, "param$ebnf$1"], "postprocess": d => d[1].join('')},
    {"name": "_id$ebnf$1", "symbols": []},
    {"name": "_id$ebnf$1$subexpression$1", "symbols": [/[\s\n]/]},
    {"name": "_id$ebnf$1$subexpression$1", "symbols": ["indent"]},
    {"name": "_id$ebnf$1$subexpression$1", "symbols": ["dedent"]},
    {"name": "_id$ebnf$1", "symbols": ["_id$ebnf$1", "_id$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_id", "symbols": ["_id$ebnf$1"]},
    {"name": "__id$ebnf$1$subexpression$1", "symbols": [/[\s\n]/]},
    {"name": "__id$ebnf$1$subexpression$1", "symbols": ["indent"]},
    {"name": "__id$ebnf$1$subexpression$1", "symbols": ["dedent"]},
    {"name": "__id$ebnf$1", "symbols": ["__id$ebnf$1$subexpression$1"]},
    {"name": "__id$ebnf$1$subexpression$2", "symbols": [/[\s\n]/]},
    {"name": "__id$ebnf$1$subexpression$2", "symbols": ["indent"]},
    {"name": "__id$ebnf$1$subexpression$2", "symbols": ["dedent"]},
    {"name": "__id$ebnf$1", "symbols": ["__id$ebnf$1", "__id$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__id", "symbols": ["__id$ebnf$1"]},
    {"name": "indent", "symbols": [{"literal":"⟶"}]},
    {"name": "dedent", "symbols": [{"literal":"⟵"}]},
    {"name": "_n$ebnf$1", "symbols": []},
    {"name": "_n$ebnf$1", "symbols": ["_n$ebnf$1", /[\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_n", "symbols": ["_n$ebnf$1"]},
    {"name": "__n$ebnf$1", "symbols": [/[\n]/]},
    {"name": "__n$ebnf$1", "symbols": ["__n$ebnf$1", /[\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__n", "symbols": ["__n$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [/[ ]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
