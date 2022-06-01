import * as fs from 'fs';
import { SiraParser } from "./main";

const parser = new SiraParser();
try {
  const source_code = fs.readFileSync('./sample.sira', 'utf8');
  parser.parse(source_code);
  // console.log(JSON.stringify(parser.getViews()[0].data[0], null, 2));
  console.log(JSON.stringify(parser.result, null, 2));
} catch (e: any) {
  console.log(parser.log);
  console.log(e);
}
