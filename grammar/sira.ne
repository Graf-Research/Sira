@include "./lexer.ne"

main -> main __n page {% d => [...d[0], d[2]] %}
  | page

# main page
page -> "page" __ allowed_string __n indent __n page_items __n dedent _n {% d => ({
  title: d[2],
  items: d[6]
}) %}
page_items -> page_items __n page_item {% d => [...d[0], d[2]] %}
  | page_item
page_item -> view_section {% id %}
  | data_section {% id %}
  | param_section {% id %}

# view section
view_section -> "[view]" __n indent __n view_items __n dedent _n {% d => ({
  type: 'view',
  items: d[4]
}) %}
view_items -> view_items __n view_item {% d => [...d[0], d[2]] %}
  | view_item
view_item -> button {% id %}
  | single_form {% id %}
  | multiple_form {% id %}
  | table {% id %}

# data section
data_section -> "[data]" __n indent __n data_items __n dedent _n {% d => ({
  type: 'data',
  items: d[4]
}) %}
data_items -> data_items __n data_item {% d => [...d[0], d[2]] %}
  | data_item
data_item -> row_data_empty {% id %}
  | row_data_query {% id %}
  | table_data_empty {% id %}
  | table_data_query {% id %}

# data item
row_data_empty -> "row" __ allowed_variable _ "=" _ empty_row_data {% d => ({
  type: 'variable-assignment',
  kind: 'empty-row',
  variable: d[2],
  value: '()'
}) %}
row_data_query -> "row" __ allowed_variable _ "=" _ query_call {% d => ({
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
}) %}
table_data_empty -> "table" __ allowed_variable _ "=" _ empty_table_data {% d => ({
  type: 'variable-assignment',
  kind: 'empty-table',
  variable: d[2],
  value: '[]'
}) %}
table_data_query -> "table" __ allowed_variable _ "=" _ query_call {% d => ({
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
}) %}

# empty data item
empty_row_data -> "()" {% id %}
empty_table_data -> "[]" {% id %}

# param section
param_section -> "[param]" __n indent __n param_items __n dedent _n {% d => ({
  type: 'param',
  variable: d[4]
}) %}
param_items -> param_items __n param_item {% d => [...d[0], d[2]] %}
  | param_item
param_item -> param {% id %}

# button
button -> "button" _ allowed_string __ "{" _ __n indent __n statements __n dedent __n _ "}" {% d => ({
  type: 'button',
  label: d[2],
  statements: d[9]
}) %}

# table
table -> table_header _n indent _n table_items _n dedent {% d => ({
  type: 'table',
  label: d[0].title,
  data_source_variable: d[0].data_source_variable,
  items: d[4]
}) %}
table_header -> "table" _ "(" _ allowed_variable _ ")" _ allowed_string {% d => ({
  title: d[0],
  data_source_variable: d[4]
}) %}
table_items -> table_items __n table_item {% d => [...d[0], d[2]] %}
  | table_item
table_item -> form_item_input_casual {% id %}
  | form_item_action {% id %}


# form
single_form -> single_form_header _n indent _n form_items _n dedent {% d => ({
  type: 'form',
  title: d[0],
  items: d[4]
}) %}
multiple_form -> multi_form_header _n indent _n form_items _n dedent {% d => ({
  type: 'multiform',
  title: d[0].title,
  data_source_variable: d[0].data_source_variable,
  items: d[4]
}) %}
single_form_header -> "form" __ allowed_string {% d => d[2] %}
multi_form_header -> "multiform" _ "(" _ allowed_variable _ ")" _ allowed_string {% d => ({
  title: d[8],
  data_source_variable: d[4]
}) %}
form_items -> form_items __n form_item {% d => [...d[0], d[2]] %}
  | form_item
form_item -> form_item_input_casual {% id %}
  | form_item_input_dropdown {% id %}
  | form_item_action {% id %}
