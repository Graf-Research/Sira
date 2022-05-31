import { SiraBase } from "./base.interface"

export namespace SiraIntermediate {
  export interface MooValue {
    type: string
    value: string
    text: string
    offset: number
    lineBreaks: number
    line: number
    col: number
  }

  export interface SiraPage extends SiraBase.SiraPage<MooValue> {};
  export type PageSection = SiraBase.PageSection<MooValue>;
  export interface SectionParam extends SiraBase.SectionParam<MooValue> {};
  export interface SectionData extends SiraBase.SectionData<MooValue> {};
  export interface SectionView extends SiraBase.SectionView<MooValue> {};
  // View Component
  export type ViewComponent = SiraBase.ViewComponent<MooValue>;
  // View Component > Button
  export interface ViewComponentButton extends SiraBase.ViewComponentButton<MooValue> {};
  export interface Button extends SiraBase.Button<MooValue> {};
  // View Component > Multiform
  export interface ViewComponentMultiform extends SiraBase.ViewComponentMultiform<MooValue> {};
  export interface Multiform extends SiraBase.Multiform<MooValue> {};
  // View Component > Form
  export interface ViewComponentForm extends SiraBase.ViewComponentForm<MooValue> {};
  export interface Form extends SiraBase.Form<MooValue> {};
  export interface ItemForm extends SiraBase.ItemForm<MooValue> {};
  export type FormSourceTarget = SiraBase.FormSourceTarget<MooValue>;
  export interface SourceTargetText extends SiraBase.SourceTargetText<MooValue> {};
  export interface SourceTargetBigText extends SiraBase.SourceTargetBigText<MooValue> {};
  export interface SourceTargetNumber extends SiraBase.SourceTargetNumber<MooValue> {};
  export interface SourceTargetDropdown extends SiraBase.SourceTargetDropdown<MooValue> {};
  export interface SourceTargetRadio extends SiraBase.SourceTargetRadio<MooValue> {};
  // View Component > Table
  export interface ViewComponentTable extends SiraBase.ViewComponentTable<MooValue> {};
  export interface Table extends SiraBase.Table<MooValue> {};
  export type ItemTable = SiraBase.ItemTable<MooValue>;
  export interface ItemTableCell extends SiraBase.ItemTableCell<MooValue> {};
  export interface ItemTableButton extends SiraBase.ItemTableButton<MooValue> {};
  // Statement
  export type Statement = SiraBase.Statement<MooValue>;
  export interface StatementConfirm extends SiraBase.StatementConfirm<MooValue> {};
  export interface StatementAlert extends SiraBase.StatementAlert<MooValue> {};
  export interface StatementGoto extends SiraBase.StatementGoto<MooValue> {};
  export interface StatementVariableAssignment extends SiraBase.StatementVariableAssignment<MooValue> {};
  export interface StatementQuery extends SiraBase.StatementQuery<MooValue> {};
  // Goto
  export interface Goto extends SiraBase.Goto<MooValue> {};
  // Variable Assignment
  export type VariableAssignment = SiraBase.VariableAssignment<MooValue>;
  export interface VariableAssignmentByQueryTable extends SiraBase.VariableAssignmentByQueryTable<MooValue> {};
  export interface VariableAssignmentByQueryRow extends SiraBase.VariableAssignmentByQueryRow<MooValue> {};
  export interface VariableAssignmentByEmptyTable extends SiraBase.VariableAssignmentByEmptyTable<MooValue> {};
  export interface VariableAssignmentByEmptyRow extends SiraBase.VariableAssignmentByEmptyRow<MooValue> {};
  // Query
  export type Query = SiraBase.Query<MooValue>;
  export interface QuerySingleRowParams extends SiraBase.QuerySingleRowParams<MooValue> {};
  export interface QueryMultiRowParams extends SiraBase.QueryMultiRowParams<MooValue> {};
  export interface QueryEmptyParams extends SiraBase.QueryEmptyParams<MooValue> {};
  // Param
  export type Param = SiraBase.Param<MooValue>;
  export interface ParamByParam extends SiraBase.ParamByParam<MooValue> {};
  export interface ParamByVariableAccess extends SiraBase.ParamByVariableAccess<MooValue> {};
  // Variable Access
  export interface VariableAccess extends SiraBase.VariableAccess<MooValue> {};
}
