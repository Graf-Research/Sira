import { SiraBase } from "./base.interface"

export interface SiraPage extends SiraBase.SiraPage<string> {};
export type PageSection = SiraBase.PageSection<string>;
export interface SectionParam extends SiraBase.SectionParam<string> {};
export interface SectionData extends SiraBase.SectionData<string> {};
export interface SectionView extends SiraBase.SectionView<string> {};
// View Component
export type ViewComponent = SiraBase.ViewComponent<string>;
// View Component > Button
export interface ViewComponentButton extends SiraBase.ViewComponentButton<string> {};
export interface Button extends SiraBase.Button<string> {};
// View Component > Multiform
export interface ViewComponentMultiform extends SiraBase.ViewComponentMultiform<string> {};
export interface Multiform extends SiraBase.Multiform<string> {};
// View Component > Form
export interface ViewComponentForm extends SiraBase.ViewComponentForm<string> {};
export interface Form extends SiraBase.Form<string> {};
export interface ItemForm extends SiraBase.ItemForm<string> {};
export type FormSourceTarget = SiraBase.FormSourceTarget<string>;
export interface SourceTargetText extends SiraBase.SourceTargetText<string> {};
export interface SourceTargetBigText extends SiraBase.SourceTargetBigText<string> {};
export interface SourceTargetNumber extends SiraBase.SourceTargetNumber<string> {};
export interface SourceTargetDropdown extends SiraBase.SourceTargetDropdown<string> {};
export interface SourceTargetRadio extends SiraBase.SourceTargetRadio<string> {};
// View Component > Table
export interface ViewComponentTable extends SiraBase.ViewComponentTable<string> {};
export interface Table extends SiraBase.Table<string> {};
export type ItemTable = SiraBase.ItemTable<string>;
export interface ItemTableCell extends SiraBase.ItemTableCell<string> {};
export interface ItemTableButton extends SiraBase.ItemTableButton<string> {};
// Statement
export type Statement = SiraBase.Statement<string>;
export interface StatementConfirm extends SiraBase.StatementConfirm<string> {};
export interface StatementAlert extends SiraBase.StatementAlert<string> {};
export interface StatementGoto extends SiraBase.StatementGoto<string> {};
export interface StatementVariableAssignment extends SiraBase.StatementVariableAssignment<string> {};
export interface StatementQuery extends SiraBase.StatementQuery<string> {};
// Goto
export interface Goto extends SiraBase.Goto<string> {};
// Variable Assignment
export type VariableAssignment = SiraBase.VariableAssignment<string>;
export interface VariableAssignmentByQueryTable extends SiraBase.VariableAssignmentByQueryTable<string> {};
export interface VariableAssignmentByQueryRow extends SiraBase.VariableAssignmentByQueryRow<string> {};
export interface VariableAssignmentByEmptyTable extends SiraBase.VariableAssignmentByEmptyTable<string> {};
export interface VariableAssignmentByEmptyRow extends SiraBase.VariableAssignmentByEmptyRow<string> {};
// Query
export type Query = SiraBase.Query<string>;
export interface QuerySingleRowParams extends SiraBase.QuerySingleRowParams<string> {};
export interface QueryMultiRowParams extends SiraBase.QueryMultiRowParams<string> {};
export interface QueryEmptyParams extends SiraBase.QueryEmptyParams<string> {};
// Param
export type Param = SiraBase.Param<string>;
export interface ParamByParam extends SiraBase.ParamByParam<string> {};
export interface ParamByVariableAccess extends SiraBase.ParamByVariableAccess<string> {};
// Variable Access
export interface VariableAccess extends SiraBase.VariableAccess<string> {};
