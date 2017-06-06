# node_trailer_movies

This project is a version of a student project used for
learning the AngularJS frame work. It is wrapped in a node server
to allow for api calls that are not possible client side due to cross
domain issues. Specifically call to http://api.myapifilms.com/trailerAddict/taapi?idIMDB=<imdbid> .
This api will throw a cross domain error if accessing on client side

It uses the MoviesDB Api as its basis see http://docs.themoviedb.apiary.io/#

To clone the application use the usual git clone command from a command tool

1/ git clone https://github.com/lillylangtree/node_trailer_movies.git

2/ the clone will create a node_trailer_movies folder in the current folder

The application includes a package.json file which will allow you to run a 
local http server. You need to have npm installed to do this.

cd to node_trailer_movies folder, the git clone creates this folder for you

1/ issue command npm start (this will run npm install and >node server.js

2/ in a browser navigate to localhost:5000 (you can change the port setting
   in the node server.js file if you wish)

3/ Home page should appear

 