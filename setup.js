'use strict';

import fs from 'fs';
import yaml from 'js-yaml';

try {
  const doc = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
  const tags = [...new Set(Object.keys(doc.paths).map((path) => path.split('/')[1]))];

  tags.forEach((tag) => {
    try {
      fs.rmSync(tag, { recursive: true }, (err) => {
        throw err;
      });
    } catch {
      // Do nothing
    }
    fs.mkdirSync(tag, (err) => {
      // console.error(`${tag} already exists`);
      throw err;
    });
    fs.writeFileSync(
      `${tag}/package.json`,
      `{
  "main": "../dist/${tag}.cjs",
  "module": "../dist/${tag}.js",
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
