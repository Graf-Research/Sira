export interface MooValue {
  type: string
  value: string
  text: string
  offset: number
  lineBreaks: number
  line: number
  col: number
}

export interface SiraPage {
  title: string
  sections: PageSection[]
}

export type PageSection = SectionParam | SectionData | SectionView;

export interface SectionParam {
  type: 'param'
  data: Param[]
}

export interface SectionData {
  type: 'data'
  data: VariableAssignment[]
}

export interface SectionView {
  type: 'view'
  data: ViewComponent[]
}


// View Component
export type ViewComponent = ViewComponentTable | ViewComponentForm | ViewComponentMultiform;

// View Component > Form
export interface ViewComponentMultiform {
  type: 'multiform'
  data: Multiform
}
export interface Multiform {
  name: string
  source_target: MooValue
  items: ItemForm
}

// View Component > Form
export interface ViewComponentForm {
  type: 'form'
  data: Form
}
export interface Form {
  name: string
  items: ItemForm
}
export interface ItemForm {
  label: string
  source_target: FormSourceTarget
}
export type FormSourceTarget = SourceTargetText
  | SourceTargetBigText
  | SourceTargetNumber
  | SourceTargetDropdown
  | SourceTargetRadio;

export interface SourceTargetText {
  type: 'text'
  variable: VariableAccess
}
export interface SourceTargetBigText {
  type: 'bigtext'
  variable: VariableAccess
}
export interface SourceTargetNumber {
  type: 'numeric'
  variable: VariableAccess
}
export interface SourceTargetDropdown {
  type: 'dropdown'
  variable: VariableAccess
  source: MooValue
}
export interface SourceTargetRadio {
  type: 'radio'
  variable: VariableAccess
  source: MooValue
}

// View Component > Table
export interface ViewComponentTable {
  type: 'table'
  data: Table
}
export interface Table {
  name: string
  source: MooValue
  items: ItemTable[]
}
export type ItemTable = ItemTableCell | ItemTableButton;
export interface ItemTableCell {
  type: 'cell'
  data: {
    label: string
    source: {
      variable: VariableAccess
      type: MooValue
    }
  }
}
export interface ItemTableButton {
  type: 'button'
  data: {
    label: string
    statements: Statement[]
  }
}

// Statement
export type Statement = StatementConfirm
  | StatementAlert
  | StatementGoto
  | StatementVariableAssignment
  | StatementQuery;
export interface StatementConfirm {
  type: 'confirm'
  data: string
}
export interface StatementAlert {
  type: 'alert'
  data: string
}
export interface StatementGoto {
  type: 'goto'
  data: Goto
}
export interface StatementVariableAssignment {
  type: 'variable-assignment'
  data: VariableAssignment
}
export interface StatementQuery {
  type: 'query'
  data: Query
}

// Goto
export interface Goto {
  page: string
  params: Param[]
}

// Variable Assignment
export type VariableAssignment = VariableAssignmentByQueryTable 
  | VariableAssignmentByQueryRow
  | VariableAssignmentByEmptyTable
  | VariableAssignmentByEmptyRow;
export interface VariableAssignmentByQueryTable {
  type: 'query-table'
  variable: MooValue
  value: Query
}
export interface VariableAssignmentByQueryRow {
  type: 'query-row'
  variable: MooValue
  value: Query
}
export interface VariableAssignmentByEmptyTable {
  type: 'empty-table'
  variable: MooValue
}
export interface VariableAssignmentByEmptyRow {
  type: 'empty-row'
  variable: MooValue
}

// Query
export type Query = QuerySingleRowParams | QueryMultiRowParams | QueryEmptyParams;
export interface QuerySingleRowParams {
  type: 'single-row-params'
  keyword: MooValue
  query: string
  params: Param[]
}
export interface QueryMultiRowParams {
  type: 'single-row-params'
  keyword: MooValue
  query: string
  params: Param[]
}
export interface QueryEmptyParams {
  type: 'empty-params'
  keyword: MooValue
  query: string
  params: Param[]
}

// Param
export type Param = ParamByParam | ParamByVariableAccess;
export interface ParamByParam {
  type: 'param'
  variable: MooValue
  value: MooValue
}
export interface ParamByVariableAccess {
  type: 'variable-access'
  variable: MooValue
  value: VariableAccess
}

// Variable Access
export interface VariableAccess {
  table: MooValue
  column: MooValue
}
