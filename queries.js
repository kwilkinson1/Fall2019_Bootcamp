/* Add all the required libraries*/
var fs = require('fs'),
    mongoose = require('mongoose'),  
    Listing = require('./ListingSchema.js'), 
    config = require('./config');
/* Connect to your database using mongoose - remember to keep your key secret*/

mongoose.connect(config.db.uri, {useNewUrlParser: true,  useUnifiedTopology: true });

var db = mongoose.connection;

db.once("open", () =>{
  console.log("Connection successful!");
});

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.findOne({'name': 'Library West'}, (err, building) => {
    if (err) {
      console.error(err.message);
    }
    console.log(building);
  })

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.find({'code': 'CABL'}, (err, courses) => {
    if (err) {
      console.error(err.message);
    }
    console.log(courses);
  })
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
  Listing.updateOne({"name": "Phelps Laboratory"}, {"address": "1953 Museum Rd, Gainesville, FL 32603"}, (err, updatedDoc) => {
    if (err) {
      console.error(err.message);
    }
    console.log(updatedDoc);
  })
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

   Listing.find({}, (err, listings) => {
     if (err) {
       console.error(err.message);
     }
     console.log(listings);
   })
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
