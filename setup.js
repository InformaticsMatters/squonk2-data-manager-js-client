'use strict';

import fs from 'fs';
import yaml from 'js-yaml';

try {
  const doc = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
  const tags = [...new Set(Object.keys(doc.paths).map((path) => path.split('/')[1]))];

  tags.forEach((tag) => {
    fs.rmSync(tag, { recursive: true }, (err) => {
      throw err;
    });
    fs.mkdirSync(tag, (err) => {
      // console.error(`${tag} already exists`);
      throw err;
    });
    fs.writeFileSync(
      `${tag}/package.json`,
      `{
      "main": "../dist/${tag}.js",
      "module": "../dist/${tag}.mjs",
      "types": "../dist/${tag}.d.ts",
      "sideEffects": false
    }`,
      (err) => {
        throw err;
      },
    );
  });
} catch (e) {
  console.error(e);
}
