"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var main_1 = require("./main");
var parser = new main_1.SiraParser();
try {
    var source_code = fs.readFileSync('./sample.sira', 'utf8');
    parser.parse(source_code);
    // console.log(JSON.stringify(parser.getViews()[0].data[0], null, 2));
    console.log(JSON.stringify(parser.result, null, 2));
}
catch (e) {
    console.log(parser.log);
    console.log(e);
}
