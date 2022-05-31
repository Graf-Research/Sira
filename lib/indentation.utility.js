"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectIndent = exports.DEDENT = exports.INDENT = void 0;
exports.INDENT = '\u27F6';
exports.DEDENT = '\u27F5';
function injectIndent(lines, indent_size) {
    if (indent_size === void 0) { indent_size = 2; }
    var indent_counter = 0;
    var list_output_line = [];
    var list_line = lines.split('\n');
    for (var i = 0; i < list_line.length; i++) {
        var line = list_line[i];
        if (line.trim().length === 0) {
            list_output_line.push('');
            continue;
        }
        var leading_indent_count = Math.max(line.search(/\S/), 0);
        if (leading_indent_count % indent_size !== 0) {
            throw new Error("(1) Indentation wrong on line ".concat(i + 1, ": ").concat(line));
        }
        var leading_indent_size = leading_indent_count / indent_size;
        var indent_change = 0;
        for (var j = indent_counter; j < leading_indent_size; j++) {
            line = exports.INDENT + line.trim();
            indent_change++;
        }
        if (indent_change > 1) {
            throw new Error("(2) Indentation wrong on line ".concat(i + 1, ": ").concat(line));
        }
        for (var j = leading_indent_size; j < indent_counter; j++) {
            line = exports.DEDENT + line.trim();
            indent_change--;
        }
        indent_counter += indent_change;
        list_output_line.push(line.trim());
    }
    for (var j = 0; j < indent_counter; j++) {
        list_output_line.push(exports.DEDENT);
    }
    return list_output_line.join('\n');
}
exports.injectIndent = injectIndent;
