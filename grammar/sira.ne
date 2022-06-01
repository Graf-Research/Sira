@include "./lexer.ne"

__MAIN__ -> page {% id %}

# Page
page -> %keywords_page %ws STR OPEN_TAG sections CLOSE_TAG {% d => ({
    title: d[2],
    sections: d[4]
  }) %}

# Sections
sections -> sections section {% d => [...d[0], d[1]] %}
  | section

# Section
section -> section_param {% d => ({
    type: 'param',
    data: d[0]
  }) %}
  | section_data {% d => ({
    type: 'data',
    data: d[0]
  }) %}
  | section_view {% d => ({
    type: 'view',
    data: d[0]
  }) %}

# Section > Param
section_param -> %keywords_section_param OPEN_TAG params CLOSE_TAG {% d => d[2] %}
params -> params %nl %param {% d => [...d[0], d[2]] %}
  | %param

# Section > Data
section_data -> %keywords_section_data OPEN_TAG datas CLOSE_TAG {% d => d[2] %}
datas -> datas %nl data {% d => [...d[0], d[2]] %}
  | data
data -> variable_assignment {% id %}

# Section > View
section_view -> %keywords_section_view OPEN_TAG views CLOSE_TAG {% d => d[2] %}
views -> views %nl:? view {% d => [...d[0], d[2]] %}
  | view
view -> view_component {% id %}

# View Component
view_component -> vc_table {% d => ({
    type: 'table',
    data: d[0]
  }) %}
  | vc_multiform {% d => ({
    type: 'multiform',
    data: d[0]
  }) %}
  | vc_form {% d => ({
    type: 'form',
    data: d[0]
  }) %}
  | vc_button {% d => ({
    type: 'button',
    data: d[0]
  }) %}

# View Component > Button
vc_button -> %keywords_button %ws STR %ws:? %open_bracket OPEN_TAG statements CLOSE_TAG %close_bracket {% d => ({
    label: d[2],
    statements: d[6]
  }) %}

# View Component > Multiform
vc_multiform -> %keywords_multiform %ws STR %ws:? data_source OPEN_TAG vc_form_items CLOSE_TAG {% d => ({
    name: d[2],
    source_target: d[4],
    items: d[6]
  }) %}

# View Component > Form
vc_form -> %keywords_form %ws STR OPEN_TAG vc_form_items CLOSE_TAG {% d => ({
    name: d[2],
    items: d[4]
  }) %}
vc_form_items -> vc_form_items %nl vc_form_item {% d=> [...d[0], d[2]] %}
  | vc_form_item
vc_form_item -> %item_begin %ws:? STR %ws:? %colon %ws:? variable_access %ws form_type {% d => ({
    label: d[2],
    source_target: {
      variable: d[6],
      ...d[8]
    }
  }) %}
form_type -> %keywords_type_text {% d => ({
    type: 'text'
  }) %}
  | %keywords_type_bigtext {% d => ({
    type: 'bigtext'
  }) %}
  | %keywords_type_numeric {% d => ({
    type: 'numeric'
  }) %}
  | %keywords_type_datetime {% d => ({
    type: 'datetime'
  }) %}
  | %keywords_type_date {% d => ({
    type: 'date'
  }) %}
  | %keywords_type_time {% d => ({
    type: 'time'
  }) %}
  | form_type_dropdown {% d => ({
    type: 'dropdown',
    source: d[0]
  }) %}
  | form_type_radio {% d => ({
    type: 'radio',
    source: d[0]
  }) %}
form_type_dropdown -> %keywords_dropdown %ws:? data_source {% d => d[2] %}
form_type_radio -> %keywords_radio %ws:? data_source {% d => d[2] %}

# View Component > Table
vc_table -> %keywords_table %ws STR %ws data_source OPEN_TAG vc_table_items CLOSE_TAG {% d => ({
    name: d[2],
    source: d[4],
    items: d[6]
  }) %}

vc_table_items -> vc_table_items %nl vc_table_item {% d => [...d[0], d[2]] %}
  | vc_table_item
vc_table_item -> vc_table_item_cell {% d => ({
    type: 'cell',
    data: d[0]
  }) %}
  | vc_table_item_button {% d => ({
    type: 'button',
    data: d[0]
  }) %}
vc_table_item_cell -> %item_begin %ws:? STR %ws:? %colon %ws:? variable_access %ws table_type {% d => ({
    label: d[2],
    source: {
      variable: d[6],
      type: d[8]
    },
  }) %}
vc_table_item_button -> %item_begin %ws:? STR %ws:? %open_bracket OPEN_TAG statements CLOSE_TAG %close_bracket {% d => ({
    label: d[2],
    statements: d[6]
  }) %}
