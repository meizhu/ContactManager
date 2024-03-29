ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
    var findStorageKey = function(entity) {
        if(entity.urlRoot){
            return _.result(entity, "urlRoot");
        }
        if(entity.url){
            return _.result( entity, "url");
        }
        if(entity.collection && entity.collection.url){
            return _.result(entity.collection, "url");
        }
        throw new Error("Unable to determine storage key");
    }
      var StorageMixin =function(entityPrototype){
          return {
              localStorage: new Backbone.LocalStorage(findStorageKey(entityPrototype))
          } ;
      };
       Entities.configureStorage = function(entity){
           _.extend(entity.prototype, new StorageMixin(entity.prototype));
       }
});
