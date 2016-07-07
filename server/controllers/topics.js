var Topic = mongoose.model("Topic");
var User = mongoose.model("User");

module.exports = (function(){
return{

      index: function(req, res){
        Topic.find({})
        .populate("_userId")
        .populate("_postId")
        .exec(function(err, topics){
          if(err){
            console.log(err);
          }else {
              // console.log(topics);
            res.json({status:true, topics:topics})

          }
        })
      },

      create: function(req, res){
        // console.log(req.body.user_id);
        var newTopic = new Topic({
          topic: req.body.title,
          description: req.body.description,
          category: req.body.category,
          _userId: req.body._userId,
        })
        // console.log(newTopic);
        //update the user table with topic ID
        //when you create a new topic

        User.findOne({_id:req.body._userId}, function(err, user){
            newTopic.save(function(err){
              user._topicId.push(newTopic);
              user.save(function(err){
                if(err){
                  //error handling here
                  console.log(err);
                      var errorArray = [];
                      for (var i in err.errors){
                        errorArray.push(err.errors[i].message)
                      }
                      res.json({status:false, errors:errorArray})
                }else{
                  res.redirect("/topics");
                }
              })
            })//end of newTopic.save


        })

      }

//add methods above.
}

})();
