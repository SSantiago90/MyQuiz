module.exports = function (grunt) {
  grunt.initConfig({
    concat:{
      js: {
        src: ['public/javascript/*.js'],
        dest: 'public/build/scripts.js'
      },
      css: {
        src: ['public/stylesheets/*.css'],
        dest: 'public/build/styles.css'
      },
      scss: {
        src: 'public/stylesheets/*.scss',
        dest: 'public/stylesheets/build.scss'
      }
    },
    sass:{
      build:{
        files: [{
          src: 'public/stylesheets/styles.scss',
          dest: 'public/build/styles.css'
        }]
      }
    },
    watch:{
      css:{
        files: ['public/stylesheets/*css'],
        tasks: ['sass:build']
      }
    }
  });

  //TODO:
  //mover scss de "public" a "stylesheets" y "build" a "public/stylesheets"
  //fijate "myquiz" logo en header (no se ve salvo en index)

  //Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  //Register tasks
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('concat-css', ['concat:css']);
  grunt.registerTask('concat-scss', ['concat:scss']);
};
