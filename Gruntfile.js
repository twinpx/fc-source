module.exports = function( grunt ) {
  
  grunt.initConfig({
    
    source: 'source/',
    dest: 'dest/',
    temp: 'temp/',
    prod: /*'Z:/food/*/'markup/',
    
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true, 
            cwd: './<%= source%>',
            src: [
              '**/*.jade',
              'components/**/to-be-rendered/*.jade',
              'components/**/result.jade',
              '!layouts/**/*.jade',
              '!components/**/include/*.jade',
              '!components/*/*.jade',
              '!modules/**/*.jade',
              'components/**/result.jade'
            ],
            dest: '<%= dest%>',
            ext: '.html',
            extDot: 'first'
          }
        ]
      },
      
      prod: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true, 
            cwd: './<%= source%>',
            src: [
              '**/*.jade',
              '!layouts/**/*.jade',
              '!components/**/include/*.jade',
              '!modules/**/*.jade'
            ],
            dest: '<%= temp%>',
            ext: '.html',
            extDot: 'first'
          }
        ]
      }
    },
    
    stylus: {
      options: {
        compress: false,
        urlfunc: {
          name: 'embedurl',
          limit: 30000
        },
        define: {
          $imagesPath: '/template/images/'
        }
      },
      /*bootstrap: {
        files: {
          '<%= dest%>template/bootstrap.css': ['<%= source%>bootstrap/css/index.styl']
        }
      },*/
      template: {
        files: [
          {
            '<%= dest%>template/minimal.css':
              [
                '<%= source%>styl/minimal.styl',
                '<%= source%>modules/heading-linethrough/style.styl',
                '<%= source%>modules/recipe-thumb/styl/recipe-thumb-minimal.styl',//for the main page
                '<%= source%>components/**/minimal.styl'
              ]
          },
          {
            '<%= dest%>template/template_styles.css':
              [
                '<%= source%>styl/template_styles.styl',
                '<%= source%>modules/**/*.styl'
              ]
          },
          {
            expand: true,
            cwd: '<%= source%>styl/placeholders/',
            src: [ '*.styl' ],
            dest: '<%= dest%>template/placeholders/',
            extDot: 'first',
            ext: '.css'
          }
        ]
      },
      components: {
        files: [
          {
            expand: true,
            cwd: '<%= source%>components/',
            src: [ '**/style.styl' ],
            dest: '<%= dest%>components/',
            extDot: 'first',
            ext: '.css'
          }
        ]
      },
      prod: {
        options: {
          compress: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= source%>components/',
            src: [ '**/style.styl' ],
            dest: '<%= temp %>components/',
            extDot: 'first',
            ext: '.css'
          },
          {
            expand: true,
            cwd: '<%= source%>styl/placeholders/',
            src: [ '*.styl' ],
            dest: '<%= temp %>template/placeholders/',
            extDot: 'first',
            ext: '.css'
          },
          {
            '<%= temp %>template/minimal.css':
              [
                '<%= source%>styl/minimal.styl',
                '<%= source%>modules/heading-linethrough/style.styl',
                '<%= source%>modules/recipe-thumb/styl/recipe-thumb-minimal.styl',//for the main page
                '<%= source%>components/**/minimal.styl'
              ]
          },
          {
            '<%= temp %>template/template_styles.css':
              [
                '<%= source%>styl/template_styles.styl',
                '<%= source%>modules/**/*.styl'
              ]
          }
        ]
      }
    },
    
    concat: {
      js: {
        files: {
          '<%= source %>js/jscript.js': [
            '<%= source %>js/src/top.js',
            '<%= source %>js/main.js',
            '<%= source %>modules/**/*.js',
            '<%= source %>js/src/bottom.js',
          ]
        }
      },
      pluginsJS: {
        files: {
          '<%= source %>js/jscript.js': [
            '<%= source %>js/jscript.js',
            '<%= source %>js/src/plugins/**/*.js',
          ]
        }
      },
      pluginsCSS: {
        files: {
          '<%= dest %>template/template_styles.css': [
            '<%= dest %>template/template_styles.css',
            '<%= source %>js/src/plugins/**/*.css'
          ]
        }
      },
      prod: {
        files: {
          '<%= temp %>template/jscript.js': [
            '<%= source %>js/src/top.js',
            '<%= source %>js/main.js',
            '<%= source %>modules/**/*.js',
            '<%= source %>js/src/bottom.js',
          ]
        }
      },
      prodPluginsJS: {
        files: {
          '<%= temp %>template/jscript.js': [
            '<%= temp %>template/jscript.js',
            '<%= source %>js/src/plugins/**/*.js',
          ]
        }
      },
      prodPluginsCSS: {
        files: {
          '<%= temp %>template/template_styles.css': [
            '<%= temp %>template/template_styles.css',
            '<%= source %>js/src/plugins/**/*.css'
          ]
        }
      }
    },
    
    jshint: {
      dev: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= source %>js/jscript.js',
            '<%= source %>components/**/*.js'
          ]
        }
      },
      prod: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= temp %>template/jscript.js',
            '<%= temp %>components/**/*.js'
          ]
        }
      }
    },
    
    uglify: {
      /*devBootstrap: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          preserveComments: 'some'
        },
        files: [
          {
            '<%= dest%>template/bootstrap.js': [
              '<%= source %>bootstrap/js/transition.js',
              '<%= source %>bootstrap/js/alert.js',
              '<%= source %>bootstrap/js/button.js',
              '<%= source %>bootstrap/js/carousel.js',
              '<%= source %>bootstrap/js/collapse.js',
              '<%= source %>bootstrap/js/dropdown.js',
              '<%= source %>bootstrap/js/modal.js',
              '<%= source %>bootstrap/js/tooltip.js',
              '<%= source %>bootstrap/js/popover.js',
              '<%= source %>bootstrap/js/scrollspy.js',
              '<%= source %>bootstrap/js/tab.js',
              '<%= source %>bootstrap/js/affix.js'
            ]
          }
        ]
      },*/
      devTemplate: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          preserveComments: 'some'
        },
        files: [
          {
            '<%= dest%>template/jscript.js': '<%= source %>js/jscript.js'
          }
        ]
      },
      devComponents: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: '**/*.js',
            dest: '<%= dest%>components/',
            ext: '.js',
            extDot: 'first'
          }
        ]
      },
      
      /*prodBootstrap: {
        options: {
          mangle: true,
          compress: {},
          preserveComments: 'some'
        },
        files: [
          {
            '<%= temp %>template/bootstrap.js': [
              '<%= source %>bootstrap/js/transition.js',
              '<%= source %>bootstrap/js/alert.js',
              '<%= source %>bootstrap/js/button.js',
              '<%= source %>bootstrap/js/carousel.js',
              '<%= source %>bootstrap/js/collapse.js',
              '<%= source %>bootstrap/js/dropdown.js',
              '<%= source %>bootstrap/js/modal.js',
              '<%= source %>bootstrap/js/tooltip.js',
              '<%= source %>bootstrap/js/popover.js',
              '<%= source %>bootstrap/js/scrollspy.js',
              '<%= source %>bootstrap/js/tab.js',
              '<%= source %>bootstrap/js/affix.js'
            ]
          }
        ]
      },*/
      prodTemplate: {
        options: {
          mangle: true,
          compress: {},
          preserveComments: 'some'
        },
        files: [
          {
            '<%= temp %>template/jscript.js': '<%= temp %>template/jscript.js'
          }
        ]
      },
      prodComponents: {
        options: {
          mangle: true,
          compress: {}
        },
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: '**/*.js',
            dest: '<%= temp %>components/',
            ext: '.js',
            extDot: 'first'
          }
        ]
      }
    },
    
    clean: {
      js: {
        src: [ '<%= source %>js/jscript.js' ]
      },
      images: {
        src: [ '<%= dest %>template/images/' ]
      },
      temp: {
        src: [ '<%= temp %>' ]
      }
    },
    
    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>images/',
            src: [ '**/*.*' ],
            dest: '<%= dest %>template/images/'
          }
        ]
      },
      upload: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>upload/',
            src: [ '**/*.*' ],
            dest: '<%= dest %>upload/'
          }
        ]
      },
      tempImages: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>images/',
            src: [ '**/*.*' ],
            dest: '<%= temp %>template/images/'
          }
        ]
      },
      tempUpload: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>upload/',
            src: [ '**/*.*' ],
            dest: '<%= temp %>upload/'
          }
        ]
      },
      prodComponents: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: [ '**/*.js' ],
            dest: '<%= temp %>components/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: '<%= temp %>',
            src: [ '**/*.*' ],
            dest: '<%= prod %>'
          }/*,
          {
            '<%= prod %>template/bootstrap.css': '<%= dest %>template/bootstrap.css',
            '<%= prod %>template/bootstrap.js': '<%= dest %>template/bootstrap.js'
          }*/
        ]
      }
    },
    
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [ '**/*' ]
      },
      
      html: {
        files: '**/*.jade',
        tasks: 'jade:dev'
      },
      
      css: {
        files: '<%= source %>**/*.styl',
        tasks: 'css'
      },
      
      js: {
        files: [
          '<%= source %>**/*.js',
          '!<%= source %>js/jscript.js'
        ],
        tasks: [ 'js' ]
      },
      
      img: {
        files: '<%= source %>images/**/*.*',
        tasks: [
          'copy:images'
        ]
      }
    },
    
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= dest%>'
        }
      }
    },
    
    critical: {
      test: {
        options: {
          base: './',
          css: [
            '<%= dest %>template/bootstrap.min.css',
            '<%= dest %>template/template_styles.css',
            '<%= dest %>template/minimal.css'
          ],
          width: 1920,
          height: 1080
        },
        src: '<%= dest %>recipes/recipe-ph/index.html',
        dest: '<%= dest %>template/criticals/recipe.css'
      }
    }
    
  });
  
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-stylus' );
  grunt.loadNpmTasks( 'grunt-contrib-jade' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-critical' );
  
  //grunt.registerTask( 'bootstrap', [ 'stylus:bootstrap', 'uglify:devBootstrap' ] );
  grunt.registerTask( 'css', [ 'stylus:template', 'stylus:components', 'concat:pluginsCSS' ] );
  grunt.registerTask( 'js', [ 'concat:js', /*'jshint:dev',*/ 'concat:pluginsJS', /*'uglify:devTemplate', 'uglify:devComponents',*/ 'clean:js' ] );
  grunt.registerTask( 'html', [ 'copy:images', 'jade:dev' ] );
  grunt.registerTask( 'default', [ 'connect', 'css', 'js', /*'bootstrap', */'html', 'watch' ] );
  
  grunt.registerTask( 'prod', [
    'stylus:prod',
    'concat:prodPluginsCSS',
    'jade:prod',
    //js
    'concat:prod',
    'copy:prodComponents',
    //'jshint:prod',
    //'uglify:prodTemplate',
    'concat:prodPluginsJS',
    //'uglify:prodComponents',
    //images
    'clean:images',
    'copy:tempImages',
    'copy:tempUpload',
    //copy
    'copy:prod',
    'clean:temp'
  ]);
  
};