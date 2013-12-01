module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'package.json', 'src/**/*.js'],
      options: {
      }
    },
    karma: {
      options: {
        frameworks: ['jasmine'],
        files: [
          'lib/angular.js',
          'lib/angular-mocks.js',
          'src/**/*.js'
        ],
        exclude: [
        ],
        browsers: process.env.TRAVIS ? ['Firefox'] : ['Chrome']
      },
      tdd: {
        autoWatch: true,
        singleRun: false
      },
      ci: {
        autoWatch: false,
        singleRun: true
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'karma:ci']);
  grunt.registerTask('tdd', ['karma:tdd']);


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
};