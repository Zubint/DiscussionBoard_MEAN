boardApp.controller("BoardsController", function($scope,
                                                  $routeParams, $location, UserFactory,
                                                  TopicFactory, BoardFactory){

// $scope.topicID = $routeParams.id;
  BoardFactory.getTopicById($routeParams.id, function(response){
    console.log("Congrats: you found it! ", response);
    if(response.status){
        $scope.topic = response.topic;
    }else {
      $scope.errorsArray = [];
      $scope.errorsArray = response.errors;
    }
  })

  $scope.addUpvotes=function(post){
    console.log(post);
    console.log("loggedin as: ", $scope.sessionUser.user_id, " | post id: ", post._userId._id)
    if($scope.sessionUser.user_id == post._userId._id){
      $scope.errorsArray = [];
      $scope.errorsArray.push("You can't upvote your own post!");
      console.log("you can't upvote your own comment")
    }else{
      BoardFactory.addUpvote(post, function(response){
        if(response.status){
          BoardFactory.getTopicById($routeParams.id, function(response){
            // console.log("Congrats: you found it! ", response);
            if(response.status){
                $scope.topic = response.topic;
            }else {
              $scope.errorsArray = [];
              $scope.errorsArray = response.errors;
            }
          })
        }else {
          console.log(response.errorArray)
        }
      })
    }
  }

  $scope.addDownvotes = function(post){

    if($scope.sessionUser.user_id == post._userId._id){
      $scope.errorsArray=[];
      $scope.errorsArray.push("You cannot down vote your own post! (Don't be so hard on yourself!)");
    }else {
      BoardFactory.addDownvotes(post, function(response){
        if(response.status){
          BoardFactory.getTopicById($routeParams.id, function(response){
            // console.log("Congrats: you found it! ", response);
            if(response.status){
                $scope.topic = response.topic;
            }else {
              $scope.errorsArray = [];
              $scope.errorsArray = response.errors;
            }
          })
        }else{
          $scope.errorsArray = [];
          $scope.errorsArray.push (response.errors);
        }
      })
    }

  }
  $scope.createPost=function(topicId){
    if($scope.newPost !=undefined){
      $scope.newPost._topicId = $scope.topic._id,
      $scope.newPost._userId = $scope.sessionUser.user_id
    }
    console.log($scope.newPost);
    BoardFactory.createPost($scope.newPost, function(response){
      console.log(response, "in controller");
      // console.log(response.topic);
      if(response.status){
        console.log(response.status);

        BoardFactory.getTopicById($routeParams.id, function(response){
          console.log("Congrats: you found it! ", response);
          if(response.status){
              $scope.topic = response.topic;
          }else {
            $scope.errorsArray = [];
            $scope.errorsArray = response.errors;
          }
        })
      }
    })
    $scope.newPost = {};
  }

  $scope.createComment=function(post, newComment){
    console.log($scope);
    // console.log($scope.topic._postId[index].newComment, "new comment") //form data
    // console.log($scope.topic._postId[index]); //post information
      // BoardFactory.createComment($scope.topic._postId[index].newComment[index],
        // BoardFactory.createComment($scope.post[index].newComment,
        console.log(post, "-post");

        // newComment, postDetails, userId, callback
        BoardFactory.createComment(
                                // $scope.topic._postId[index], $scope.sessionUser.user_id,
                                post, $scope.sessionUser.user_id,
                                function(response){
                                  // console.log(response);
                                  if(response.status){
                                    BoardFactory.getTopicById($routeParams.id, function(response){
                                      if (response.status){
                                        $scope.topic=response.topic
                                      }
                                    })
                                  }
                                })
  }

  UserFactory.getUser(function(user_info){
    $scope.sessionUser=user_info;
    console.log($scope.sessionUser.loggedin);
    if(!$scope.sessionUser.loggedIn){
      $location.url("/users");
    }else {
      // $location.url("/board");
    }
  })

  $scope.logout=function(){
    UserFactory.logout(function(response){
      if(!response.status){
        $location.url("/users")
      }
    })
  }

  //add code above
})
