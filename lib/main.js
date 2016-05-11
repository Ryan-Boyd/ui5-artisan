(function() {
    var cli, colors, err, pkg, program;

    program = require("commander");

    colors = require("colors");

    pkg = require("../package.json");

    cli = require("./ui5-artisan");

    program.version(pkg.version).option("-c, --controller [name]", "set controller to be created.");

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
            cli.controller({
                message: program.controller
            });
        } catch (_error) {
            err = _error;
            console.log("[", "node-cli-boilerplate".white, "]", err.toString().red);
        }
    }

}).call(this);