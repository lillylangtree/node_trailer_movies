angular.module('DBServices',[])
.factory('dbService',function(myMovieConfig,$q) {

	var user = null;
	var myFirebaseRef = getFirebase();

	var service = { getFirebase: getFirebase,
					login: doLogin,
					register: doRegister,
					logout: logoutUser,
					getUser: getUser
				};
			
	return service;		

    function getFirebase() {
		return new Firebase(myMovieConfig.myDataRef);
	};

	function authWithPassword(email,password) {
	        var deferred = $.Deferred();
			
			myFirebaseRef.authWithPassword({
				  email    : email,
				  password : password
				}, function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				    deferred.reject(error);
				  } else {
				    console.log("Authenticated successfully with payload:", authData);
				    deferred.resolve(authData);
				  }
				});
			return deferred.promise();
	};

	function createUser(email,password) {
				var deferred = $.Deferred();
				myFirebaseRef.createUser({
					  email    : email,
					  password : password
					}, function(error, userData) {
					  if (error) {
					    console.log("Error creating user:", error);
		    			deferred.reject(error); //becomes the result to the .then() in controller
					  } else {
					    console.log("Successfully created user account with uid:", userData.uid);
					    deferred.resolve(userData); //becomes the result to the .then() in controller
					  }
					});
			
			return deferred.promise();
	};

	function doRegister(email, password) { 
		return createUser(email, password)
            .then(function () {
            return authWithPassword(email, password);
        });
	};

	function doLogin(email, password) { 
		return authWithPassword(email, password);
	};

	function getUser(){
		return myFirebaseRef.getAuth();;
	};
	function logoutUser(){
		return myFirebaseRef.unauth();
	};
});
