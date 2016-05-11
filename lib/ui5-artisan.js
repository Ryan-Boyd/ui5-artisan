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
        fs.readFile(__dirname + "/ui5/controllers/PlainController.js", function(err, fd) {
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

    /*exports.print = print = function(options) {
        if (options && options.message && typeof options.message === 'string') {
            return console.log(options.message.toString().cyan);
        } else {
            throw new Error('no message defined to print!');
        }
    };*/

}).call(this);

//function copyFile