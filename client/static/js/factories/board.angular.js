boardApp.factory("BoardFactory", function($http){
  var factory={};

  factory.getTopicById=function(topicId, callback){
    console.log("factory - topic id", topicId);
    $http.get("/board/"+topicId).success(function(response){
      if(response){
        //this is ok, you'll have data
        callback(response);
        console.log(response)
      }else {
        //these are errors
        console.log(response);
      }
    })
  },

  factory.addDownvotes=function(post, callback){
    $http.post("/board/addDownvotes", post).success(function(response){
          callback(response);
  })
}

  factory.addUpvote=function(post, callback){
    $http.post("/board/addUpvote", post).success(function(response){
      if(response.status){
        callback(response);
      }else{
        console.log(response);
      }
    })
  },

  factory.createPost=function(post, callback){
    console.log(post, " in factory");
    $http.post("/board/createPost", post).success(function(response){
      if(response.status){
        console.log(response, " response in factory");
        callback(response);
      }else {
        //errors.
      }
    })//end of http.post request

  },

  // factory.createComment=function(newComment, postDetails, userId, callback){
  factory.createComment=function(post, userId, callback){
    console.log(newComment, "new comment");
    // console.log(postDetails, "postDetails");

    var newComment = ({
      comment: post.newComment,
      _userId: userId,
      _postId: post._id
    })
    console.log(newComment);

    //ship this off to the back end
    $http.post("/board/createComment", newComment).success(function(response){
      if(response.status){
        callback(response);
      }else {
        console.log(response);
      }
    })


  }

  //add new methods above
  return factory;
})
