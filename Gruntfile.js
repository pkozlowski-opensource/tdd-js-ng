module.exports = function (grunt) {

  var path = require('path');
  var s = require('string');

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

  // ========== Internal code generation tasks: Jasmine ==================

  grunt.registerTask('prepareJasmine', function () {

    console.log('Preparing Jasmine tests for: ');

    //for each folder in /src
    grunt.file.expand('src/*').forEach(function (exercisePath) {

      var indexPath = exercisePath + path.sep + 'index.html';
      var codeFiles = [];
      var specFiles = [];

      //check if index.html doesn't exist
      if (grunt.file.exists(indexPath)) {
        return;
      }

      console.log(exercisePath);

      // prepare index.html with Jasmine tests for other exercises
      //  - list files in a given folder
      //  - sort those for specs / non specs
      grunt.file.expand(exercisePath + path.sep + '*.js').forEach(function (exerciseFilePath) {
        (s(exerciseFilePath).endsWith('spec.js') ? specFiles : codeFiles)
          .push(path.basename(exerciseFilePath));
      });

      // process a template with a Jasmine index.html
      grunt.file.write(indexPath, grunt.template.process(grunt.file.read('grunt/jasmine.index.tpl.html'), {
        data: {
          files: {
            code: codeFiles,
            specs: specFiles
          },
          hasDemo: grunt.file.exists(exercisePath + path.sep + 'demo.html')
        }
      }));
    });
  });

  // ========== Internal code generation tasks: slides ==================

  grunt.registerTask('prepareSlides', function () {

    function getFragments(content) {

      var fragmentLines = [], fragmentName;
      var fragments = {
        full: content
      };

      var contentLines = content.split('\n');
      contentLines.forEach(function (line) {
        if (s(line).contains('slide:start:')) {
          fragmentName = s(line).between('slide:start:', ';')
        } else if (s(line).contains('slide:end')) {
          fragments[fragmentName] = fragmentLines.join('\n');
          fragmentLines.length = 0;
          fragmentName = undefined;
        } else {
          if (fragmentName) {
            fragmentLines.push(line);
          }
        }
      });

      return fragments;
    }

    // process slides template including code fragments
    grunt.file.write('slides/index.html', grunt.template.process(grunt.file.read('slides/index.tpl.html'), {
      data: {

        include: function (path) {
          return grunt.file.read(path);
        },

        includeHtml: function (path, fragment) {
          var fragments = getFragments(grunt.file.read(path));
          return s(!fragment ? fragments.full : fragments[fragment]).escapeHTML();
        },

        includeJs: function (path, fragment) {
          var fragments = getFragments(grunt.file.read(path));
          return (!fragment ? fragments.full : fragments[fragment]) + '\n ...';
        }
      }
    }));
  });

  // load standard Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');

};