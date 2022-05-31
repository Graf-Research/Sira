import { SiraBase } from "./base.interface";
export declare namespace SiraIntermediate {
    interface MooValue {
        type: string;
        value: string;
        text: string;
        offset: number;
        lineBreaks: number;
        line: number;
        col: number;
    }
    interface SiraPage extends SiraBase.SiraPage<MooValue> {
    }
    type PageSection = SiraBase.PageSection<MooValue>;
    interface SectionParam extends SiraBase.SectionParam<MooValue> {
    }
    interface SectionData extends SiraBase.SectionData<MooValue> {
    }
    interface SectionView extends SiraBase.SectionView<MooValue> {
    }
    type ViewComponent = SiraBase.ViewComponent<MooValue>;
    interface ViewComponentButton extends SiraBase.ViewComponentButton<MooValue> {
    }
    interface Button extends SiraBase.Button<MooValue> {
    }
    interface ViewComponentMultiform extends SiraBase.ViewComponentMultiform<MooValue> {
    }
    interface Multiform extends SiraBase.Multiform<MooValue> {
    }
    interface ViewComponentForm extends SiraBase.ViewComponentForm<MooValue> {
    }
    interface Form extends SiraBase.Form<MooValue> {
    }
    interface ItemForm extends SiraBase.ItemForm<MooValue> {
    }
    type FormSourceTarget = SiraBase.FormSourceTarget<MooValue>;
    interface SourceTargetText extends SiraBase.SourceTargetText<MooValue> {
    }
    interface SourceTargetBigText extends SiraBase.SourceTargetBigText<MooValue> {
    }
    interface SourceTargetNumber extends SiraBase.SourceTargetNumber<MooValue> {
    }
    interface SourceTargetDropdown extends SiraBase.SourceTargetDropdown<MooValue> {
    }
    interface SourceTargetRadio extends SiraBase.SourceTargetRadio<MooValue> {
    }
    interface ViewComponentTable extends SiraBase.ViewComponentTable<MooValue> {
    }
    interface Table extends SiraBase.Table<MooValue> {
    }
    type ItemTable = SiraBase.ItemTable<MooValue>;
    interface ItemTableCell extends SiraBase.ItemTableCell<MooValue> {
    }
    interface ItemTableButton extends SiraBase.ItemTableButton<MooValue> {
    }
    type Statement = SiraBase.Statement<MooValue>;
    interface StatementConfirm extends SiraBase.StatementConfirm<MooValue> {
    }
    interface StatementAlert extends SiraBase.StatementAlert<MooValue> {
    }
    interface StatementGoto extends SiraBase.StatementGoto<MooValue> {
    }
    interface StatementVariableAssignment extends SiraBase.StatementVariableAssignment<MooValue> {
    }
    interface StatementQuery extends SiraBase.StatementQuery<MooValue> {
    }
    interface Goto extends SiraBase.Goto<MooValue> {
    }
    type VariableAssignment = SiraBase.VariableAssignment<MooValue>;
    interface VariableAssignmentByQueryTable extends SiraBase.VariableAssignmentByQueryTable<MooValue> {
    }
    interface VariableAssignmentByQueryRow extends SiraBase.VariableAssignmentByQueryRow<MooValue> {
    }
    interface VariableAssignmentByEmptyTable extends SiraBase.VariableAssignmentByEmptyTable<MooValue> {
    }
    interface VariableAssignmentByEmptyRow extends SiraBase.VariableAssignmentByEmptyRow<MooValue> {
    }
    type Query = SiraBase.Query<MooValue>;
    interface QuerySingleRowParams extends SiraBase.QuerySingleRowParams<MooValue> {
    }
    interface QueryMultiRowParams extends SiraBase.QueryMultiRowParams<MooValue> {
    }
    interface QueryEmptyParams extends SiraBase.QueryEmptyParams<MooValue> {
    }
    type Param = SiraBase.Param<MooValue>;
    interface ParamByParam extends SiraBase.ParamByParam<MooValue> {
    }
    interface ParamByVariableAccess extends SiraBase.ParamByVariableAccess<MooValue> {
    }
    interface VariableAccess extends SiraBase.VariableAccess<MooValue> {
    }
}
