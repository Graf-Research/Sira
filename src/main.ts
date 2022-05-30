import nearley from "nearley";
import { injectIndent } from "./indentation.utility";
import { SiraPage } from "./sira.interface";
import fs from 'fs';

const grammar = require("../grammar/compiled/sira");
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  const source_code = fs.readFileSync('./sample.sira', 'utf8');
  const query = injectIndent(source_code.trim());
  console.log(`---`);
  console.log(query.split('\n').map((str, i) => `${i + 1}: ${str}`));
  console.log(`---`);
  parser.feed(query);
} catch (e: any) {
  console.log(`error`, e.message, "end");
}

const res = parser.results;
console.log(JSON.stringify(res, null, 2));
console.log(`Ambiguity: ${res.length}`);
