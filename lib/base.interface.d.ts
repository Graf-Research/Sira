export declare namespace SiraBase {
    interface SiraPage<T> {
        title: string;
        sections: PageSection<T>[];
    }
    type PageSection<T> = SectionParam<T> | SectionData<T> | SectionView<T>;
    interface SectionParam<T> {
        type: 'param';
        data: T[];
    }
    interface SectionData<T> {
        type: 'data';
        data: VariableAssignment<T>[];
    }
    interface SectionView<T> {
        type: 'view';
        data: ViewComponent<T>[];
    }
    type ViewComponent<T> = ViewComponentTable<T> | ViewComponentForm<T> | ViewComponentMultiform<T> | ViewComponentButton<T>;
    interface ViewComponentButton<T> {
        type: 'button';
        data: Button<T>;
    }
    interface Button<T> {
        label: string;
        statements: Statement<T>[];
    }
    interface ViewComponentMultiform<T> {
        type: 'multiform';
        data: Multiform<T>;
    }
    interface Multiform<T> {
        name: string;
        source_target: T;
        items: ItemForm<T>[];
    }
    interface ViewComponentForm<T> {
        type: 'form';
        data: Form<T>;
    }
    interface Form<T> {
        name: string;
        items: ItemForm<T>[];
    }
    interface ItemForm<T> {
        label: string;
        source_target: FormSourceTarget<T>;
    }
    type FormSourceTarget<T> = SourceTargetText<T> | SourceTargetBigText<T> | SourceTargetNumber<T> | SourceTargetDatetime<T> | SourceTargetDate<T> | SourceTargetTime<T> | SourceTargetDropdown<T> | SourceTargetRadio<T>;
    interface SourceTargetText<T> {
        type: 'text';
        variable: VariableAccess<T>;
    }
    interface SourceTargetBigText<T> {
        type: 'bigtext';
        variable: VariableAccess<T>;
    }
    interface SourceTargetNumber<T> {
        type: 'numeric';
        variable: VariableAccess<T>;
    }
    interface SourceTargetDatetime<T> {
        type: 'datetime';
        variable: VariableAccess<T>;
    }
    interface SourceTargetDate<T> {
        type: 'date';
        variable: VariableAccess<T>;
    }
    interface SourceTargetTime<T> {
        type: 'time';
        variable: VariableAccess<T>;
    }
    interface SourceTargetDropdown<T> {
        type: 'dropdown';
        variable: VariableAccess<T>;
        source: T;
    }
    interface SourceTargetRadio<T> {
        type: 'radio';
        variable: VariableAccess<T>;
        source: T;
    }
    interface ViewComponentTable<T> {
        type: 'table';
        data: Table<T>;
    }
    interface Table<T> {
        name: string;
        source: T;
        items: ItemTable<T>[];
    }
    type ItemTable<T> = ItemTableCell<T> | ItemTableButton<T>;
    interface ItemTableCell<T> {
        type: 'cell';
        data: {
            label: string;
            source: {
                variable: VariableAccess<T>;
                type: T;
            };
        };
    }
    interface ItemTableButton<T> {
        type: 'button';
        data: {
            label: string;
            statements: Statement<T>[];
        };
    }
    type Statement<T> = StatementConfirm<T> | StatementAlert<T> | StatementGoto<T> | StatementVariableAssignment<T> | StatementQuery<T>;
    interface StatementConfirm<T> {
        type: 'confirm';
        data: string;
    }
    interface StatementAlert<T> {
        type: 'alert';
        data: string;
    }
    interface StatementGoto<T> {
        type: 'goto';
        data: Goto<T>;
    }
    interface StatementVariableAssignment<T> {
        type: 'variable-assignment';
        data: VariableAssignment<T>;
    }
    interface StatementQuery<T> {
        type: 'query';
        data: Query<T>;
    }
    interface Goto<T> {
        page: string;
        params: Param<T>[];
    }
    type VariableAssignment<T> = VariableAssignmentByQueryTable<T> | VariableAssignmentByEmptyTable<T> | VariableAssignmentByQueryRow<T> | VariableAssignmentByEmptyRow<T> | VariableAssignmentByNumericCell<T> | VariableAssignmentByStringCell<T> | VariableAssignmentByEmptyCell<T>;
    interface VariableAssignmentByQueryTable<T> {
        type: 'query-table';
        variable: T;
        value: Query<T>;
    }
    interface VariableAssignmentByQueryRow<T> {
        type: 'query-row';
        variable: T;
        value: Query<T>;
    }
    interface VariableAssignmentByEmptyTable<T> {
        type: 'empty-table';
        variable: T;
    }
    interface VariableAssignmentByEmptyRow<T> {
        type: 'empty-row';
        variable: T;
    }
    interface VariableAssignmentByStringCell<T> {
        type: 'string-cell';
        variable: T;
        value: T;
    }
    interface VariableAssignmentByNumericCell<T> {
        type: 'numeric-cell';
        variable: T;
        value: T;
    }
    interface VariableAssignmentByEmptyCell<T> {
        type: 'empty-cell';
        variable: T;
    }
    type Query<T> = QuerySingleRowParams<T> | QueryMultiRowParams<T> | QueryEmptyParams<T>;
    interface QuerySingleRowParams<T> {
        type: 'single-row-params';
        keyword: T;
        query: string;
        params: Param<T>[];
    }
    interface QueryMultiRowParams<T> {
        type: 'multi-row-params';
        keyword: T;
        query: string;
        source: T;
        params: Param<T>[];
    }
    interface QueryEmptyParams<T> {
        type: 'empty-params';
        keyword: T;
        query: string;
        params: Param<T>[];
    }
    type Param<T> = ParamByParam<T> | ParamByVariableAccess<T>;
    interface ParamByParam<T> {
        type: 'param';
        variable: T;
        value: T;
    }
    interface ParamByVariableAccess<T> {
        type: 'variable-access';
        variable: T;
        value: VariableAccess<T>;
    }
    interface VariableAccess<T> {
        table: T;
        column: T;
    }
}
