// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://uttam:betabulls@123@ds015859.mlab.com:15859/parsedemotest',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'LU5kWkxdD7xRAfA8fn1JlSzh44NqQGcif2uSh9np',
  masterKey: process.env.MASTER_KEY || '4WpdRJd47jCzT3Yp7PN2qSEQqrgKFkKJFi7E1vzk', //Add your master key here. Keep it secret!
  clientKey: 'RqFmjNCA0gvUDrfPuz0I83CvA7meGocGGvcUtuvP'
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse'  // Don't forget to change to https if needed
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
