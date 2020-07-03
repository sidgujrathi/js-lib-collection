/**
 * JSDoc to Markdown: Colletction of configurationa and build function
 * to help generate jsdoc to markdown
 * @module auth
 */

const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

/* input and output paths */
const inputFile = 'lib/*.js';
const outputDir = `${__dirname}/docs`;

const output = jsdoc2md.renderSync({ files: inputFile });
fs.writeFileSync(path.resolve(outputDir, 'README.md'), output);
