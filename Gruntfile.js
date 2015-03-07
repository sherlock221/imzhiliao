module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        as: grunt.file.readJSON('alias.json'),
        transport: {
            options: {
                paths: ['static/js/sea-modules'],
                alias: '<%= as.spm.alias %>'
            }
        },
        concat: {
            options: {
            },
            css: {
                src: [
                    "./static/css/template/normalize.css",
                    "./static/css/template/animate.css",
                    "./static/css/template/template.css",
                    "./static/css/plugin/jquery.fullPage.css",
                    "./static/css/service/index.css",
                ],
                dest: "./static/dist/css/tp.css"
            },
            js: {
                src: [
                    "./static/js/service/index.js"
                ],
                dest: "./dist/m.js"
            }

        },
        //压缩css
        cssmin: {
            css: {
                options: {
                    banner: '/* imzhiliao.com by sherlock221b */'
                },
                files: {
                    './static/dist/css/tp.min.css': ['./static/dist/css/tp.css']
                }
          }
        },
            uglify: {
                options: {
                },
                js: {
                    src: "./dist/m.js",
                    dest: "./dist/m.min.js"
                }
            },
            clean: {
                options: {
                },
                build: {
                    src: ['./build/transport']
                }
            }
        });


    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    //测试打包loop
    grunt.registerTask('build', ['concat:css', 'cssmin:css','concat:js',"uglify:js"]);

};