form_item_input_casual -> "-" __ allowed_string _ ":" _ possible_variable __ possible_form_type_casual {% d => ({
  label: d[2],
  variable: d[6],
  type: d[8]
}) %}
form_item_input_dropdown -> "-" __ allowed_string _ ":" _ possible_variable __ "dropdown" _ "(" _ allowed_variable _ ")" {% d => ({
  type: 'dropdown',
  label: d[2],
  variable: d[6],
  dropdown_data_variable: d[12]
}) %}
form_item_action -> "-" __ allowed_string _ "{" _ __n indent __n statements __n dedent __n _ "}"  {% d => ({
  type: 'button',
  label: d[2],
  statements: d[9]
}) %}

# form type
possible_form_type_casual -> form_type_numeric {% id %}
  | form_type_text {% id %}
  | form_type_bigtext {% id %}

form_type_numeric -> "numeric" {% id %}
form_type_text -> "text" {% id %}
form_type_bigtext -> "bigtext" {% id %}

# action statements
statements -> statements __n statement {% d => [...d[0], d[2]] %}
  | statement

statement -> variable_assignment {% id %}
  | query_call {% id %}
  | alert {% id %}
  | confirm {% id %}
  | goto {% id %}

# legal statement
variable_assignment -> data_item {% id %}
alert -> "alert" __ allowed_string {% d => ({
  type: 'alert',
  text: d[2]
}) %}
confirm -> "confirm" __ allowed_string {% d => ({
  type: 'confirm',
  text: d[2]
}) %}
goto -> "goto" __ allowed_string _ query_param {% d => ({
  type: 'goto',
  page: d[2],
  params: d[4].values
}) %}
  | "goto" __ allowed_string {% d => ({
    type: 'goto',
    page: d[2],
    params: []
  }) %}
query_call -> "query" __ "'" allowed_string "'" _ query_param {% d => ({
  type: 'call-query',
  query: {
    multirow: d[6].multirow,
    data_source_variable: d[6].data_source_variable,
    value: d[3]
  },
  params: d[6].values
}) %}
  | "query" __ "'" allowed_string "'" {% d => ({
    type: 'call-query',
    query: {
      multirow: false,
      value: d[3]
    },
    params: []
  }) %}

# query
query_param -> "(" _id query_param_assign_values _id ")" {% d => ({
  multirow: false,
  values: d[2]
}) %}
  | "(" _ ")" {% d => ({
    multirow: false,
    values: []
  }) %}
  | "(" _ allowed_variable _ ")" _ "[" _id query_param_assign_values _id "]" {% d => ({
    data_source_variable: d[2],
    multirow: true,
    values: d[8]
  }) %}

query_param_assign_values -> query_param_assign_values _id "," _id query_param_assign_value {% d => [...d[0], d[4]] %} 
  | query_param_assign_value

query_param_assign_value -> query_param_variable {% id %}
  | query_param_param {% id %}

query_param_variable -> param _ "=" _ possible_variable {% d => ({
  param: d[0],
  assign_value: {
    type: 'variable',
    value: d[4]
  }
}) %}
query_param_param -> param _ "=" _ param {% d => ({
  param: d[0],
  assign_value: {
    type: 'param',
    value: d[4]
  }
}) %}

# variable and basics
possible_variable -> possible_variable "." allowed_variable  {% d => [...d[0], d[2]] %}
  | allowed_variable

allowed_variable -> [A-Za-z_] [A-Za-z0-9_]:* {% d => d[0] + d[1].join('') %}
allowed_string -> allowed_string __ allowed_word {% d => d[0] + ' ' + d[2] %}
  | allowed_word {% id %}
allowed_word -> [A-Za-z_] [A-Za-z0-9_?-\\\/!@#$%^&*]:* {% d => d[0] + d[1].join('') %}
param -> "$" [A-Za-z0-9_]:* {% d => d[1].join('') %}

_id -> ([\s\n] | indent | dedent):*
__id -> ([\s\n] | indent | dedent):+

indent -> "\u27F6"
dedent -> "\u27F5"

_n -> [\n]:*
__n -> [\n]:+
_ -> [ ]:*
__ -> [ ]:+
