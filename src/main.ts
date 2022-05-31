import * as nearley from "nearley";
import { injectIndent } from "./indentation.utility";
import { SiraIntermediate } from "./intermediate.interface";
import { ItemForm, ItemTable, ItemTableCell, PageSection, Param, ParamByParam, ParamByVariableAccess, Query, QueryEmptyParams, QueryMultiRowParams, QuerySingleRowParams, SectionData, SectionParam, SectionView, SiraPage, SourceTargetBigText, SourceTargetDropdown, SourceTargetNumber, SourceTargetRadio, SourceTargetText, Statement, StatementAlert, StatementConfirm, StatementGoto, StatementQuery, StatementVariableAssignment, VariableAssignment, VariableAssignmentByEmptyRow, VariableAssignmentByEmptyTable, VariableAssignmentByQueryRow, VariableAssignmentByQueryTable, ViewComponentButton, ViewComponentForm, ViewComponentTable } from "./sira.interface";

export class SiraParser {
  public result: SiraPage;
  public log: string = '';
  private parser = new nearley.Parser(nearley.Grammar.fromCompiled(require("../grammar/compiled/sira")));
  public intermediate_result: SiraIntermediate.SiraPage;

  constructor() {
    //
  }

  parse(code: string) {
    const post_code = injectIndent(code.trim());
    this.log = post_code.split('\n').map((str, i) => `${i + 1}: ${str}`).join('\n');
    this.parser.feed(post_code);
    if (this.parser.results.length > 1) {
      throw new Error(`Grammar has ${this.parser.results.length} ambiguity`);
    }
    this.intermediate_result = this.parser.results[0];
    this.processResult();
  }

  private processParams(params: SiraIntermediate.Param[]): Param[] {
    return params.map((p: SiraIntermediate.Param): Param => {
      switch (p.type) {
        case 'param':
          return {
            type: 'param',
            variable: p.variable.value,
            value: p.value.value
          } as ParamByParam;
        case 'variable-access':
          return {
            type: 'variable-access',
            variable: p.variable.value,
            value: {
              table: p.value.table.value,
              column: p.value.column.value
            }
          } as ParamByVariableAccess;
      }
    })
  }

  private processQuery(query: SiraIntermediate.Query): Query {
    switch (query.type) {
      case 'empty-params': 
        return {
          type: query.type,
          query: query.query,
          params: []
        } as QueryEmptyParams;
      case 'single-row-params':
        return {
          type: 'single-row-params',
          query: query.query,
          params: this.processParams(query.params)
        } as QuerySingleRowParams;
      case 'multi-row-params':
        return {
          type: 'multi-row-params',
          query: query.query,
          source: query.source.value,
          params: this.processParams(query.params)
        } as QueryMultiRowParams;
    }
  }

  private processVariableAssignments(vas: SiraIntermediate.VariableAssignment[]): VariableAssignment[] {
    return vas.map((va: SiraIntermediate.VariableAssignment) => {
      switch (va.type) {
        case 'empty-row':
          return {
            type: 'empty-row',
            variable: va.variable.value
          } as VariableAssignmentByEmptyRow;
        case 'empty-table':
          return {
            type: 'empty-table',
            variable: va.variable.value
          } as VariableAssignmentByEmptyTable;
        case 'query-row':
          return {
            type: 'query-row',
            variable: va.variable.value,
            value: this.processQuery(va.value)
          } as VariableAssignmentByQueryRow;
        case 'query-table':
          return {
            type: 'query-table',
            variable: va.variable.value,
            value: this.processQuery(va.value)
          } as VariableAssignmentByQueryTable;
      }
    })
  }

