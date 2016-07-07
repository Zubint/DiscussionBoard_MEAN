boardApp.factory("TopicFactory", function($http){
    var factory={};

    factory.index = function(callback){
      $http.get("/topics").success(function(response){
        callback(response);
      })
    }

    factory.createTopic = function(topic, callback){
      $http.post("/topics", topic).success(function(response){
        callback(response);
      })
    }


return factory;
})
