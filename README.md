# Overview

Dktrvamp HTML is single-page Web application built on AngularJS.

Development of the Web application depends on the following tools:

* __Node and Node Package Manager (NPM):__ We use node to serve up the UI locally
    and run other various tasks (via Grunt).
* __Grunt:__ Grunt uses Node to build the application for deployment/distributions.
    It handles the compiling, minification, obfuscation, etc. It can also tell
    Node to host the application (pre-built and built) for testing in a browser
    or the desktop application.
* __Bower:__ Bower is a font-end package management tool. This is used to update various
    packages used in the application (AngularJS, Underscore, ui-router, etc.).

# Setup Instructions

1. Get access to the Dktrvamp HTML and Flat Config Server repositories.
2. Clone the Dktrvamp HTML repo to your workstation.
3. [Download](http://nodejs.org) and install Node (which includes NPM).
4. In a terminal window, navigate to the Dktrvamp HTML folder
5. Tell NPM to install Grunt and Bower globally:

        sudo npm install -g grunt-cli bower

6. Tell NPM to install all other dependencies:

        sudo npm install

7. Tell Git to update and initialize required submodules:

        git submodule update --init

8. Tell Bower to install all required font-end packages (defined in bower.js):

        bower install

# Run the Server

The Web application is run on a Node Web server instance started by Grunt and hosted
at http://0.0.0.0:9002:

    grunt server

Grunt can also package the source code into a smaller, minified, and obfuscated
"distributable" and store it in the "dist" subfolder for the project:

    grunt build

The distributable can also be hosted at http://0.0.0.0:8000 with the following command:

    grunt server:dist

To build a distributable AND run a Web server instance that hosts it when it's done,
use the following command:

    grunt server:dist:build

