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
        console.log(options);
        var viewName, file, type;
        type =".xml";
        //Assign Controller Type
        if (options.vType.toString() === 'js' || options.vName.toString() === 'js') {
            type = ".js";
        }

        //Assign Controller Name
        viewName = "PlainView" + type;
        if (options.vName !== 'xml' && options.vName !== 'js' && options.vName !== '') {
            viewName = options.vName.toString() + type;
        }

        //get controller template file
       fs.readFile(__dirname + "/stubs/views/PlainView" + type, function(err, fd) {
            if (err) {
                return console.error(err);
            }
            file = fd;

            //write controller template file to current directory
            fs.writeFile(process.cwd() + "/" + viewName, file, function(err){
                if ( err ) {
                    return console.log(err);
                }
                console.log("View Called " + viewName.cyan + " created!");
            });
        });

    }

    exports.viewParse = viewParse = function(options){

        var viewName,
            fileAppend,
            j,
            str = options.vString.toString(),
            type = ".xml";

        //no support for js yet
        if (options.vType.toString() === 'js' || options.vName.toString() === 'js') {
            //type = ".js";
            type = ".xml";
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