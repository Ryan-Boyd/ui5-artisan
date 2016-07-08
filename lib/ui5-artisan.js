(function() {
    var colors, fs, file, buffer;

    colors = require("colors");
    fs = require('fs');
    buffer = require('buffer');


    function controllerNS(buffer, nameSpace){
        return new Buffer(
            buffer.toString("utf8").replace("ui5nameSpace", nameSpace.replace(/\.+/g, "/").replace(/\"+/g, "") + "/controller/BaseController")
        );
    }

    function viewNS(buffer, nameSpace){
        return new Buffer(
            buffer.toString("utf8").replace("ui5nameSpace", nameSpace)
        );
    }

    function readWrite(writeDir, readDir, fileName, nameSpace, fileType){

        var nameSpace = typeof nameSpace !== 'undefined' ?  '"' + nameSpace + '"' : "";

        fs.readFile(readDir, function(err, fd) {

            if (err) {
                return console.error(err);
            }

            file = fileType(fd, nameSpace);

            //write file from project
            fs.writeFile(writeDir, file, function(err){

                if ( err ) {
                    return console.log(err);
                }

                console.log(fileName.cyan + " created!".cyan);
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
        var nameSpace = options.nameSpace.toString();
        var wrtdir = process.cwd() +"/"+ projectName +"/webapp/";

        checkDirectorySync(process.cwd() +"/"+ projectName);

        readWrite(wrtdir + "gulpfile.js", __dirname + "/stubs/bootstrap/gulpfile.js", "gulpfile.js", nameSpace, viewNS);
        readWrite(wrtdir + "package.json", __dirname + "/stubs/bootstrap/package.json", "package.json", nameSpace, viewNS);
        readWrite(wrtdir + "index.html", __dirname + "/stubs/bootstrap/index.html", "index.html", nameSpace, viewNS);
        readWrite(wrtdir + "Component.js", __dirname + "/stubs/bootstrap/Component.js", "Component.js", nameSpace, viewNS);
        readWrite(wrtdir + "manifest.json", __dirname + "/stubs/bootstrap/manifest.json", "manifest.json", nameSpace, viewNS);
        readWrite(wrtdir + "i18n/i18n.properties", __dirname + "/stubs/bootstrap/i18n.properties", "i18n.properties", nameSpace, viewNS);
        readWrite(wrtdir + "controller/BaseController.js", __dirname + "/stubs/bootstrap/BaseController.js", "BaseController.js", nameSpace, viewNS);
    }

    exports.controller = controller = function(options) {

        //Assign Controller Name
        var controllerName = "PlainController.controller.js";
        if (options && options.message && typeof options.message === 'string') {
            controllerName = options.message.toString() + ".controller.js";
        }
        try {
            fs.statSync(process.cwd() + "/controller");
        } catch(e) {
            fs.mkdirSync(process.cwd() + "/controller");
        }
        readWrite(process.cwd() + "/controller/" + controllerName, __dirname + "/stubs/controllers/PlainController.controller.js","Controller " + controllerName, options.nameSpace, controllerNS);

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

        try {
            fs.statSync(process.cwd() + "/view");
        } catch(e) {
            fs.mkdirSync(process.cwd() + "/view");
        }
        readWrite(process.cwd() + "/view/" + viewName, __dirname + "/stubs/views/PlainView" + type, "View " + viewName, options.nameSpace, viewNS);

    }

}).call(this);