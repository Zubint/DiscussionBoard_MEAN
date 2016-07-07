var PostSchema = new mongoose.Schema({
  answer:{type:String, required:true, minlength:4},
  upvotes:{type:Number},
  downvotes:{type:Number},
  _userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
  _topicId:{type: mongoose.Schema.Types.ObjectId, ref:"Topic"},
  _commentId:[{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}]
}, {timestamps:true});

mongoose.model("Post", PostSchema);
