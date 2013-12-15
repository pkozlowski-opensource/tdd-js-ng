var path = require('path');
var s = require('string');

module.exports = function (grunt) {

// ========== Internal code generation tasks: exercises ==================

  grunt.registerTask('prepareExercises', function () {

    console.log('Preparing exercises for: ');

    // for each file in the src/[exercise]/*.*
    grunt.file.expand('src/*/*.*').forEach(function (exerciseSourcePath) {

      console.log(exerciseSourcePath);

      var targetLines = [];
      var inExercise = false;
      var exerciseTargetPath = path.join(path.dirname(exerciseSourcePath), 'exercise', path.basename(exerciseSourcePath));

      // check if target exists - it might have been created "by hand"
      if (grunt.file.exists(exerciseTargetPath)) {
        return;
      }

      // read and process line by line removing exercise parts
      grunt.file.read(exerciseSourcePath).split('\n').forEach(function (line) {
        if (s(line).contains('ex:start')) {
          inExercise = true;
        } else if (s(line).contains('ex:end')) {
          inExercise = false;
        } else {
          if (!inExercise) {
            targetLines.push(line);
          }
        }
      });

      //finally write down the example
      grunt.file.write(exerciseTargetPath, targetLines.join('\n'));

    });
  });

};