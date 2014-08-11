"use strict";

module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // Define Directory
        dirs: {
            js: "src",
            build: "dist"
        },

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        banner:
            "/*\n" +
            " * -------------------------------------------------------\n" +
            " * Project: <%= pkg.title %>\n" +
            " * Version: <%= pkg.version %>\n" +
            " *\n" +
            " * Author:  <%= pkg.author.name %>\n" +
            " * Site:    <%= pkg.author.url %>\n" +
            " * Contact: <%= pkg.author.email %>\n" +
            " *\n" +
            " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>\n" +
            " * -------------------------------------------------------\n" +
            " */\n",

        // Minify and Concat archives
        uglify: {
            options: {
                mangle: true,
                banner: "<%= banner %>"
            },
            dist: {
                files: {
                    "<%= dirs.build %>/assert-types.min.js": "<%= dirs.js %>/assert-types.js"
                }
            }
        },

        // Notifications
        notify: {
            js: {
                options: {
                    title: "Javascript - <%= pkg.title %>",
                    message: "Minified and validated with success!"
                }
            }
        },
        simplemocha: {
            backend: {
                src: 'spec/assert-types-spec.js'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask("default", [ "uglify", "notify:js" ]);
    grunt.registerTask("test", [ "karma", "simplemocha"]);

};
