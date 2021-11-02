'use strict';

import fs from 'fs';
import yaml from 'js-yaml';

try {
  const doc = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
  const tags = [...new Set(Object.keys(doc.paths).map((path) => path.split('/')[1]))];

  tags.forEach((tag) => {
    fs.writeFileSync(
      `./dist/${tag}/package.json`,
      `{
  "module": "./${tag}.js",
  "main": "./${tag}.cjs",
  "types": "./${tag}.d.ts",
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
