(function() {
    var colors, fs, file;

    colors = require("colors");
    fs = require('fs');

    exports.engine = engine = function(options){

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

        //Need to rearrange control flow
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
