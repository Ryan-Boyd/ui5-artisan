sap.ui.define([
    "ui5nameSpace/controller/BaseController"
], function(BaseController){
    "use strict";

    return BaseController.extend("nameSpace.controller.projectName", {
        onInit: function() {

        },

        /**
         * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
         * (NOT before the first rendering! onInit() is used for that one!).
         * @memberOf products.Product
         */
		onBeforeRendering: function() {

		},

        /**
         * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
         * This hook is the same one that SAPUI5 controls get after being rendered.
         * @memberOf products.Product
         */

        onAfterRendering: function() {

        },

        /**
         * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
         * @memberOf products.Product
         */
		onExit: function() {

		}
    });
});