var Topic = mongoose.model("Topic");
var Post = mongoose.model("Post");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");


module.exports=(function(){
  return{

    addUpvote: function(req, res){
        console.log("in upvotes");
        console.log(req.body);
        Post.findOneAndUpdate({_id:req.body._id}, { $inc: { upvotes: 1 }}, {upsert:true}, function(err, update){
          if(err){
            console.log(err)
          }else {
            res.json({status:true, upvote:update});
          }

        })
    },

    addDownvote: function (req, res){
      console.log("in downvotes");

      Post.findOneAndUpdate({_id:req.body._id}, {$inc: {downvotes: 1}}, function(err, update){
        if(err){
            var errorArray = [];

          for(var i in err.errors){
            errorArray.push(err.errors[i].message)
          }
          res.json({status: false, errors:errorArray});
        }else{
          res.json({status: true, downvotes:update});
        }
      })
    },
    getTopicById:function (req, res){
      console.log("req.params" , req.params.id);
      Topic.findOne({_id:req.params.id})
      .populate("_userId")
      .populate("_postId")
      .exec(function(err, topicsPosts){
        if(err){
          res.json({status:false, error:"Unkown server error occured.  Sorry =("})
        }else {
            // console.log(topicsPosts, "before populating comments");
            Comment.populate(topicsPosts, {path:"_postId._commentId", model:"Comment"},
                            function(err, postComms){
                                    if(err){
                                      console.log(err)
                                    }else
                                    {
                                      // console.log(postComms, "comms");
                                      // res.json({status:true, topic:postComms});

                                      //now add in the user names

                                      User.populate(postComms,
                                        {path: "_postId._userId", model:"User"}, function(err, postUsers){
                                          if(err){
                                            console.log(err);
                                          }else{

                                            User.populate(postUsers, {path:"_postId._commentId._userId", model:"User"}, function(err, finalData){
                                              res.json({status: true, topic:finalData});
                                            })
                                            };
                                        })
                                    }
                                  })
        }
      })
    },

    createPost:function(req, res){
      console.log(req.body);

      var newPost = new Post({
          answer: req.body.comment,
          _topicId: req.body._topicId,
          _userId: req.body._userId
      })

      console.log("new post: " , newPost);

      Topic.findOne({_id:req.body._topicId}, function(err, topic){
          // console.log("topic found: ", topic);

          newPost.save(function(err){
            topic._postId.push(newPost._id);
            topic.save(function(err){
                if(err){
                  var erroryArray = [];
                  for(var i in err.errors){
                    erroryArray.push(err.errors[i].message);
                  }
                  res.json({status:false, errors:errorArray});
                }else {
                  User.findOne({_id:req.body._userId}, function(err, user){
                    if (err){
                      console.log(err);
                    }else {
                      user._postId.push(newPost);
                      user.save(function(err){
                        if(err){
                          var erroryArray=[];
                          for(var i in err.errors){
                            errorArray.push(err.errors[i].message)
                          }
                          res.json({status:false, errors:errorArray})
                        }
                      })
                    }
                  })
                  res.json({status:true, newPost:newPost} )

///to here
                }
          })
        }) //some error from
      })
    },

    createComment:function(req, res){

        console.log(req.body, " req body in createComment");

        // you need to update the User table
        // and also the Post table
        // and also the comment table

        var newComment = new Comment({
          comment:req.body.comment,
          _userId:req.body._userId,
          _postId:req.body._postId});

        Post.findOne({_id:req.body._postId}, function(err, post){
          if(err){
            var errorsArray = [];
            for (var i in err.errors){
              errorsArray.push(err.errors[i].message)
            }
            res.json({status:false, errorArray:errorsArray})
            console.log(err)
          }else {
            //this is the post, you'll need to save the id for the comment here
            newComment.save(function(err){
                post._commentId.push(newComment);
                post.save(function(err, post){
                  if(err){
                    //handle errors
                  }else {
                    User.findOne({_id:req.body._userId}, function(err, user){
                      if(err){
                        //handle errors
                      }else {
                        user._commentId.push(newComment);
                        user.save(function(err, user){
                          if(err){
                            console.log(err)
                          }else {
                            //you are now finished
                            console.log("saved comment")
                            res.json({status:true, topics:"topics"})
                          }
                        })
                      }
                    })
                  }
                })
            })
          }
        })
    }
    //add code above
  }
})();
