// jQuery(document).ready(function($){
  
// });
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
var app = angular.module('idealfit', []);
app.controller('Main',['$scope','$http', function ($scope) {
  $scope.user = {
    tags: []
    , matches: []
  };
  $scope.currentMatches = [];
  $scope.companies = [
      {name: "Apple",     tags: [{name: "fun", weight: 2}]}
    , {name: "Microsoft", tags: [{name: "fun", weight: 2}]}
    , {name: "Google",    tags: [{name: "fun", weight: 2}]}
    , {name: "Amazon",    tags: [{name: "fun", weight: 2}]}
    , {name: "Ebay",      tags: [{name: "fun", weight: 2}]}
  ];
  $scope.initialize = function() {
    var data = localStorage.getItem('idealfit');
    if (data !== null) {
      $scope.user = JSON.parse(data);
    }
  };
  $scope.saveUser = function() {
    localStorage.setItem('idealfit', JSON.stringify($scope.user));
  };
  $scope.initialize();
}]);
app.directive('ifAddTags', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        var tagArray = jQuery('#tag-input').val().split(',');
        $scope.$apply(function() {
          for (var tag in tagArray) {
            $scope.user.tags.push({name: tagArray[tag].trim(), weight: 1});
          }
        });
        jQuery('#tag-input').val('');
        $scope.saveUser();
      });
    }
  };
});
app.directive('ifSetWeight', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        $this = jQuery(this);
        $scope.$apply(function() {
          $scope.user.tags[$this.data('tag-index')].weight = parseInt($this.text(), 10);
        });
        $scope.saveUser();
      });
    }
  };
});
app.directive('ifFindMatches', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        
      });
    }
  };
});
app.directive('ifSaveMatch', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.one('click', function(e) {
        $this = jQuery(this).addClass('disabled').text('Match Saved');
        $scope.$apply(function() {
          $scope.user.matches.push($scope.currentMatches[parseInt($this.data('match-index'), 10)]);
        });
        $scope.saveUser();
      });
    }
  };
});