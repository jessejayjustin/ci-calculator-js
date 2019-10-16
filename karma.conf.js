// Karma configuration
// Generated on Mon Oct 14 2019 17:35:46 GMT+0800 (Malay Peninsula Standard Time)
var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    reporters: ['kjhtml','progress'],
    port: 9876,
    colors: false,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'src/index.js',
      'src/tests/Spec.js'],

    preprocessors: {  
      'src/index.js': ['webpack'],
      'src/tests/Spec.js': ['webpack']
    },

    //plugins: ['karma-browserify'],

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },

    webpackMiddleware: {
      noInfo: true
    }
  });
}