sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";
    return Controller.extend("ui5nameSpace/controller/BaseController", {

         /** GETTERS **/

        getRouter : function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        getId : function(sId){
            var oId = this.getView().byId(sId);
            if (oId){
                return oId;
            }
            return sap.ui.getCore().byId(sId);
        },

        getGlobalModel : function(){
            return sap.ui.getCore().getModel();
        },

        getViewModel : function(){
            return this.getView().getModel();
        },

        getViewModelData : function(data){
            data = data || 0;
            if (data){
                return this.getViewModel().getData()[data];
            }
            return this.getViewModel().getData();
        },

        getGlobalModelData : function(data){
            data = data || 0;
            if (data){
                return this.getGlobalModel().getData()[data];
            }
            return this.getGlobalModel().getData();
        },

        /** SETTERS **/

        setViewModel : function(oModel){
            this.getView().setModel(oModel);
        },

        setGlobalModel : function(oModel){
            sap.ui.getCore().setModel(oModel);
        },

         /** COMMON FUNCTIONS **/

        onNavBack: function (oEvent) {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("appHome", {}, true);
            }
        }
    });
});