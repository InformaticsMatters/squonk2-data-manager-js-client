module.exports = (obj) => {
  console.log('Starting Input Transformer');

  // Transform the operation Ids from python/Flask routes to semantically named functions for userland
  for (const path of Object.values(obj.paths)) {
    for (const defn of Object.values(path)) {
      const { 'x-semantic-name': semanticName } = defn;
      defn.operationId = semanticName;
    }
  }

  console.log('Finished Input Transformer');

  return obj;
};
