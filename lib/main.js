(function() {
    var cli, colors, err, pkg, program, args;

    program = require("commander");

    colors = require("colors");

    pkg = require("../package.json");

    cli = require("./ui5-artisan");

    program.version(pkg.version)
        .option("-c, --controller [name]", "set controller and/or name to be created.")
        .option("-v, --view [name] [type]", "set view and/or name to be created. specify type default is xml (js|xml)", "xml")
        .option("-b, --builder <f> [name] [type]", "create a custom view template, specify type default is xml (js|xml)", "xml");

    program.on("--help", function() {
        console.log("  Examples:");
        console.log("");
        console.log("    $ " + "ui5" + " --controller");
    });

    program.parse(process.argv);
    args = program.rawArgs;
    console.log(process.argv);
    if (process.argv.length === 2) {
        program.help();
    } else {
        try {
            if(args[2] === "-c" || args[2] === "--controller") {
                console.log("controller");
                cli.controller({
                    message: args[3] ? args[3] : ""
                });
            }
            else if(args[2] === "-v" || args[2] === "--view") {
                console.log("view");
                cli.view({
                    vName: args[3] ? args[3] : "",
                    vType: args[4] ? args[4] : ""
                });
            }
            else if(args[2] === "-b" || args[2] === "--builder"){
                console.log("builder");
                cli.viewParse({
                    vString: args[3] ? args[3] : "",
                    vName: args[4] ? args[4] : "",
                    vType: args[5] ? args[5] : ""
                });
            }
            else {
                console.log("command doesnt exist yet");
            }
        } catch (_error) {
            err = _error;
            console.log("[", "ui5".white, "]", err.toString().red);
        }
    }

}).call(this);