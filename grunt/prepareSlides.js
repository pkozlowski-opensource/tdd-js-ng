var path = require('path');
var s = require('string');

module.exports = function (grunt) {

  grunt.registerTask('prepareSlides', function () {

    function getFragments(content) {

      var fragmentLines = [], fragmentName;
      var fragments = {
        full: content
      };

      var contentLines = content.split('\n');
      contentLines.forEach(function (line) {
        if (s(line).contains('slide:start:')) {
          fragmentName = s(line).between('slide:start:', ';');
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
          return (!fragment ? fragments.full : fragments[fragment]);
        }
      }
    }));
  });

};