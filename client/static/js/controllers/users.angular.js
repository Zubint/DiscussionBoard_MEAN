boardApp.controller("UsersController", function($scope, UserFactory, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];

    $scope.register= function(){
      console.log($scope.userName);
      UserFactory.register($scope.userName, function(response){
        // console.log("controller: ", $scope.userName);
        if(!response.status){
            //handle errors
            console.log("status from register", response);
            for(var idx=0; idx<response.errors.length; idx++){
              $scope.errorsArray.push(response.errors[idx]);
            }
        }else {
          $scope.sessionUser = response.sessionUser;
          // console.log($scope.sessionUser);
          $location.url("/topics");
        }
      })
    }

    $scope.logout = function(){
      UserFactory.logout(function(response){
        if(response.status){
          console.log("client controller - logout ", response.sessionUser)
          $scope.sessionUser = response.sessionUser
          $location.url("/")
        }else{
          $scope.errorsArray.push(response.errors);
        }
      })
    }

    UserFactory.getUser(function(user_info){
      // console.log("call to getUser in controller:" , user_info)
      $scope.sessionUser=user_info;
      console.log("sessionUser in controller: " , $scope.sessionUser.loggedIn);
      if(!$scope.sessionUser.loggedIn){
        console.log(" users.angular.js 40 ", $scope.sessionUser.loggedIn);
        $location.url("/users");
      }else {
        $location.url("/topics");
      }
    })
  })
