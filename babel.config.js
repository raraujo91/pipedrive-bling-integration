module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@config': './src/config',
        '@models': './src/models',
        '@servoce': './src/servoce',
      },
    }],
  ],
  ignore: [
    '**/*.spec.ts',
  ],
};
