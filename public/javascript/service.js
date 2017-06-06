
angular.module('movieDBServices',['DBServices'])
.factory('MovieListService',function($http,dbService,$q) {
//   
    return  { getList: getList,
    		getFavoritesList: getFavoritesList,
			getTrailerById: getTrailerById,
            postFavorite: postFavorite,
            deleteFavorite: deleteFavorite };

    function getList(url){
			return $http.get(url);
        };
		
	function getTrailerById(url) {           //get a movie trailer with imdbID included in the url, constructed in the controller
           return $http.get('/movieTrailer', {   //url built in controller, sent to node server acting as proxy
                params: {url: url}            
            });
        }; 	

    function postFavorite(movie) { //save a movie to the persistence layer, sent to server
    	var result = {};	     
        var deferred = $q.defer(); //set up promise
        var uid = dbService.getUser().uid;
		var dataRef = dbService.getFirebase().child(uid).child('movies') //reference to our table in our database
    	dataRef.on("value", function(snapshot) { //read data from database
			data = snapshot.val(); //our movie data

			var idx = -1;//set to -1 as 0 is a valid array index number
			if (data) {
			    for (var i = 0; i < data.length; i++) { //find movie in favorites list if already present
			        if (data[i].imdbID === movie.imdbID) { //use the imdbID as the key
			            idx = i;
			        }
			    }
			}
			else
				data = [];
			
		    if (idx == -1)        // -1 if not in existing favourite list*/
		        data.push(movie); // add new movie data to favorites list

		    dataRef.set(data); //save data back to table overwrite with new data
		    result.status = 200 
		    result.statusText = 'OK'
			deferred.resolve(result); //becomes the result to the .then() in controller
			}, function (errorObject) {
				    console.log("The post favourite failed: " + errorObject.code);
				  	result.status = 400 
		    		result.statusText = errorObject.code;
		    		deferred.resolve(result); //becomes the result to the .then() in controller
				});
        return deferred.promise;	//return promise		 
    };

    function deleteFavorite(movie) {
            var result = {};
            var deferred = $q.defer(); //set up promise
            var uid = dbService.getUser().uid;
			var dataRef = dbService.getFirebase().child(uid).child('movies') //reference to our table in our database
	    	dataRef.on("value", function(snapshot) {
				data = snapshot.val(); //our movie data
				var idx = -1;//set to -1 as 0 is a valid array index number
			    for (var i = 0; i < data.length; i++) { //find movie in favorites list if already present
			        if (data[i].imdbID === movie.imdbID) { //use the imdbID as the key
			            idx = i;
			        }
			    }
			    if (idx >= 0)
		        	data.splice(idx, 1); //at the position of the movie remove that movie
		                             //the splice function will remove the item at position idx
			    dataRef.set(data); //save data back to table over write with new data
			    
				result.status = 200 
		    	result.statusText = 'OK'
				deferred.resolve(result); //becomes the result to the .then() in controller			
				}, function (errorObject) {
					    console.log("The delete failed: " + errorObject.code);
					    result.status = 400 
		    			result.statusText = errorObject.code;
		    			deferred.reject(result); //becomes the result to the .then() in controller
					});
	        return deferred.promise;	//return promise
        };

    function getFavoritesList() { //return a list of favourite movies, sent to server side
    		var deferred = $q.defer(); //set up deferred promise
    		var uid = dbService.getUser().uid;
    		var dataRef = dbService.getFirebase().child(uid).child('movies') //reference to our table in our database
            dataRef.on("value", function(snapshot) {
					  console.log(snapshot.val()); //snapshot is our data
					  deferred.resolve(snapshot.val()); //becomes reslt to .then() in controller
					}, function (errorObject) {
					  console.log("The get favourites failed: " + errorObject.code);
					    result.status = 400 
		    			result.statusText = errorObject.code;
		    			deferred.reject(result); //becomes the result to the .then() in controller
				});
            return deferred.promise; //return promise
		};
})
.factory('MovieModelService', function () { //service included as parameter to controller
//
        return {
            setMovie: setMovie

        };
        function setMovie(title,imdbId,released){
            var storeMovie = {}
            storeMovie.Title = title;
            storeMovie.imdbID = imdbId;
            storeMovie.Year = released;

            return storeMovie;

        }
});