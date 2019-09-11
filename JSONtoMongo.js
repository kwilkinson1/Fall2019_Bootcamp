'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri, {useNewUrlParser: true,  useUnifiedTopology: true });

var db = mongoose.connection;

db.once("open", () =>{
  console.log("Connection successful!");
});
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */

  // This parses the JSON file into JSON data for insertion into the database
  //var listingData = JSON.parse(fs.readFileSync('listings.json', 'utf8'));

  var listing, buildings;
  //First, create a function to read the file and convert it into JSON data
  //I made this function synchronous, so that the data would be available 
  //before attempting to connect to mongoDB
  var data = fs.readFileSync('listings.json', 'utf-8');
    try {
      let listingData;
      
      // Use JSON.parse to convert file into JSON object
      listingData = JSON.parse(data);
          
      // Iterate through the listingData to use the schema to model the 
      // data prior to adding to mongoDB
      for (let i = 0; i < listingData.entries.length; i++) {
        let building = new Listing(listingData.entries[i]);
        
        // Add each building to mongoDB using mongoose
        Listing.create(building, function(err, doc){
          if (err) {
            return console.error(err.message);
          }
          console.log(doc);
          return db.close;
        })
      }
      //console.log(listingData.entries[0]);
      
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  
  
  /*async function insertListings() {
    try {
      await db.insertMany(listingData);
      console.log('Finished updating!');
      process.exit();
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }*/

/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

