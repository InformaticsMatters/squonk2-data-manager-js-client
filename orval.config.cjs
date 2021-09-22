module.exports = {
  'data-manager-api': {
    input: {
      // validation: true,
      target: './openapi.yaml',
      override: {
        transformer: './input-transformer.cjs',
      },
    },
    output: {
      mode: 'tags-split',
      target: './src/data-manager-api.ts',
      // mock: true,
      prettier: true,
      client: 'react-query',
      override: {
        mutator: {
          path: './src/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
        },
      },
    },
  },
};
