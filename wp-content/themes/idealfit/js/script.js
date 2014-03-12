// jQuery(document).ready(function($){
  
// });
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
console.log('out');
var Main = function ($scope) {
  console.log('in');
  $scope.user = {
    tags: []
    , matches: []
  };
  // $scope.initialize = function() {
  //   var data = localStorage.getItem('idealfit');
  //   console.log(data);
  //   if (data !== null) {
  //     $scope.user = JSON.parse(data);
  //   }
  // };
  // $scope.saveUser = function() {
  //   localStorage.setItem('idealfit', JSON.stringify($scope.user));
  // };
  // $scope.initialize();
};
var app = angular.module('idealfit', []);
app.controller('Main',['$scope','$http', Main]);
app.directive('ifAddTags', function() {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        console.log('what');
        var tagArray = $('#tag-input').text().split(',');
        $scope.$apply(function() {
          for (var tag in tagArray) {
            $scope.user.tags.push({name: tagArray[tag].trim(), weight: 1})
          }
        });
        // $scope.saveUser();
      });
    }
  };
});