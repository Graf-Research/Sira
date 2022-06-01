export namespace SiraBase {
  export interface SiraPage<T> {
    title: string
    sections: PageSection<T>[]
  }

  export type PageSection<T> = SectionParam<T> | SectionData<T> | SectionView<T>;

  export interface SectionParam<T> {
    type: 'param'
    data: T[]
  }

  export interface SectionData<T> {
    type: 'data'
    data: VariableAssignment<T>[]
  }

  export interface SectionView<T> {
    type: 'view'
    data: ViewComponent<T>[]
  }


  // View Component
  export type ViewComponent<T> = ViewComponentTable<T> | ViewComponentForm<T> | ViewComponentMultiform<T> | ViewComponentButton<T>;

  // View Component > Button
  export interface ViewComponentButton<T> {
    type: 'button'
    data: Button<T>
  }

  export interface Button<T> {
    label: string
    statements: Statement<T>[]
  }

  // View Component > Multiform
  export interface ViewComponentMultiform<T> {
    type: 'multiform'
    data: Multiform<T>
  }
  export interface Multiform<T> {
    name: string
    source_target: T
    items: ItemForm<T>[]
  }

  // View Component > Form
  export interface ViewComponentForm<T> {
    type: 'form'
    data: Form<T>
  }
  export interface Form<T> {
    name: string
    items: ItemForm<T>[]
  }
  export interface ItemForm<T> {
    label: string
    source_target: FormSourceTarget<T>
  }
  export type FormSourceTarget<T> = SourceTargetText<T>
    | SourceTargetBigText<T>
    | SourceTargetNumber<T>
    | SourceTargetDatetime<T>
    | SourceTargetDate<T>
    | SourceTargetTime<T>
    | SourceTargetDropdown<T>
    | SourceTargetRadio<T>;

  export interface SourceTargetText<T> {
    type: 'text'
    variable: VariableAccess<T>
  }
  export interface SourceTargetBigText<T> {
    type: 'bigtext'
    variable: VariableAccess<T>
  }
  export interface SourceTargetNumber<T> {
    type: 'numeric'
    variable: VariableAccess<T>
  }
  export interface SourceTargetDatetime<T> {
    type: 'datetime'
    variable: VariableAccess<T>
  }
  export interface SourceTargetDate<T> {
    type: 'date'
    variable: VariableAccess<T>
  }
  export interface SourceTargetTime<T> {
    type: 'time'
    variable: VariableAccess<T>
  }
  export interface SourceTargetDropdown<T> {
    type: 'dropdown'
    variable: VariableAccess<T>
    source: T
  }
  export interface SourceTargetRadio<T> {
    type: 'radio'
    variable: VariableAccess<T>
    source: T
  }

  // View Component > Table
  export interface ViewComponentTable<T> {
    type: 'table'
    data: Table<T>
  }
  export interface Table<T> {
    name: string
    source: T
    items: ItemTable<T>[]
  }
  export type ItemTable<T> = ItemTableCell<T> | ItemTableButton<T>;
  export interface ItemTableCell<T> {
    type: 'cell'
    data: {
      label: string
      source: {
        variable: VariableAccess<T>
        type: T
      }
    }
  }
  export interface ItemTableButton<T> {
    type: 'button'
    data: {
      label: string
      statements: Statement<T>[]
    }
  }

  // Statement
  export type Statement<T> = StatementConfirm<T>
    | StatementAlert<T>
    | StatementGoto<T>
    | StatementVariableAssignment<T>
    | StatementQuery<T>;
  export interface StatementConfirm<T> {
    type: 'confirm'
    data: string
  }
  export interface StatementAlert<T> {
    type: 'alert'
    data: string
  }
  export interface StatementGoto<T> {
    type: 'goto'
    data: Goto<T>
  }
  export interface StatementVariableAssignment<T> {
    type: 'variable-assignment'
    data: VariableAssignment<T>
  }
  export interface StatementQuery<T> {
    type: 'query'
    data: Query<T>
  }

  // Goto
  export interface Goto<T> {
    page: string
    params: Param<T>[]
  }

  // Variable Assignment
  export type VariableAssignment<T> = VariableAssignmentByQueryTable<T>
    | VariableAssignmentByEmptyTable<T>
    | VariableAssignmentByQueryRow<T>
    | VariableAssignmentByEmptyRow<T>
    | VariableAssignmentByNumericCell<T>
    | VariableAssignmentByStringCell<T>
    | VariableAssignmentByEmptyCell<T>;
  export interface VariableAssignmentByQueryTable<T> {
    type: 'query-table'
    variable: T
    value: Query<T>
  }
  export interface VariableAssignmentByQueryRow<T> {
    type: 'query-row'
    variable: T
    value: Query<T>
  }
  export interface VariableAssignmentByEmptyTable<T> {
    type: 'empty-table'
    variable: T
  }
  export interface VariableAssignmentByEmptyRow<T> {
    type: 'empty-row'
    variable: T
  }
  export interface VariableAssignmentByStringCell<T> {
    type: 'string-cell'
    variable: T
    value: T
  }
  export interface VariableAssignmentByNumericCell<T> {
    type: 'numeric-cell'
    variable: T
    value: T
  }
  export interface VariableAssignmentByEmptyCell<T> {
    type: 'empty-cell'
    variable: T
  }

  // Query
  export type Query<T> = QuerySingleRowParams<T> | QueryMultiRowParams<T> | QueryEmptyParams<T>;
  export interface QuerySingleRowParams<T> {
    type: 'single-row-params'
    keyword: T
    query: string
    params: Param<T>[]
  }
  export interface QueryMultiRowParams<T> {
    type: 'multi-row-params'
    keyword: T
    query: string
    source: T
    params: Param<T>[]
  }
  export interface QueryEmptyParams<T> {
    type: 'empty-params'
    keyword: T
    query: string
    params: Param<T>[]
  }

  // Param
  export type Param<T> = ParamByParam<T> | ParamByVariableAccess<T>;
  export interface ParamByParam<T> {
    type: 'param'
    variable: T
    value: T
  }
  export interface ParamByVariableAccess<T> {
    type: 'variable-access'
    variable: T
    value: VariableAccess<T>
  }

  // Variable Access
  export interface VariableAccess<T> {
    table: T
    column: T
  }
}
