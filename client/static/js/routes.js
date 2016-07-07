boardApp.config(function($routeProvider){
  $routeProvider
  .when("/users", {
    templateUrl: "../partials/users.html"
  })
  .when("/logout", {
    templateUrl: "../partials/users.html"
  })
  .when("/topics", {
    templateUrl: "../partials/topics.html"
  })
  .when("/topics/:id", {
    templateUrl: "../partials/board.html"
  })
  .when("/board", {
    templateUrl: "../partials/board.html"
  })
  .when("/users/:id", {
    templateUrl: "../partials/userInfo.html"
  })
  .when("/userInfo", {
    templateUrl: "../partials/userInfo.html"
  })
  .otherwise({
    redirectTo: "/users"
  })
})
