var CommentSchema = mongoose.Schema({
  comment:{type:String, required:true, minlength:4},
  _userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  _postId:{type:mongoose.Schema.Types.ObjectId, ref:"Post"}
}, {timestamps:true});

mongoose.model("Comment", CommentSchema);
// var autoPopulateUser = function(next){
//   this.populate(_userId);
//   next();
// }
//
// CommentSchema.
// pre('findOne', autoPopulateUser).
// pre('populate', autoPopulateUser).
// pre(autoPopulateUser);
