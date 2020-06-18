// Karma configuration
// Generated on Sun May 24 2020 11:39:58 GMT-0300 (GMT-03:00)

module.exports = function(config) {
  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'karma-typescript'
    ],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // { pattern: "./base.spec.ts" },
      { pattern: "src/**/*.+(ts|html)" },
      { pattern: "test/**/*.+(ts|html)" },
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.ts': [ 'karma-typescript' ],
      'test/**/*.ts': [ 'karma-typescript' ],
    },

    karmaTypescriptConfig: {
      bundlerOptions: {
          entrypoints: /\.spec\.ts$/,
          transforms: [
            require("karma-typescript-es6-transform")(),
            require("karma-typescript-angular2-transform")
          ]
      },
      compilerOptions: {
        emitDecoratorMetadata: true,
        lib: ["dom","es5","es6", "scripthost"],
      },
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'karma-typescript'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
  })
}
