ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
        showContact: function(id) {
           var loadingView = new ContactManager.Common.Views.Loading({title:"Loading Contact", message: "Please wait while loading contact"});
            ContactManager.mainRegion.show(loadingView);

           var fetching = ContactManager.request("contact:entity", id);
            $.when(fetching).done(function(contact){
                var contactView;
                if(contact!== undefined){
                    contactView = new Show.Contact({
                        model: contact
                    });
                    contactView.on("contact:edit", function(contact){
                       ContactManager.trigger("contact:edit", contact.get("id"));
                    });
                } else{
                    contactView =Show.MissingContact();
                }
                    ContactManager.mainRegion.show(contactView);
            });

        }

    }
});

