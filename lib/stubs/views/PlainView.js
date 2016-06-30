sap.ui.jsview(ui5nameSpace, {

    // define the (default) controller type for this View
    getControllerName: function() {
        return "my.own.controller";
    },

    // defines the UI of this View
    createContent: function(oController) {
        // button text is bound to Model, "press" action is bound to Controller's event handler
        return;
    }
});