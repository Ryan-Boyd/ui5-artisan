(function() {
    var colors, pkg, print, fs;
    colors = require("colors");
    pkg = require("../package.json");
    fs = require('fs');

    exports.controller = controller = function(options) {
        var controllerName, readFile;

        //Assign Controller Name
        controllerName = "PlainController.js";
        if (options && options.message && typeof options.message === 'string') {
            controllerName = options.message.toString() + ".js";
        }

        //get controller template file
        fs.readFile(__dirname + "/stubs/controllers/PlainController.js", function(err, fd) {
            if (err) {
                return console.error(err);
            }
            readFile = fd;

            //write controller template file to current directory
            fs.writeFile(process.cwd() + "/" + controllerName, readFile, function(err){
                if ( err ) {
                    return console.log(err);
                }
                console.log("Controller Called " + controllerName.cyan + " created!");
            });
        });

    }

    exports.view = view = function(options) {
        var viewName, readFile, type;
        type =".xml";
        //Assign Controller Type
        if (options.vType.toString() === 'js' || options.vName.toString() === 'js') {
            type = ".js";
        }

        //Assign Controller Name
        viewName = "PlainView" + type;
        if (options.vName !== 'xml' && options.vName !== 'js' && typeof options.vName === 'string') {
            viewName = options.vName.toString() + type;
        }

        //get controller template file
       fs.readFile(__dirname + "/stubs/views/PlainView" + type, function(err, fd) {
            if (err) {
                return console.error(err);
            }
            readFile = fd;

            //write controller template file to current directory
            fs.writeFile(process.cwd() + "/" + viewName, readFile, function(err){
                if ( err ) {
                    return console.log(err);
                }
                console.log("View Called " + viewName.cyan + " created!");
            });
        });

    }

    /*exports.print = print = function(options) {
        if (options && options.message && typeof options.message === 'string') {
            return console.log(options.message.toString().cyan);
        } else {
            throw new Error('no message defined to print!');
        }
    };*/

}).call(this);

//function copyFile