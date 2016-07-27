module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'template/js/<%= pkg.name %>.js',
        dest: 'template/js/<%= pkg.name %>.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          'template/css/build.css': 'template/css/sass/main.scss'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify','sass']);

};