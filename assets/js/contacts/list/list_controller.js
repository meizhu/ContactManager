
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
    List.Controller = {
        listContacts: function() {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);

            var fetchingContacts = ContactManager.request("contact:entities");
            $.when(fetchingContacts).done(function(contacts){
                var   contactsListView = new List.Contacts({
                    collection: contacts
                });

                contactsListView.on("itemview:contact:delete", function(childView, model){
                    contacts.remove(model);
                });
                contactsListView.on("itemview:contact:show", function(childView, model){
                    var idValue =  model.get("id");
                    ContactManager.trigger("contact:show", idValue);

                });
                ContactManager.mainRegion.show(contactsListView);

            });



        }

    }
});

