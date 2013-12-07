angular.module('vogueultra', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'home.html'
    })
    .when('/collection/:collectionId', {
      controller: 'CollectionCtrl',
      templateUrl: 'collection.html'
    })
    .when('/article/:articleId', {
      controller: 'ArticleCtrl',
      templateUrl: 'Article.html'
    })
    .when('/blog', {
      controller: 'BlogCtrl',
      templateUrl: 'blog.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('HomeCtrl', function($scope, $location, $routeParams) {

})

.controller('CollectionCtrl', function($scope, $location, $routeParams) {
  if ($routeParams.collectionId == 'vogueultra') {
    $scope.articles = [
      {id: 1, name: 'article 1', description: 'Awesome article in collection vogueultra'},
      {id: 2, name: 'article 2', description: 'Awesome article in collection vogueultra'},
    ]
  }
  else if ($routeParams.collectionId == 'designers') {
    $scope.articles = [
      {id: 3, name: 'article 3', description: 'Awesome article in collection designers'},
      {id: 4, name: 'article 4', description: 'Awesome article in collection designers'},
    ]
  }
})

.controller('ArticleCtrl', function($scope, $location, $routeParams) {
  if ($routeParams.ArticleId == '1') {
    $scope.article = {
      id: 1, 
      name: 'article 1', 
      description: 'Awesome article in collection 1'
    }
  }
  else if ($routeParams.ArticleId == '2') {
    $scope.article = {
      id: 2, 
      name: 'article 2', 
      description: 'Awesome article in collection 1'
    }
  }
  else {
    $scope.article = {
      id: 3, 
      name: 'article 3', 
      description: 'catchall'
    }
  }
})

.controller('BlogCtrl', function($scope, $location, $routeParams) {
  
})
