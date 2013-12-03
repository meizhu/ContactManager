/**
 * Created with JetBrains WebStorm.
 * User: mzhu
 * Date: 11/28/13
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */
ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts",
        validate: function(attrs, options){
            var errors = {};
            if(!attrs.firstName){
                errors.firstName ="can't be blank";
            }
            if(!attrs.lastName){
                errors.lastName="can't be blank";
            }else{
                if(attrs.lastName.length <2){
                    errors.lastName="is too short";
                }
            }

            if(!_.isEmpty(errors)){
                return errors;
            }
        }
    });
    Entities.configureStorage(Entities.Contact);
    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: Entities.Contact,
        comparator: function(contact) {
            return contact.get("firstName") + " " + contact.get("lastName");
        }
    });
    Entities.configureStorage(Entities.ContactCollection);

    var initContacts = function() {
       var contacts = new Entities.ContactCollection([
            { id: 1, firstName: "Mei", lastName: "Zhu", phoneNumber: "555-234324"},
        {  id: 2, firstName: "Alice", lastName: "Brten", phoneNumber: "555-234324"},
        {  id: 3, firstName: "Alice", lastName: "Arten", phoneNumber: "555-234324"},
        {  id: 4, firstName: "Bob", lastName: "Seaton", phoneNumber: "555-334324"},
        {  id: 5, firstName: "James", lastName: "Wang", phoneNumber: "455-234324"},
        {  id: 6, firstName: "Brian", lastName: "Alex", phoneNumber: "2555-234324"},
        {  id: 7, firstName: "Ross", lastName: "Martin", phoneNumber: "355-234324"},
            {  id: 8, firstName: "Jazzy", lastName: "Martin", phoneNumber: "355-234324"}
    ]);
        contacts.forEach(function(contact){
            contact.save();
        });
        return contacts.models;
    };

    var API = {
        getContactEntities: function() {
            var contacts = new Entities.ContactCollection();
            var defer = $.Deferred();
            setTimeout(function() {
                contacts.fetch({
                    success: function(data){
                        defer.resolve(data);
                    }
            })
            }, 1000);
            var promise = defer.promise();
            $.when(promise).done(function(contacts){
               if(contacts.length === 0){
                     var models =initContacts();
                   contacts.reset();
               }
            });

            return promise;
        },
        getContactEntity: function(contactId){
            var contact = new Entities.Contact({id: contactId});
            var defer = $.Deferred();
            setTimeout(function(){
                   contact.fetch({
                       success: function(data){
                           defer.resolve(data);
                       },
                       error: function(data){
                           defer.resolve(undefined);
                       }
                   });
            }, 2000)


            return defer.promise();
        }

    };

    ContactManager.reqres.setHandler("contact:entities", function() {
        return API.getContactEntities();
    })
    ContactManager.reqres.setHandler("contact:entity", function(id) {
        return API.getContactEntity(id);
    })

});
