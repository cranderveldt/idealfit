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
    , total: 0
  };
  $scope.currentMatches = [];
  $scope.companies = [{"name":"Apple","tags":[{"name":"fun","weight":1},{"name":"relaxed","weight":3},{"name":"hard-working","weight":1},{"name":"efficient","weight":3},{"name":"casual","weight":1},{"name":"professional","weight":2},{"name":"powerful","weight":2},{"name":"impactful","weight":1},{"name":"agile","weight":3},{"name":"scrum","weight":2},{"name":"horizontal","weight":1}]},{"name":"Microsoft","tags":[{"name":"fun","weight":1},{"name":"balanced","weight":3},{"name":"meritocracy","weight":1},{"name":"relaxed","weight":3},{"name":"hard-working","weight":3},{"name":"efficient","weight":1},{"name":"casual","weight":3},{"name":"professional","weight":3}]},{"name":"Google","tags":[{"name":"fun","weight":3},{"name":"balanced","weight":3},{"name":"meritocracy","weight":1},{"name":"relaxed","weight":1},{"name":"hard-working","weight":3},{"name":"efficient","weight":1},{"name":"casual","weight":1}]},{"name":"Amazon","tags":[{"name":"fun","weight":2},{"name":"relaxed","weight":2},{"name":"hard-working","weight":1},{"name":"efficient","weight":2},{"name":"casual","weight":3},{"name":"professional","weight":3},{"name":"powerful","weight":2},{"name":"impactful","weight":3},{"name":"agile","weight":3},{"name":"scrum","weight":2},{"name":"horizontal","weight":3},{"name":"creative","weight":1},{"name":"political","weight":3}]},{"name":"Ebay","tags":[{"name":"fun","weight":3},{"name":"relaxed","weight":1},{"name":"hard-working","weight":3},{"name":"efficient","weight":2},{"name":"casual","weight":3},{"name":"professional","weight":3},{"name":"powerful","weight":3},{"name":"impactful","weight":1},{"name":"agile","weight":3},{"name":"scrum","weight":1},{"name":"horizontal","weight":2}]}];
  $scope.deleteMode = false;
  $scope.initialize = function() {
    var data = localStorage.getItem('idealfit');
    if (data !== null) {
      $scope.user = JSON.parse(data);
    }
  };
  $scope.calculateTotal = function() {
    var totalTagValue = 0;
    for (var t in $scope.user.tags) {
      totalTagValue = totalTagValue + $scope.user.tags[t].weight;
    }
    $scope.$apply(function() {
      $scope.user.total = totalTagValue;
    });
  }
  $scope.saveUser = function() {
    localStorage.setItem('idealfit', JSON.stringify($scope.user));
  };
  $scope.remove = function(array, index){
    array.splice(index, 1);
    $scope.saveUser();
  }
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
        $scope.calculateTotal();
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
        $scope.calculateTotal();
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
        $scope.$apply(function() {
          $scope.currentMatches = [];
        });
        for (var c in $scope.companies) {
          var matchObj = {
            value: 0
            , company: $scope.companies[c]
            , matchedTags: []
            , unmatchedTags: []
          };
          for (var ct in $scope.companies[c].tags) {
            var matchBool = false;
            for (ut in $scope.user.tags) {
              if ($scope.user.tags[ut].name === $scope.companies[c].tags[ct].name) {
                matchBool = true;
              }
            }
            if (matchBool) {
              matchObj.matchedTags.push($scope.companies[c].tags[ct]);
              var value = Math.min($scope.user.tags[ut].weight, $scope.companies[c].tags[ct].weight);
              matchObj.value = matchObj.value + value;
            } else {
              matchObj.unmatchedTags.push($scope.companies[c].tags[ct]);
            }
          }
          console.log(matchObj);
          if (matchObj.value !== 0) {
            matchObj.value = Math.floor((matchObj.value/$scope.user.total) * 100) + '% (' + matchObj.value + ' / ' + $scope.user.total + ')';
            $scope.$apply(function() {
              $scope.currentMatches.push(matchObj);
            });
          }
        }
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
/*
var tags = ["fun", "relaxed", "hard-working", "efficient", "casual", "professional", "powerful", "impactful", "agile", "scrum", "horizontal", "creative", "political", "balanced", "meritocracy"];
var companies = [
    { name: "Apple",     tags: [] }
  , { name: "Microsoft", tags: [] }
  , { name: "Google",    tags: [] }
  , { name: "Amazon",    tags: [] }
  , { name: "Ebay",      tags: [] }
];
for (var c in companies) {
  var rando = Math.floor(Math.random() * tags.length);
  for (var i = 0; i <= rando; i++) {
    companies[c].tags.push({ name: tags[i], weight: (Math.floor(Math.random() * 3) + 1) });
  }
}
console.log(companies);
console.log(JSON.stringify(companies));
*/