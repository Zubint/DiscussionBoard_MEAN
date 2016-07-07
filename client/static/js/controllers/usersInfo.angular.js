boardApp.controller("usersInfo", function($scope, $location, $routeParams, UserFactory){


    //catch routeParams here and pass them on to the
    //factory

    UserFactory.getUser(function(user_info){
      $scope.sessionUser=user_info;

      console.log($scope.sessionUser, "usersInfo");
      if(!$scope.sessionUser.loggedIn){
        $location.url("/users");
      }else {
        // $location.url("/userInfo");
      }
    })


    UserFactory.getUserById($routeParams.id, function(response){
      if(response.status){
        //all is well
        $scope.UserInfo;

        $scope.UserInfo=response;
        console.log($scope.UserInfo)
        console.log($scope)
        console.log(response, "users info from server")
      }else {
        //error = handle them
        console.log(response, "errum.")
      }
    })



})