table_type -> %keywords_type_text {% id %}
  | %keywords_type_bigtext {% id %}
  | %keywords_type_numeric {% id %}
  | %keywords_type_datetime {% id %}
  | %keywords_type_date {% id %}
  | %keywords_type_time {% id %}


# Data Source
data_source -> %open_parenthesis %ws:? %keywords_source %ws:? %equals %ws:? %variable %ws:? %close_parenthesis {% d => d[6] %}

# Statements
statements -> statements %nl statement {% d => [...d[0], d[2]] %}
  | statement
statement -> query {% d => ({
    type: 'query',
    data: d[0]
  }) %}
  | variable_assignment {% d => ({
    type: 'variable-assignment',
    data: d[0]
  }) %}
  | goto {% d => ({
    type: 'goto',
    data: d[0]
  }) %}
  | alert {% d => ({
    type: 'alert',
    data: d[0]
  }) %}
  | confirm {% d => ({
    type: 'confirm',
    data: d[0]
  }) %}

# Goto Page
goto -> %keywords_goto %ws STR %ws params_with_parenthesis {% d => ({
    page: d[2],
    params: d[4]
  }) %}
  | %keywords_goto %ws STR {% d => ({
    page: d[2],
    params: []
  }) %}

# Alert
alert -> %keywords_alert %ws STR {% d => d[2] %}

# Confirm
confirm -> %keywords_confirm %ws STR {% d => d[2] %}

# Variable Assignment
variable_assignment -> %keywords_cell %ws %variable %ws:? %equals %ws:? %string {% d => ({
    type: 'string-cell',
    variable: d[2],
    value: d[6]
  }) %}
  | %keywords_cell %ws %variable %ws:? %equals %ws:? %number {% d => ({
    type: 'numeric-cell',
    variable: d[2],
    value: d[6]
  }) %}
  | %keywords_cell %ws %variable {% d => ({
    type: 'empty-cell',
    variable: d[2],
  }) %}
  | %keywords_row %ws %variable %ws:? %equals %ws:? query {% d => ({
    type: 'query-row',
    variable: d[2],
    value: d[6]
  }) %}
  | %keywords_row %ws %variable {% d => ({
    type: 'empty-row',
    variable: d[2],
  }) %}
  | %keywords_row %ws %variable %ws:? %equals %ws:? %empty_row {% d => ({
    type: 'empty-row',
    variable: d[2],
  }) %}
  | %keywords_table %ws %variable %ws:? %equals %ws:? query {% d => ({
    type: 'query-table',
    variable: d[2],
    value: d[6]
  }) %}
  | %keywords_table %ws %variable {% d => ({
    type: 'empty-table',
    variable: d[2],
  }) %}
  | %keywords_table %ws %variable %ws:? %equals %ws:? %empty_table {% d => ({
    type: 'empty-table',
    variable: d[2],
  }) %}

# Query
query -> query_no_params %ws params_with_parenthesis {% d => ({
    ...d[0],
    type: 'single-row-params',
    params: d[2]
  }) %}
  | query_no_params %ws:? data_source %ws:? params_with_sq_brackets {% d => ({
    ...d[0],
    type: 'multi-row-params',
    source: d[2],
    params: d[4]
  }) %}
  | query_no_params {% id %}
query_no_params -> %keywords_query %ws %single_quote STR %single_quote {% d => ({
    type: 'empty-params',
    keyword: d[0],
    query: d[3],
    params: []
  }) %}

# Param
params_with_sq_brackets -> %open_sq_bracket _wl_ params _wl_ %close_sq_bracket {% d => d[2] %}
  | %empty_row {% d => [] %}
params_with_parenthesis -> %open_parenthesis _wl_ params _wl_ %close_parenthesis {% d => d[2] %}
  | %empty_row {% d => [] %}
params -> params _wl_ %comma _wl_ param {% d => [...d[0], d[4]] %}
  | param
param -> %param %ws:? %equals %ws:? %param {% d => ({
    type: 'param',
    variable: d[0],
    value: d[4]
  }) %}
  | %param %ws:? %equals %ws:? variable_access {% d => ({
    type: 'variable-access',
    variable: d[0],
    value: d[4]
  }) %}

# Variable Access
variable_access -> %variable %dot %variable {% d => ({
    table: d[0],
    column: d[2]
  }) %}

# Allowed String/Word
STR -> STR %ws WRD {% d => d[0] + ' ' + d[2] %}
  | WRD {% id %}
WRD -> ([A-Za-z_] | %number) ([A-Za-z0-9_?-\\\/!@#$%^&*] | %number):* {% d => d[0] + d[1].join('') %}

# Open/Close Tag
OPEN_TAG -> %nl %indent %nl:?
CLOSE_TAG -> %nl %dedent

_wl_ -> (%ws | %nl | %indent | %dedent):*
