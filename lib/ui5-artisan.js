(function() {
    var colors, pkg, print, fs, file;

    colors = require("colors");
    pkg = require("../package.json");
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

    function checkDirectorySync(directory, projectName) {
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

        checkDirectorySync(process.cwd() +"/"+ projectName, projectName);

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
        readWrite(process.cwd() + "/" + controllerName, __dirname + "/stubs/controllers/PlainController.js","Controller Called " + controllerName);

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

    exports.viewParse = viewParse = function(options){

        var viewName,
            fileAppend,
            j,
            str = options.vString.toString(),
            type = ".view.xml";

        //no support for js yet
        if (options.vType.toString() === 'js' || options.vName.toString() === 'js') {
            //type = ".js";
            type = ".view.xml";
        }
        else {
            fileAppend = fs.readFileSync(__dirname + "/stubs/views/PlainViewBegin" + type, "utf8");
        }

        viewName = "PlainView" + type;
        if (options.vName !== 'xml' && options.vName !== 'js' && options.vName !== '') {
            viewName = process.cwd() + "/" + options.vName.toString() + type;
        }
        fs.writeFileSync(viewName, fileAppend);

        for (var i = 0; i < str.length; i++) {
            //object check
            if (str[i] === '-' || str[i] === ']'  || str[i] === '[') {
                console.log("pass" + i);
                continue;
            }
            else if (str[i] === 'o') {
                if (str[i + 1] === 'h') {
                    i++;
                    fileAppend = fs.readFileSync(__dirname + "/stubs/xml/ObjectHeader" + type, "utf8");
                    fs.appendFileSync(viewName, fileAppend);
                }
            }

            else if (str[i] === 'l') {
                fileAppend = fs.readFileSync(__dirname + "/stubs/xml/LabelInputPair" + type, 'utf8');
                j = 1*str[i + 1];
                while (j > 0){
                    fs.appendFileSync(viewName, fileAppend);
                    j--;
                }
                i++;
            }

            else if (str[i] === 'x') {
                fileAppend = fs.readFileSync(__dirname + "/stubs/xml/CheckBox" + type, 'utf8');
                j = 1*str[i + 1];
                while (j > 0){
                    fs.appendFileSync(viewName, fileAppend);
                    j--;
                }
                i++;
            }

            else if (str[i] === 'b') {
                fileAppend = fs.readFileSync(__dirname + "/stubs/xml/Button" + type, 'utf8');
                j = 1*str[i + 1];
                while (j > 0){
                    fs.appendFileSync(viewName, fileAppend);
                    j--;
                }
                i++;
            }

            else if (str[i] === 's') {
                if (str[i + 1] === 'f') {
                    i++;
                    fileAppend = fs.readFileSync(__dirname + "/stubs/xml/forms/SimpleFormBegin" + type, 'utf8');
                    fs.appendFileSync(viewName, fileAppend);

                    //aggregation check
                    if (str[i + 1] === 'l') {
                        i++;
                        fileAppend = fs.readFileSync(__dirname + "/stubs/xml/LabelInputPair" + type, 'utf8');
                        j = 1*str[i + 1];
                        while (j > 0){
                            fs.appendFileSync(viewName, fileAppend);
                            j--;
                        }
                        i++;
                    }

                    if(str[i + 1] === 'x'){
                        i++;
                        fileAppend = fs.readFileSync(__dirname + "/stubs/xml/CheckBox" + type, 'utf8');
                        j = 1*str[i + 1];
                        while (j > 0){
                            fs.appendFileSync(viewName, fileAppend);
                            j--;
                        }
                        i++;
                    }

                    if(str[i + 1] === 'b'){
                        i++;
                        fileAppend = fs.readFileSync(__dirname + "/stubs/xml/Button" + type, 'utf8');
                        j = 1*str[i + 1];
                        while (j > 0){
                            fs.appendFileSync(viewName, fileAppend);
                            j--;
                        }
                        i++;
                    }

                    fileAppend = fs.readFileSync(__dirname + "/stubs/xml/forms/SimpleFormEnd" + type, 'utf8');
                    fs.appendFileSync(viewName, fileAppend);
                }
            }
            else {
                console.log("Improper Syntax --Refer to docs");
                break;
            }
        }
        fileAppend = fs.readFileSync(__dirname + "/stubs/views/PlainViewEnd" + type, 'utf8');
        fs.appendFileSync(viewName, fileAppend);
    }

}).call(this);

//for tables
/*else if (str[i] === 't') {
 if(str[i + 1] === 'ui'){
 i++;
 console.log("Add sap.m.table" + i);
 //switch(str[i + 1]){}
 }
 else if(str[i + 1] === 'm') {
 i++;
 console.log("Add sap.m.table" + i);
 //switch(str[i + 1]){}
 }
 else if(str[i + 1] === '-' || str[i + 1] === ']') {
 i++;
 console.log("Add sap.m.table" + i);
 continue;
 }

 }*/