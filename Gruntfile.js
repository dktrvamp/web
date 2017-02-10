var path = require("path");
var modRewrite = require('connect-modrewrite');
var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    "use strict";

    // load all grunt tasks
    require("load-grunt-tasks")(grunt);

    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        app_name: pkg.name.toLowerCase(),
        device_type: grunt.option("deviceType") || "desktopapp",
        environment: grunt.option("environment") || "<%= pkg.environment %>",
        publisher: grunt.option("publisher") || "<%= pkg.publisher %>",
        connect: {
            main: {
                options: {
                    hostname: "0.0.0.0",
                    open: false,
                    port: 9002,
                    fallback: "index.html",
                    middleware: function(connect, options) {
                        var middleware = [];
                        // 1. mod-rewrite behavior
                        var rules = [ '!(\\..+)$ / [L]'];
                        middleware.push(modRewrite(rules));

                        // 2. original middleware behavior
                        var base = options.base;
                        if (!Array.isArray(base)) {
                            base = [base];
                        }
                        base.forEach(function(path) {
                            middleware.push(connect.static(path));
                        });

                        return middleware;
                    }
                }
            },
            dist: {
                options : {
                    hostname: "0.0.0.0",
                    open: false,
                    useAvailablePort: true,
                    keepalive: true,
                    base: "dist",
                    fallback: "index.html",
                    middleware: function(connect, options) {
                        var middleware = [];
                        // 1. mod-rewrite behavior
                        var rules = [ '!(\\..+)$ / [L]'];
                        middleware.push(modRewrite(rules));

                        // 2. original middleware behavior
                        var base = options.base;
                        if (!Array.isArray(base)) {
                            base = [base];
                        }
                        base.forEach(function(path) {
                            middleware.push(connect.static(path));
                        });

                        return middleware;
                    }
                }
            }
        },
        watch: {
            main: {
                options: {
                   livereload: true,
                    spawn: false
                },
                files: ["libs/*","js/**/*","css/**/*","images/**/*","partials/**/*","service/**/*","filter/**/*","directive/**/*","index.html"],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: ".jshintrc",
                    smarttabs: false
                },
                src: ["js/**/*.js","partials/**/*.js","modals/**/*.js","service/**/*.js","filter/**/*.js","directive/**/*.js"]
            }
        },
        clean: {
            before:{
                src:["dist","temp"]
            },
            after: {
                src:["temp"]
            }
        },
        less: {
            production: {
                options: {},
                files: {
                    "temp/<%= app_name %>.css": "css/app.less"
                }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module:"Dktrvamp",
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: [ "partials/**/*.html","directive/**/*.html","modals/**/*.html" ],
                dest: "temp/templates.js"
            }
        },
        copy: {
            main: {
                files: [
                    {src: ["environment.json"], dest: "dist/"},
                    {src: ["index.html"], dest: "dist/"},
                    {src: ["lib.html"], dest: "dist/"},
                    {src: ["images/**"], dest: "dist/"},
                    {src: ["locale/**"], dest: "dist/"},
                    {src: ["libs/**"], dest: "dist/"},
                    {src: ["php/**"], dest: "dist/"},
                    {src: [".htaccess"], dest: "dist/"},
                    {src: ["/bower_components/font-awesome/fonts/**"], dest: "dist/fonts",flatten: true,filter:"isFile",expand:true}
                ]
            }
        },
        dom_munger:{
            readscripts: {
                options: {
                    read:{selector:"script[data-build!=\"exclude\"]",attribute:"src",writeto:"appjs"}
                },
                src:"index.html"
            },
            readcss: {
                options: {
                    read:{selector:"link[rel=\"stylesheet\"]",attribute:"href",writeto:"appcss"}
                },
                src:"index.html"
            },
            removescripts: {
                options:{
                    remove:"script[data-remove!=\"exclude\"]",
                    append:{selector:"head",html:"<script src=\"<%= app_name %>.full.min.js\"></script>"}
                },
                src:"dist/index.html"
            },
            addscript: {
                options:{
                    append:{selector:"body",html:"<script src=\"<%= app_name %>.full.min.js\"></script>"}
                },
                src:"dist/index.html"
            },
            removecss: {
                options:{
                    remove:"link",
                    append:{selector:"head",html:"<link rel=\"stylesheet\" href=\"css/<%= app_name %>.full.min.css\">"}
                },
                src:"dist/index.html"
            },
            addcss: {
                options:{
                    append:{selector:"head",html:"<link rel=\"stylesheet\" href=\"css/<%= app_name %>.full.min.css\">"}
                },
                src:"dist/index.html"
            }
        },
        cssmin: {
            main: {
                src:["temp/<%= app_name %>.css","<%= dom_munger.data.appcss %>"],
                dest:"dist/css/<%= app_name %>.full.min.css"
            }
        },
        concat: {
            main: {
                src: ["<%= dom_munger.data.appjs %>","<%= ngtemplates.main.dest %>"],
                dest: "temp/<%= app_name %>.full.js"
            }
        },
        ngAnnotate: {
            main: {
                src:"temp/<%= app_name %>.full.js",
                dest: "temp/<%= app_name %>.full.js"
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            main: {
                files: {
                    "dist/<%= app_name %>.full.min.js" : [ "temp/<%= app_name %>.full.js" ]
                }
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    "dist/index.html": "dist/index.html"
                }
            }
        },
        imagemin: {
            main:{
                files: [{
                    expand: true, cwd:"dist/",
                    src:["**/{*.png,*.jpg}"],
                    dest: "dist/"
                }]
            }
        },
        jasmine: {
            unit: {
                src: ["<%= dom_munger.data.appjs %>",
                    "bower_components/angular-mocks/angular-mocks.js"],
                options: {
                    keepRunner: true,
                    specs: ["[js][partials][service][filter][modals]/**/*-spec.js"]
                }
            }
        },
        karma: {
            options: {
                logLevel: "DEBUG",
                testPatterns: [
                    "js/**/*-spec.js",
                    "modals/**/*-spec.js",
                    "partials/**/*-spec.js",
                    "filter/**/*-spec.js",
                    "service/**/*-spec.js"
                ],
                files: [], // appjs + testPatterns from appjs_test_prepare
                frameworks: ["jasmine"],
                browsers: ["PhantomJS"],
                singleRun: true
            },
            unit: {
            }
        },
        replace : {
            main : {
                src : ["temp/<%= app_name %>*.js"],
                overwrite: true,
                replacements : [
                    { from : "@VERSION@", to : "<%= pkg.version %>" },
                    { from : "@DEVICE_TYPE@", to : "<%= device_type %>" },
                    { from : "@ENVIRONMENT@", to : "<%= environment %>" },
                    { from : "@PUBLISHER@", to : "<%= publisher %>"  }
                ]
            }
        },
        zip: {
            desktop: {
                cwd: "dist/",
                src: "dist/**",
                dest: "dist/<%= device_type %>_<%= grunt.config(\"pkg\").version %>.zip"
            }
        }
    });

    grunt.task.registerTask("overrideVersion", "allow the pkg.version to be overriden from the command line with the --setversion flag",
        function() {
            var overrideVersion = grunt.option("setversion");
            if (!overrideVersion) {
                grunt.log.writeln("Version override not provided.");
                return;
            }
            var pkg = grunt.config("pkg");
            pkg.version = overrideVersion;
            grunt.config("pkg", pkg);// required by grunt to reset config
            grunt.log.writeln("Version override set: " + overrideVersion);
        }
    );
    // set the data required for the karma tests
    grunt.registerTask("appjs_test_prepare", "prepare appjs imports",
        function() {
            var appjs = grunt.config("dom_munger.data.appjs");
            appjs.push("bower_components/angular-mocks/angular-mocks.js");
            var testPatterns = grunt.config("karma.options.testPatterns");
            appjs = appjs.concat(testPatterns);
            grunt.config("karma.options.files", appjs);
        }
    );

    grunt.registerTask("build", [
        "overrideVersion",
        "jshint",
        "clean:before",
        "less",
        "dom_munger:readcss",
        "dom_munger:readscripts",
        "ngtemplates",
        "cssmin",
        "concat",
        "ngAnnotate",
        "replace", // Must happen before uglify!
        "uglify",
        "copy",
        "dom_munger:removecss",
        "dom_munger:addcss",
        "dom_munger:removescripts",
        "dom_munger:addscript",
        "htmlmin",
        "imagemin",
        "clean:after"
    ]);

    grunt.registerTask(
        "server",
        "Run a Web server. Arguments:\n\t1) dist: Uses the distributable\n\t2) " +
            "build: Forces the recreation of the distributable",
        function(use_dist, force_build) {
            if (use_dist) {
                var tasks = ["connect:dist"];
                grunt.log.writeln("Using distributable as source...");
                if (force_build || !grunt.file.exists("dist/index.html")) {
                    grunt.log.writeln("Build was requested or is necessary...");
                    tasks.unshift("build");
                }
                return grunt.task.run(tasks);
            }
            return grunt.task.run(["dom_munger:readscripts", "jshint","connect:main", "watch"]);
        });

    grunt.registerTask("test",["dom_munger:readscripts", "appjs_test_prepare", "karma:unit"]);
    grunt.registerTask("build_ci", ["test", "build", "zip"]);

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.event.on("watch", function(action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        if (filepath.lastIndexOf(".js") !== -1 && filepath.lastIndexOf(".js") === filepath.length - 3) {
            //lint the changed js file
            grunt.config("jshint.main.src", filepath);
            grunt.task.run("jshint");

            //find the appropriate unit test for the changed file
            var spec = filepath;
            if (filepath.lastIndexOf("-spec.js") === -1 || filepath.lastIndexOf("-spec.js") !== filepath.length - 8) {
                spec = filepath.substring(0,filepath.length - 3) + "-spec.js";
            }
            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                grunt.config("jasmine.unit.options.specs",spec);
                grunt.task.run("jasmine:unit");
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of jasmine
        //will have the correct environment
        if (filepath === "index.html") {
            grunt.task.run("dom_munger:readscripts");
        }

    });

};
