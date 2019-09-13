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

// Create a connection to the database
var db = mongoose.connection;

// Console log verification that the database is connected
db.once("open", () =>{
  console.log("Connection successful!");
});
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */

  // First, use the fs to read the file and convert it into JSON data
  // I made this function asynchronous, so the rest of the code will be
  // able to be run if necessary.
fs.readFile('listings.json', 'utf-8', (err, data) => {

    try {
      let listingData;
      
      // Use JSON.parse to convert file into JSON object
     listingData = JSON.parse(data);
          
      // Iterate through the listingData entries using forEach
        listingData.entries.forEach((listing) => {
        
          // Verify each listing is properly formatted by creating new
          // objects with Listing schema
          let building = new Listing(listing);
          
          // Add each building to mongoDB using mongoose
          Listing.create(building, function(err, doc){
            // Return error if there is any
            if (err) {
              return console.error(err.message);
            }
            // Return the completed message if uploaded successfully
            console.log(`${doc.name} was added to database!`);
            return db.close;
          })
        })

        
    } catch (err) {

      console.error(err.message);
      process.exit(1);
    }
  })
  

/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

