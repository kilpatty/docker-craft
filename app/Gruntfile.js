/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    stylus: {
      dev:{
        options:{
          compress: false
        },
        files:{
          'dev/css/gentleman.css': 'dev/css/styles/gentleman.styl'
        }
      },
      dist:{
        options:{
          compress:true
        },
        files:{
          'src/css/gentleman.css': 'dev/css/styles/gentleman.styl'
        }
      }
    },
    htmlmin:{
      dist:{
        options:{
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'src/index.html': 'dev/index.html',
          'src/404.html': 'dev/root_files/404.html'
        }
      }
    },
    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'dev/root_files/', src: 'browserconfig.xml', dest: 'src/'},
          {expand: true, cwd: 'dev/root_files/', src: 'crossdomain.xml', dest: 'src/'},
          {expand: true, cwd: 'dev/root_files/', src: 'humans.txt', dest: 'src/'},
          {expand: true, cwd: 'dev/root_files/', src: 'robots.txt', dest: 'src/'},
          {expand: true, cwd: 'dev/root_files/', src: 'manifest.json', dest: 'src/'},
          {expand: true, cwd: 'dev/favicons/', src: '*', dest: 'src/'},
        ],
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      css:{
        files: 'dev/css/styles/gentleman.styl',
        tasks: ['stylus:dev']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');


  // Default task.
  grunt.registerTask('default', ['stylus:dev']);
  grunt.registerTask('dist', ['stylus:dist', 'htmlmin:dist', 'copy:dist']);
};
