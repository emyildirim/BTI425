# MOVIE WEB API

  

#### Documentation: [API Link](https://sore-cyan-moth-sock.cyclic.app/)



  

#### Description:

This project is a Node.js web API that provides connection for the Movie Database and the UI.


**About the API:**

  

+ Server created using [Node.js](https://nodejs.org/en)

  

+ User interface implemented with [EJS](https://www.npmjs.com/package/ejs).

  

+ Databases implemented with [Mongo Atlas](https://www.mongodb.com/atlas/database) and [Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/).

  

+ [Cors](https://www.npmjs.com/package/cors) used for Connect/Express middleware.

  

+ [Nodemon](https://www.npmjs.com/package/nodemon) used for automating and restarting the live server. (Optional)


  

| Method | Endpoint | Description
|--|--|--|
| POST | /api/movies/add | Adds the new movie from the body of the request. |
|GET|/api/movies/**:page/:perPage/:title?**|Returns all the movies for a specific page and optionally filtered by the title.|
|GET|/api/movies/**:id**|Returns the movie for the specified id parameter.|
|PUT|/api/movies/**:id**|Updates the movie by id using the body of the request.|
|DELETE|/api/movies/**:id**|Deletes the movie document from the collection by id.|
