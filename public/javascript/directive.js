(function(){
'use strict'

angular.module('movieDBDirectives',[]).directive('movieInfoBox', function() {
  return {
    restrict: 'E',    // E -> element
    scope: {
      title: '=title',
      date: '=date',
      poster: '=poster'
    },
    templateUrl: 'templates/directives/movie-info-box.html',
    controller: function($scope) {
                    //console.log($scope);                   
                    }
  };
})
.directive('movieTrailer', function() {
  return {
    restrict: 'E',    // E -> element
    scope: {
      trailerSrc: '=',
      fadeIn: '='
    },
    templateUrl: 'templates/directives/movie-trailer.html',
    link: function(scope,element,attrs) {
                    console.log(scope);                   
                    

                    scope.$watch(attrs.fadeIn, function(value) {
                          if (value === 'in') {
                            if (element.find("iframe")[0].src !== scope.trailerSrc)
                                element.find("iframe")[0].src=scope.trailerSrc;  
                            }
                          else
                            element.find("iframe")[0].src="";   
                        });

                    scope.closeModal = function() {
                      scope.fadeIn = 'out';                   
                    }
                  
                  },
    controller: function($scope,$element) {
                    console.log($scope);
                    $scope.fadeIn='out';
                    
                  }
  };
})

})();