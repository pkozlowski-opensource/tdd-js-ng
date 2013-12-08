module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      files: [
        'Gruntfile.js',
        'package.json',
        'src/**/*.js'
      ],
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
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
          keepalive: true,
          middleware: function (connect, options) {
            return [
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'karma:ci']);
  grunt.registerTask('tdd', ['karma:tdd']);
  grunt.registerTask('www', ['connect:server']);


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
};