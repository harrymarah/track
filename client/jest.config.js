export default {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  extensionsToTreatAsEsm: ['.js, .jsx'],
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
    'styled-components':
      '<rootDir>/node_modules/styled-components/dist/styled-components.cjs.js',
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.cjs',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}
