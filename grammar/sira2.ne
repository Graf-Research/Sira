@include "./lexer.ne"

__MAIN__ -> page

# Page
page -> %keywords_page %ws STR OPEN_TAG sections CLOSE_TAG

# Sections
sections -> sections %nl section
  | section

# Section
section -> section_param
  | section_data
  | section_view

# Section > Param
section_param -> %keywords_section_param OPEN_TAG params CLOSE_TAG
params -> params %nl %param
  | %param

# Section > Data
section_data -> %keywords_section_data OPEN_TAG datas CLOSE_TAG
datas -> datas %nl data
  | data
data -> variable_assignment

# Section > View
section_view -> %keywords_section_view OPEN_TAG views CLOSE_TAG
views -> views %nl view
  | view
view -> view_component

# View Component
view_component -> vc_table

# View Component > Table
vc_table -> %keywords_table %ws STR %ws vc_table_source OPEN_TAG vc_table_items CLOSE_TAG
vc_table_source -> %open_parenthesis %ws:? %keywords_source %ws:? %equals %ws:? %variable %ws:? %close_parenthesis
vc_table_items -> vc_table_items %nl vc_table_item
  | vc_table_item
vc_table_item -> vc_table_item_cell
  | vc_table_item_button
vc_table_item_cell -> %item_begin %ws:? STR %ws:? %colon %ws:? variable_access %ws table_type
vc_table_item_button -> %item_begin %ws:? STR %ws:? %open_bracket OPEN_TAG statements CLOSE_TAG %nl %close_bracket
table_type -> "text"

# Statements
statements -> statements %nl statement
  | statement
statement -> query
  | variable_assignment
  | goto
  | alert
  | confirm

# Goto Page
goto -> %keywords_goto %ws STR %ws params_with_parenthesis

# Alert
alert -> %keywords_alert %ws STR

# Confirm
confirm -> %keywords_confirm %ws STR

# Variable Assignment
variable_assignment -> %keywords_row %ws %variable %ws:? %equals %ws:? query
  | %keywords_row %ws %variable %ws:? %equals %ws:? %empty_row
  | %keywords_table %ws %variable %ws:? %equals %ws:? query
  | %keywords_table %ws %variable %ws:? %equals %ws:? %empty_table

# Query
query -> query_no_params %ws params_with_parenthesis
  | query_no_params
query_no_params -> %keywords_query %ws %single_quote STR %single_quote

# Param
params_with_parenthesis -> %open_parenthesis %ws:? params %ws:? %close_parenthesis
params -> params %ws:? %comma %ws:? param
  | param
param -> %param %ws:? %equals %ws:? %param
  | %param %ws:? %equals %ws:? variable_access

# Variable Access
variable_access -> %variable %dot %variable

# Allowed String/Word
STR -> STR %ws WRD {% d => d[0] + ' ' + d[2] %}
  | WRD {% id %}
WRD -> [A-Za-z_] [A-Za-z0-9_?-\\\/!@#$%^&*]:* {% d => d[0] + d[1].join('') %}

# Open/Close Tag
OPEN_TAG -> %nl %indent %nl
CLOSE_TAG -> %nl %dedent
