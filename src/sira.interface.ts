export interface SiraPage {
  title: AllowedString
  items: ItemPage[]
}

export type ItemPage = SectionData | SectionParam | SectionView;

export interface SectionParam {
  type: 'param'
  items?: Param[]
}

export interface SectionData {
  type: 'data'
  items?: StatementVariableAssignment[]
}

export interface SectionView {
  type: 'view'
  items?: ItemView[]
}

export type ItemView = ViewMultiform | ViewForm | ViewButton | ViewTable;

export interface ViewTable {
  type: 'table'
  title: string
  data_source_variable: AllowedVariable
  items: ItemTable[]
}

export interface ViewMultiform {
  type: 'multiform'
  title: string
  data_source_variable: AllowedVariable
  items: ItemForm[]
}

export interface ViewForm {
  type: 'form'
  title: string
  items: ItemForm[]
}

export type ItemTable = ItemFormInput | ItemFormButton;
export type ItemForm = ItemFormInput | ItemFormButton;

export interface ItemFormButton {
  type: 'button'
  label: string
  statements: Statement[]
}

export type ItemFormInput = ItemFormInputCasual | ItemFormInputDropdown;

export interface ItemFormInputCasual {
  type: 'text' | 'bigtext' | 'numeric'
  label: string
  variable: MutableVariable
}

export interface ItemFormInputDropdown {
  type: 'dropdown'
  label: string
  variable: MutableVariable
  dropdown_data_variable: AllowedVariable
}

export interface ViewButton {
  type: 'button'
  label: AllowedString
  statements: Statement[]
}

export type Statement = StatementVariableAssignment | StatementCallQuery | StatementConfirm | StatementAlert | StatementGoto;

export interface StatementGoto {
  type: 'goto'
  page: AllowedString
  params: QueryParam[]
}

export interface StatementAlert {
  type: 'alert'
  text: string
}

export interface StatementConfirm {
  type: 'confirm'
  text: string
}

export interface StatementCallQuery {
  type: 'call-query'
  query: QuerySingleRow | QueryMultiRow
  params: QueryParam[]
}

export type StatementVariableAssignment = StatementVariableEmptyRow | StatementVariableEmptyTable | StatementVariableCallQuery;

export interface StatementVariableEmptyRow {
  type: 'variable-assignment'
  kind: 'empty-row'
  variable: AllowedVariable
  value: EmptyRow
}

export interface StatementVariableEmptyTable {
  type: 'variable-assignment'
  kind: 'empty-table'
  variable: AllowedVariable
  value: EmptyTable
}

export interface StatementVariableCallQuery {
  type: 'variable-assignment'
  kind: 'call-query-result-row' | 'call-query-result-table'
  variable: AllowedVariable
  value: CallQuery
}

export type EmptyRow = '()';
export type EmptyTable = '[]';

export interface CallQuery {
  query: QuerySingleRow | QueryMultiRow
  params: QueryParam[]
}

export interface QuerySingleRow {
  multirow: boolean
  value: string
}

export interface QueryMultiRow {
  multirow: boolean
  value: string
  data_source_variable: string
}

export interface QueryParam {
  param: Param
  assign_value: QueryParamAssignValue
}
export type QueryParamAssignValue = QueryParamVariableAssignValue | QueryParamParamAssignValue;
export interface QueryParamVariableAssignValue {
  type: 'variable'
  value: MutableVariable
}
export interface QueryParamParamAssignValue {
  type: 'param'
  value: Param
}

export type MutableVariable = AllowedVariable[];
export type Param = string;
export type AllowedString = string;
export type AllowedVariable = string;
