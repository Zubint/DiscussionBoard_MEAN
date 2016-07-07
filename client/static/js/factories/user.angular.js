boardApp.factory("UserFactory", function($http){
  var factory={};

  sessionUser={loggedIn:false};

    factory.getSession = function(){
      console.log("get session");
      $http.get('/session').success(function(response){
      if(response.status){
        console.log(response)
        sessionUser = response.sessionUser;
        console.log("factory getSession:", sessionUser);
      }else{
        console.log('session is not set');
      }
    })
  }
    factory.getSession();

    factory.getUser=function(callback){
      console.log(sessionUser, "in factory.getUser")
      callback(sessionUser);
      console.log("get user");
    }

    factory.getUserById = function(userId, callback){
      $http.get("/users/"+userId).success(function(response){
        callback(response)
      })
    }

  factory.register=function(user, callback){
    // console.log("factoryindex ", user)
    $http.post("/users", user).success(function(response){
      if(response.status){
        sessionUser=response.sessionUser;
      }
        callback(response);
      // console.log(response);
    })
  }

  factory.logout=function(callback){
    console.log("user.angular.js 44");
    $http.get("/logout").success(function(response){
      console.log(response, " **************************logout");
      if(response.status){
        console.log("factory logout response status: " , response.status, response.sessionUser);
        sessionUser = response.sessionUser;
        // console.log("factory session user", sessionUser);
        callback(response.sessionUser);
      }else{
        console.log(response, "user.angular.js 52");
        callback(response);
      }

    });
  }

  //add more methods above

return factory;
})
