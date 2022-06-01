"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiraParser = void 0;
var nearley = require("nearley");
var indentation_utility_1 = require("./indentation.utility");
var SiraParser = /** @class */ (function () {
    function SiraParser() {
        this.log = '';
        this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(require("../grammar/compiled/sira")));
        //
    }
    SiraParser.prototype.parse = function (code) {
        var post_code = (0, indentation_utility_1.injectIndent)(code.trim());
        this.log = post_code.split('\n').map(function (str, i) { return "".concat(i + 1, ": ").concat(str); }).join('\n');
        this.parser.feed(post_code);
        if (this.parser.results.length > 1) {
            throw new Error("Grammar has ".concat(this.parser.results.length, " ambiguity"));
        }
        this.intermediate_result = this.parser.results[0];
        this.processResult();
    };
    SiraParser.prototype.processParams = function (params) {
        return params.map(function (p) {
            switch (p.type) {
                case 'param':
                    return {
                        type: 'param',
                        variable: p.variable.value,
                        value: p.value.value
                    };
                case 'variable-access':
                    return {
                        type: 'variable-access',
                        variable: p.variable.value,
                        value: {
                            table: p.value.table.value,
                            column: p.value.column.value
                        }
                    };
            }
        });
    };
    SiraParser.prototype.processQuery = function (query) {
        switch (query.type) {
            case 'empty-params':
                return {
                    type: query.type,
                    query: query.query,
                    params: []
                };
            case 'single-row-params':
                return {
                    type: 'single-row-params',
                    query: query.query,
                    params: this.processParams(query.params)
                };
            case 'multi-row-params':
                return {
                    type: 'multi-row-params',
                    query: query.query,
                    source: query.source.value,
                    params: this.processParams(query.params)
                };
        }
    };
    SiraParser.prototype.processVariableAssignments = function (vas) {
        var _this = this;
        return vas.map(function (va) {
            switch (va.type) {
                case 'numeric-cell':
                    return {
                        type: 'numeric-cell',
                        variable: va.variable.value,
                        value: parseInt(va.value.value)
                    };
                case 'string-cell':
                    return {
                        type: 'string-cell',
                        variable: va.variable.value,
                        value: va.value.value.replace(/^"(.*)"$/, '$1')
                    };
                case 'empty-cell':
                    return {
                        type: 'empty-cell',
                        variable: va.variable.value
                    };
                case 'empty-row':
                    return {
                        type: 'empty-row',
                        variable: va.variable.value
                    };
                case 'empty-table':
                    return {
                        type: 'empty-table',
                        variable: va.variable.value
                    };
                case 'query-row':
                    return {
                        type: 'query-row',
                        variable: va.variable.value,
                        value: _this.processQuery(va.value)
                    };
                case 'query-table':
                    return {
                        type: 'query-table',
                        variable: va.variable.value,
                        value: _this.processQuery(va.value)
                    };
            }
        });
    };
    SiraParser.prototype.processStatements = function (statements) {
        var _this = this;
        return statements.map(function (st) {
            switch (st.type) {
                case 'alert':
                    return {
                        type: 'alert',
                        data: st.data
                    };
                case 'confirm':
                    return {
                        type: 'confirm',
                        data: st.data
                    };
                case 'goto':
                    return {
                        type: 'goto',
                        data: {
                            page: st.data.page,
                            params: _this.processParams(st.data.params)
                        }
                    };
                case 'query':
                    return {
                        type: 'query',
                        data: _this.processQuery(st.data)
                    };
                case 'variable-assignment':
                    return {
                        type: 'variable-assignment',
                        data: _this.processVariableAssignments([st.data])[0]
                    };
            }
        });
    };
    SiraParser.prototype.processItemForms = function (ifs) {
        return ifs.map(function (itf) {
            switch (itf.source_target.type) {
                case 'text':
                case 'bigtext':
                case 'numeric':
                case 'datetime':
                case 'date':
                case 'time':
                    return {
                        label: itf.label,
                        source_target: {
                            type: itf.source_target.type,
                            variable: {
                                table: itf.source_target.variable.table.value,
                                column: itf.source_target.variable.column.value
                            }
                        }
                    };
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
                        }
                    };
            }
        });
    };
    SiraParser.prototype.processItemTables = function (its) {
        var _this = this;
        return its.map(function (it) {
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
                    };
                case 'button':
                    return {
                        type: 'button',
                        data: {
                            label: it.data.label,
                            statements: _this.processStatements(it.data.statements)
                        }
                    };
            }
        });
    };
    SiraParser.prototype.processResult = function () {
        var _this = this;
        this.result = {
            title: this.intermediate_result.title,
            sections: this.intermediate_result.sections.map(function (ps) {
                switch (ps.type) {
                    case 'param':
                        return {
                            type: 'param',
                            data: ps.data.map(function (moo) { return moo.value; })
                        };
                    case 'data':
                        return __assign(__assign({}, ps), { data: _this.processVariableAssignments(ps.data) });
                    case 'view':
                        return {
                            type: 'view',
                            data: ps.data.map(function (vc) {
                                switch (vc.type) {
                                    case 'button':
                                        return {
                                            type: 'button',
                                            data: {
                                                label: vc.data.label,
                                                statements: _this.processStatements(vc.data.statements)
                                            }
                                        };
                                    case 'form':
                                        return {
                                            type: vc.type,
                                            data: {
                                                name: vc.data.name,
                                                items: _this.processItemForms(vc.data.items)
                                            }
                                        };
                                    case 'multiform':
                                        return {
                                            type: vc.type,
                                            data: {
                                                name: vc.data.name,
                                                source_target: vc.data.source_target.value,
                                                items: _this.processItemForms(vc.data.items)
                                            }
                                        };
                                    case 'table':
                                        return {
                                            type: 'table',
                                            data: {
                                                name: vc.data.name,
                                                source: vc.data.source.value,
                                                items: _this.processItemTables(vc.data.items)
                                            }
                                        };
                                }
                            })
                        };
                }
            })
        };
    };
    SiraParser.prototype.getParams = function () {
        if (!this.result) {
            throw new Error("No parse result found");
        }
        return this.result.sections.filter(function (ps) { return ps.type === 'param'; });
    };
    SiraParser.prototype.getViews = function () {
        if (!this.result) {
            throw new Error("No parse result found");
        }
        return this.result.sections.filter(function (ps) { return ps.type === 'view'; });
    };
    SiraParser.prototype.getDatas = function () {
        if (!this.result) {
            throw new Error("No parse result found");
        }
        return this.result.sections.filter(function (ps) { return ps.type === 'data'; });
    };
    return SiraParser;
}());
exports.SiraParser = SiraParser;
