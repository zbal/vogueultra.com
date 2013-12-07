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
      templateUrl: 'article.html'
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
  window.mySwipe = Swipe(document.getElementById('slider'), {
    startSlide: 2,
    speed: 400,
    auto: 3000,
    continuous: true,
    disableScroll: false,
    stopPropagation: false,
    callback: function(index, elem) {},
    transitionEnd: function(index, elem) {}
  });
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
  if ($routeParams.articleId == '1') {
    $scope.article = {
      id: 1, 
      name: 'article 1', 
      description: 'Awesome article in collection 1'
    }
  }
  else if ($routeParams.articleId == '2') {
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
