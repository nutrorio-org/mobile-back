module.exports = {
  // Indica os arquivos que Jest deve incluir na execução dos testes
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  // Indica os arquivos que Jest deve excluir da execução dos testes
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Configura um módulo de importação para lidar com arquivos TypeScript
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mapeamento de arquivos de estilo para um módulo fictício
  },

  // Transforma arquivos TypeScript usando ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Indica o ambiente de execução dos testes (neste caso, node)
  testEnvironment: 'node',

  // Indica quais extensões de arquivo Jest deve processar
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
