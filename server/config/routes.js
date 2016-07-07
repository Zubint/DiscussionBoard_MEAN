var users = require('./../controllers/users.js');
var topics = require('./../controllers/topics.js');
var board = require('./../controllers/board.js');

module.exports = function(app){

  app.post("/users", users.regUser);
  app.get("/session", users.session);
  app.get("/logout", users.logout);
  app.get("/users/:id", users.getUserById);
  // app.get("/users", users.index);


  app.get("/topics", topics.index);
  // app.get("/topics/:id", topics.getTopicById);
  app.post("/topics", topics.create);

  app.get("/board/:id", board.getTopicById);
  app.post("/board/createPost", board.createPost);
  app.post("/board/createComment", board.createComment);
  app.post("/board/addUpvote", board.addUpvote);
  app.post("/board/addDownvotes", board.addDownvote)


}
