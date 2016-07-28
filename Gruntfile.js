module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'template/js/dev/*.js']
    },

    uglify: {
      build: {
        src: 'template/js/dev/build.js',
        dest: 'template/js/build.min.js'
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
    },

    watch: {
      scripts: {
        files: ['template/css/sass/*.scss','template/js/dev/*.js'],
        tasks: ['sass','jshint','uglify'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify','sass']);

};