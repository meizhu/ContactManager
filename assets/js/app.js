/**
 * Created with JetBrains WebStorm.
 * User: mzhu
 * Date: 11/28/13
 * Time: 9:34 PM
 * To change this template use File | Settings | File Templates.
 */
var ContactManager = new Marionette.Application();
ContactManager.addRegions({
    mainRegion: "#main-region"
});
ContactManager.navigate = function(route, options){
    options || (options={});
    Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function(){
    return Backbone.history.fragment;
} ;

ContactManager.on("initialize:after", function(){
    if(Backbone.history){
        Backbone.history.start();
        if(this.getCurrentRoute()===""){
            this.trigger("contacts:list");
        }
    }

});
