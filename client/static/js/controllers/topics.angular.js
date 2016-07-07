boardApp.controller("TopicsController", function($scope, $location, UserFactory, TopicFactory){

  UserFactory.getUser(function(user_info){
    $scope.sessionUser=user_info;
    console.log($scope.sessionUser.loggedIn, " topics controller");
    if(!$scope.sessionUser.loggedIn){
      $location.url("/users");
    }else {
      $location.url("/topics");
    }
  })

    $scope.errorsArray = [];
    $scope.sortProperty = '';
    $scope.sortProperty = 'category';
    $scope.reverse = true;

    $scope.sortBy = function(sortProperty) {
      console.log(sortProperty);
      $scope.reverse = ($scope.sortProperty === sortProperty) ? !$scope.reverse : false;
      // console.log("**********************************************");
      // console.log($scope.sortProperty === sortProperty);
      // console.log(!$scope.reverse);
      // console.log("**********************************************");
      $scope.sortProperty = sortProperty;
    };


  TopicFactory.index(function(topics){
    $scope.topics=topics.topics
    console.log($scope);
  });


  $scope.createTopic = function(){
    $scope.errorsArray=[]; //in case you already had an error previously
    if($scope.newTopic != undefined){
      $scope.newTopic._userId = $scope.sessionUser.user_id;
    }
    console.log($scope.newTopic);
    TopicFactory.createTopic($scope.newTopic, function(response){
      if(response.status){
        //this is ok
        $scope.topics = response.topics;
        // $scope.name=$scope.topics._userId.name;
        $scope.newTopic={};
      }else {
        //show errors
        // alert("errors: ", response);
        $scope.errorsArray = response.errors;
      }
    });
  }


  $scope.logout = function(){
    console.log("topics.logout")
    UserFactory.logout(function(response){
      console.log(response, " log out in topics controller");
        if(!response.loggedIn){
          $location.url("/users");
        }else {
          //nothing
        }
    })
  }




})
