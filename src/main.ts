import nearley from "nearley";
import { injectIndent } from "./indentation.utility";
import { SiraPage } from "./sira.interface";
import fs from 'fs';

const grammar = require("../grammar/compiled/sira");
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  const source_code = fs.readFileSync('./sample.sira', 'utf8');
  const query = injectIndent(source_code.trim());
  parser.feed(query);
} catch (e: any) {
  console.log(`error`, e.message, "end");
}

const res: SiraPage[] = parser.results[0];
console.log(JSON.stringify(res, null, 2));
