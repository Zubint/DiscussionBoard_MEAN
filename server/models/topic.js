var TopicSchema = new mongoose.Schema({
  topic:{type:String,
    required:[true, "You must include a topic title"],
    minlength:[4, "Titles must be longer than 4 characters"]},
  description:{type:String,
              required:[true, "You must include a description"]},
  category:{type:String, required:[true, "You must include a category"]},
  _userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  _postId:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}]

}, {timestamps:true});


mongoose.model("Topic", TopicSchema);
