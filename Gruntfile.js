module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sass: {
            dev: {
                options: {
                    style: 'compressed'
                },
                files : {
                    'wp-content/themes/idealfit/style.css':'wp-content/themes/idealfit/sass/style.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['wp-content/themes/idealfit/sass/*.scss'],
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // Default task(s).
    grunt.registerTask('default', ['watch:sass']);

};