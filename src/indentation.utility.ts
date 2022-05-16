export const INDENT = '\u27F6';
export const DEDENT = '\u27F5';

export function injectIndent(lines: string, indent_size: number = 2): string {
  let indent_counter = 0;
  const list_output_line: string[] = [];
  const list_line = lines.split('\n');
  for (let i = 0; i < list_line.length; i++) {
    const line: string = list_line[i];
    if (line.trim().length === 0) {
      continue;
    }
    
    const leading_indent_count = Math.max(line.search(/\S/), 0);
    if (leading_indent_count % indent_size !== 0) {
      throw new Error(`(1) Indentation wrong on line ${i + 1}: ${line}`);
    }

    const leading_indent_size = leading_indent_count / indent_size;
    let indent_change = 0;
    for (let j = indent_counter; j < leading_indent_size; j++) {
      list_output_line.push(INDENT);
      indent_change++;
    }

    if (indent_change > 1) {
      throw new Error(`(2) Indentation wrong on line ${i + 1}: ${line}`);
    }

    for (let j = leading_indent_size; j < indent_counter; j++) {
      list_output_line.push(DEDENT);
      indent_change--;
    }

    indent_counter += indent_change;
    list_output_line.push(line.trim());
  }

  for (let j = 0; j < indent_counter; j++) {
    list_output_line.push(DEDENT);
  }

  return list_output_line.join('\n');
}
