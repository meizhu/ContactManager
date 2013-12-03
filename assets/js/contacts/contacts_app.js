/**
 * This is Route Controller
 */
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "contacts": "listContacts",
            "contacts/:id": "showContact",
            "contacts/:id/edit": "editContact"
        }
    });

    var API = {
        editContact: function(id) {
            ContactsApp.Edit.Controller.editContact(id);
        },
        listContacts: function(){
           ContactsApp.List.Controller.listContacts();
        },
        showContact: function(id){
            ContactsApp.Show.Controller.showContact (id);
        }
    };

    ContactManager.addInitializer(function (){
        new ContactsApp.Router({
            controller: API
        });
    });

    ContactManager.on("contact:edit", function(id){
        ContactManager.navigate("contacts/" + id + "/edit");
        API.editContact(id);
    });
    ContactManager.on("contacts:list", function(){
        ContactManager.navigate("contacts");
        API.listContacts();
      });
    ContactManager.on("contact:show", function(id){
        ContactManager.navigate("contacts/" + id);
        API.showContact(id);
    });
});
