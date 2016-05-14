(function() {
    var colors, fs, file;

    colors = require("colors");
    fs = require('fs');

    function readWrite(writeDir, readDir, fileName){
        fs.readFile(readDir, function(err, fd) {
            if (err) {
                return console.error(err);
            }
            file = fd;

            //write file from project
            fs.writeFile(writeDir, file, function(err){
                if ( err ) {
                    return console.log(err);
                }
                console.log(fileName.cyan + " created!");
            });
        });
    }

    function checkDirectorySync(directory) {
        try {
            fs.statSync(directory);
        } catch(e) {
            fs.mkdirSync(directory);
            fs.mkdirSync(directory + "/webapp");
            fs.mkdirSync(directory + "/webapp/i18n");
        }
    }

    exports.scaffold = scaffold = function(options) {
        var projectName = options.project.toString();
        var wrtdir = process.cwd() +"/"+ projectName +"/webapp/";

        checkDirectorySync(process.cwd() +"/"+ projectName);

        readWrite(wrtdir + "index.html", __dirname + "/stubs/bootstrap/index.html", "index.html");
        readWrite(wrtdir + "Component.js", __dirname + "/stubs/bootstrap/Component.js", "Component.js");
        readWrite(wrtdir + "manifest.json", __dirname + "/stubs/bootstrap/manifest.json", "manifest.json");
        readWrite(wrtdir + "i18n/i18n.properties", __dirname + "/stubs/bootstrap/i18n.properties", "i18n.properties");
    }

    exports.controller = controller = function(options) {

        //Assign Controller Name
        var controllerName = "PlainController.controller.js";
        if (options && options.message && typeof options.message === 'string') {
            controllerName = options.message.toString() + ".controller.js";
        }
        readWrite(process.cwd() + "/" + controllerName, __dirname + "/stubs/controllers/PlainController.controller.js","Controller Called " + controllerName);

    }

    exports.view = view = function(options) {
        var viewName,
            type =".view.xml";
        //Assign Controller Type
        if (options.vType.toString() === 'js' || options.vName.toString() === 'js') {
            type = ".view.js";
        }

        //Assign Controller Name
        viewName = "PlainView" + type;
        if (options.vName !== 'xml' && options.vName !== 'js' && options.vName !== '') {
            viewName = options.vName.toString() + type;
        }

        readWrite(process.cwd() + "/" + viewName, __dirname + "/stubs/views/PlainView" + type, "View Called " + viewName);

    }

}).call(this);