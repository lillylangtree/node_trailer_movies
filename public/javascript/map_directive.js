(function(){
'use strict'

angular.module('mapDirectives',[])
.directive('makeMap', function() {
         
        var directive = {
            restrict: 'EA',            
            templateUrl: 'templates/directives/map.html',
            scope: {
                map: '='
            },
            link: function(scope, element, attrs){
                console.log("in map directive link");
            },
            controller: function mapController($scope) {
            
                    $scope.zoomIn = function(){
                        $scope.map.zoom++;
                    };

                    $scope.zoomOut = function(){
                        $scope.map.zoom--;
                    };
                    $scope.mapDimensions = function() {
                        if (!$scope.map.width)
                            var width = 300;
                        else
                            width = $scope.map.width;
                        if (!$scope.map.height)
                            var height = 300;
                        else
                            height = $scope.map.height;
                        return width + 'x' + height;
                    }        
                }                    
            };
        return directive;     
    });
})();