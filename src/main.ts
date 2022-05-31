import * as nearley from "nearley";
import { injectIndent } from "./indentation.utility";
import * as fs from 'fs';
import { PageSection, SectionData, SectionParam, SectionView, SiraPage } from "./new-sira.interface";

export class SiraParser {
  public result: SiraPage;
  public log: string = '';
  private parser = new nearley.Parser(nearley.Grammar.fromCompiled(require("../grammar/compiled/sira")));

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
    this.result = this.parser.results[0];
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

const parser = new SiraParser();
try {
  const source_code = fs.readFileSync('./sample.sira', 'utf8');
  parser.parse(source_code);
  console.log(JSON.stringify(parser.getViews()[0].data[0], null, 2));
} catch (e: any) {
  console.log(parser.log);
  console.log(`error`, e.message, "end");
}
