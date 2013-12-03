/**
 * Created with JetBrains WebStorm.
 * User: mzhu
 * Date: 11/28/13
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
   List.Contact = Marionette.ItemView.extend(
       {
           tagName: "tr",
           template: "#contact-item",
           events: {
               "click": "highlightName",
               "click button.js-delete": "deleteRow",
               "click td a.js-show": "showClicked",
               "click td a.js-edit": "editClicked"
           },
           showClicked: function(e){
               e.preventDefault();
               e.stopPropagation();
               this.trigger("contact:show", this.model);
           },
           deleteRow: function(e){
               e.stopPropagation();
               this.trigger("contact:delete", this.model);
              // this.model.collection.remove(this.model);

           },
           editClicked: function(e){
               e.preventDefault();
               e.stopPropagation();
               this.trigger("contact:edit", this.model);
           },
           highlightName: function(e) {
               e.preventDefault();
               this.$el.toggleClass("warning");
           },
           remove: function() {
               var self = this;
               this.$el.fadeOut(function(){
                   Marionette.ItemView.prototype.remove.call(self);
               });
           }
       }
   );
   List.Contacts = Marionette.CompositeView.extend( {
            tagName: "table",
           template: "#contact-list",
            className: "table table-hover",
            itemView: List.Contact,
            itemViewContainer: "tbody",
           onItemviewContactDelete: function(){
               this.$el.fadeOut(1000, function(){
                  $(this).fadeIn(1000);
               });
           }
        }
    ) ;
});

