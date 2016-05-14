(function() {
    var cli, colors, err, pkg, program, args;

    program = require("commander");

    colors = require("colors");

    pkg = require("../package.json");

    cli = require("./ui5-artisan");

    program.version(pkg.version)
        .option("-s, --scaffold <project name>", "create a new UI5 Project")
        .option("-v, --view [name] [type]", "make view. specify file type. default=xml (js|xml)", "xml")
        .option("-c, --controller [name]", "make controller")
        .option("-vc, --viewController [name] [type]", "make view and controller. specify type default is xml (js|xml)", "xml")
        .option("-b, --builder <template engine> [name]", "create a custom xml view template");

    /*program.on("--help", function() {
        console.log("  Examples:");
        console.log("");
        console.log("    $ " + "ui5" + " --controller");
    });*/

    program.parse(process.argv);
    args = program.rawArgs;
    if (process.argv.length === 2) {
        program.help();
    } else {
        try {
            if(args[2] === "-s" || args[2] === "--scaffold") {
                cli.controller({
                    message: args[3] ? args[3] : ""
                });
            }
            else if(args[2] === "-c" || args[2] === "--controller") {
                cli.controller({
                    message: args[3] ? args[3] : ""
                });
            }
            else if(args[2] === "-v" || args[2] === "--view") {
                cli.view({
                    vName: args[3] ? args[3] : "",
                    vType: args[4] ? args[4] : ""
                });
            }
            else if(args[2] === "-b" || args[2] === "--builder"){
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