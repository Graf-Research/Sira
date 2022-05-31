import { SiraIntermediate } from "./intermediate.interface";
import { SectionData, SectionParam, SectionView, SiraPage } from "./sira.interface";
export declare class SiraParser {
    result: SiraPage;
    log: string;
    private parser;
    intermediate_result: SiraIntermediate.SiraPage;
    constructor();
    parse(code: string): void;
    private processParams;
    private processQuery;
    private processVariableAssignments;
    private processStatements;
    private processItemForms;
    private processItemTables;
    private processResult;
    getParams(): SectionParam[];
    getViews(): SectionView[];
    getDatas(): SectionData[];
}