  private processStatements(statements: SiraIntermediate.Statement[]): Statement[] {
    return statements.map((st: SiraIntermediate.Statement): Statement => {
      switch (st.type) {
        case 'alert':
          return {
            type: 'alert',
            data: st.data
          } as StatementAlert;
        case 'confirm':
          return {
            type: 'confirm',
            data: st.data
          } as StatementConfirm;
        case 'goto':
          return {
            type: 'goto',
            data: {
              page: st.data.page,
              params: this.processParams(st.data.params)
            }
          } as StatementGoto;
        case 'query':
          return {
            type: 'query',
            data: this.processQuery(st.data)
          } as StatementQuery;
        case 'variable-assignment':
          return {
            type: 'variable-assignment',
            data: this.processVariableAssignments([st.data])[0]
          } as StatementVariableAssignment;
      }
    })
  }

  private processItemForms(ifs: SiraIntermediate.ItemForm[]): ItemForm[] {
    return ifs.map((itf: SiraIntermediate.ItemForm): ItemForm => {
      switch (itf.source_target.type) {
        case 'text':
        case 'bigtext':
        case 'numeric':
          return {
            label: itf.label,
            source_target: {
              type: itf.source_target.type,
              variable: {
                table: itf.source_target.variable.table.value,
                column: itf.source_target.variable.column.value
              }
            } as (SourceTargetText | SourceTargetBigText | SourceTargetNumber)
          }
        case 'dropdown':
        case 'radio':
          return {
            label: itf.label,
            source_target: {
              type: itf.source_target.type,
              variable: {
                table: itf.source_target.variable.table.value,
                column: itf.source_target.variable.column.value
              },
              source: itf.source_target.source.value
            } as (SourceTargetDropdown | SourceTargetRadio)
          }
      }
    })
  }

  private processItemTables(its: SiraIntermediate.ItemTable[]): ItemTable[] {
    return its.map((it: SiraIntermediate.ItemTable): ItemTable => {
      switch (it.type) {
        case 'cell':
          return {
            type: 'cell',
            data: {
              label: it.data.label,
              source: {
                variable: {
                  table: it.data.source.variable.table.value,
                  column: it.data.source.variable.column.value,
                },
                type: it.data.source.type.value
              }
            }
          } as ItemTableCell;
        case 'button':
          return {
            type: 'button',
            data: {
              label: it.data.label,
              statements: this.processStatements(it.data.statements)
            }
          }
      }
    })
  }

  private processResult() {
    this.result = {
      title: this.intermediate_result.title,
      sections: this.intermediate_result.sections.map((ps: SiraIntermediate.PageSection) => {
        switch (ps.type) {
          case 'param':
            return {
              type: 'param',
              data: ps.data.map((moo: SiraIntermediate.MooValue): string => moo.value)
            } as SectionParam;
          case 'data':
            return {
              ...ps,
              data: this.processVariableAssignments(ps.data)
            } as SectionData;
          case 'view':
            return {
              type: 'view',
              data: ps.data.map((vc: SiraIntermediate.ViewComponent) => {
                switch (vc.type) {
                  case 'button':
                    return {
                      type: 'button',
                      data: {
                        label: vc.data.label,
                        statements: this.processStatements(vc.data.statements)
                      }
                    } as ViewComponentButton;
                  case 'form':
                  case 'multiform':
                    return {
                      type: vc.type,
                      data: {
                        name: vc.data.name,
                        items: this.processItemForms(vc.data.items)
                      }
                    } as ViewComponentForm;
                  case 'table':
                    return {
                      type: 'table',
                      data: {
                        name: vc.data.name,
                        source: vc.data.source.value,
                        items: this.processItemTables(vc.data.items)
                      }
                    } as ViewComponentTable;
                }
              })
            } as SectionView;
        }
      })
    }
  }
  
  getParams(): SectionParam[] {
    if (!this.result) {
      throw new Error(`No parse result found`);
    }
    return this.result.sections.filter((ps: PageSection) => ps.type === 'param') as SectionParam[];
  }
  
  getViews(): SectionView[] {
    if (!this.result) {
      throw new Error(`No parse result found`);
    }
    return this.result.sections.filter((ps: PageSection) => ps.type === 'view') as SectionView[];
  }
  
  getDatas(): SectionData[] {
    if (!this.result) {
      throw new Error(`No parse result found`);
    }
    return this.result.sections.filter((ps: PageSection) => ps.type === 'data') as SectionData[];
  }
}
