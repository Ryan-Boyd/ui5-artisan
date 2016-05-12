(function() {
    var cli, colors, err, pkg, program;

    program = require("commander");

    colors = require("colors");

    pkg = require("../package.json");

    cli = require("./ui5-artisan");

    program.version(pkg.version)
        .option("-c, --controller [name]", "set controller to be created.")
        .option("-v, --view [name] [type]", "set view and name to be created. specify type default is xml (js|xml)", "xml");

    program.on("--help", function() {
        console.log("  Examples:");
        console.log("");
        console.log("    $ " + "ui5" + " --controller");
    });

    program.parse(process.argv);
    //if(program.controller){ cli.controller({message:program.cname});}
    if (process.argv.length === 2) {
        program.help();
    } else {
        try {
            if(program.controller) {
                cli.controller({
                    message: program.controller
                });
            }
            else if(program.view) {
                cli.view({
                    vName: program.view,
                    vType: program.args
                });
            }
        } catch (_error) {
            err = _error;
            console.log("[", "ui5".white, "]", err.toString().red);
        }
    }

}).call(this);