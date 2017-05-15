// These are the required files to query the APIs
var keys = require("./keys.js");
var request = require('request');
var spotter = require('spotify');
var Twit = require('twitter');
var fs = require("fs");

// These are some easy variables to make calls easier
var myTweets = "my-tweets";
var spot = "spotify-this-song";
var omdb = "movie-this";
var simon = "do-what-it-says";
var userInput = process.argv[2];

var twitKeys = new Twit (keys.twitterKeys);

var spotKeys = keys.spotifyKeys;


// This is the general Request module query
function movieCall () {
if (userInput === omdb) {

    var movie = process.argv[3];

    var brutal = 'Mr+Nobody';

        if (movie === undefined) {

            var omdbURL = "http://www.omdbapi.com/?tomatoes=true&t=" + brutal;
            
                request(omdbURL, function (error, response, body) {
                if (!error) {

                    var touchMy = JSON.parse(body);

                    console.log('Title: ', touchMy.Title);
                    console.log('===========================================');
                    console.log("Released: ", touchMy.Released);
                    console.log('===========================================');
                    console.log('Rating: ', touchMy.Ratings[0].Value);
                    console.log('===========================================');
                    console.log('Country: ', touchMy.Country);
                    console.log('===========================================');
                    console.log('Language: ', touchMy.Language);
                    console.log('===========================================');
                    console.log('Plot: ', touchMy.Plot);
                    console.log('===========================================');
                    console.log('Actors: ', touchMy.Actors);
                    console.log('===========================================');
                    console.log('Rotten Tomatoes Link: ', touchMy.tomatoURL);
                    console.log('===========================================');

                }
                if (error) {
                    console.log('error:', error); // Print the error if one occurred 
                }
                
            });
        }

        else {

        var omdbURL = "http://www.omdbapi.com/?tomatoes=true&t=" + movie;

        request(omdbURL, function (error, response, body) {
            if (!error) {

                var touchMy = JSON.parse(body);

                console.log('Title: ', touchMy.Title);
                console.log('===========================================');
                console.log("Released: ", touchMy.Released);
                console.log('===========================================');
                console.log('Rating: ', touchMy.Ratings[0].Value);
                console.log('===========================================');
                console.log('Country: ', touchMy.Country);
                console.log('===========================================');
                console.log('Language: ', touchMy.Language);
                console.log('===========================================');
                console.log('Plot: ', touchMy.Plot);
                console.log('===========================================');
                console.log('Actors: ', touchMy.Actors);
                console.log('===========================================');
                console.log('Rotten Tomatoes Link: ', touchMy.tomatoURL);
                console.log('===========================================');

            }
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
            }
            
        });
     }
};
};

function spotted () {
    if (userInput === spot) {

        var songName = '';
        
        function songMaker () {
            for (var i = 3; i < process.argv.length; i++) {
            songName = songName + process.argv[i] + ' ';
        };
        if (process.argv[3] === undefined) {
            songName = 'Ace of Base';
        }
        };

        songMaker();

        // This is the Spotify module query
        spotter.search({ type: 'track', query: songName }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            
            var artist = data.tracks.items[0].album.artists[0].name;
            var songTitle = data.tracks.items[0].name;
            var preview = data.tracks.items[0].preview_url;
            var albumName = data.tracks.items[0].album.name;

            console.log('===========================================');
            console.log('Artist: ' + artist);
            console.log('===========================================');
            console.log('Song Title: ' + songTitle);
            console.log('===========================================');
            console.log('Listen to a sample here: ' + preview);
            console.log('===========================================');
            console.log('Album: ' + albumName);
            console.log('===========================================');
        });
    }
};

function simonSays() {
    if(userInput === simon) {

    var textFile = './random.txt';

        fs.readFile(textFile, "utf8", function(err, data)
            {
                var data1;
                var data2;

                function parser() {
                    data1 = data.split(',');
                    for (i = 0; i < data1.length; i++) {
                        data2 = data2 + data1[i] + ' ';
                    }
                }

                parser();

                console.log('node liri.js ' + data2);

                spotted();
        });
};
};

function getTwit() {
    if (userInput === myTweets) {
        // This is the Twitter module query
        var params = {screen_name: 'VariousHughes'};
            twitKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                
                for(var i = 0; i < 20; i++) {
                    console.log('===========================================');
                    console.log(tweets[i].text);
                    console.log('===========================================');
                    console.log(tweets[i].created_at);
                    console.log('===========================================');
                }
            }
            if(error) {
                console.log('Ya done fucked up');
                console.log(error);
            }
        });
    }
};

getTwit();
movieCall();
spotted();
simonSays();