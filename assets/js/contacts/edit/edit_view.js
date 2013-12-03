/**
 * View for contact edit
 */
ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
   Edit.Contact = Marionette.ItemView.extend({
       template: "#contact-form",
       events: {
          "click button.js-submit": "submitClicked"
       },
       submitClicked: function(e) {
           e.preventDefault();
           var data = Backbone.Syphon.serialize(this);
           this.trigger("form:submit", data);
       },
       onFormDataInvalid: function(errors){
           console.log("invalid form data", errors);
           var self = this;
           var $view = this.$el;
           var clearFormError = function() {
             var $form = $view.find("form");
               $form.find(".help-inline.error").each(function(){
                   $(this).remove();
               });
               $form.find(".control-group.error").each(function(){
                   $(this).removeClass("error");
               })
           };
           var markErrors = function(value, key){
               var $controlGroup = self.$el.find("#contact-" + key).parent();
               var $errorEl = $("<span>", {class: "help-inline error", text:value});
               $controlGroup.append($errorEl).addClass("error");
           };
           clearFormError();
           _.each(errors, markErrors);
       }
   })
});
