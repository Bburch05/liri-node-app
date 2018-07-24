//Node Requires

require("dotenv").config();
var keys = require("./keys.js")
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var selector = process.argv[2]
var argument = process.argv[3]
var songName

// Functions
function showTweets(){
    var params = {
        screen_name: 'austin_walker',
        count: 20,
        trim_user: true
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
        console.log("\n===================\n");
        console.log(tweets[i].text);
        console.log("\nDate Tweeted: " + tweets[i].created_at);
        console.log("\n===================\n");
    }
  }
});
};

function searchMovie(){
    var movieTitle

    if (argument){
        movieTitle = argument;
    }
    else {
        movieTitle = "Mr. Nobody"
    }
    request('http://www.omdbapi.com/?apikey=trilogy&type=movie&t=' + movieTitle , function (error, response, body) {
        var movie = JSON.parse(body)
        console.log("\n================");
        console.log("Title: " + movie.Title);
        console.log("Year Released: " + movie.Year);
        console.log("IMDB Rating: " + movie.Ratings[0].Value)
        console.log("Rotton Tomatoes Rating: " + movie.Ratings[1].Value)
        console.log("Actors: " + movie.Actors)
        console.log("Language: " + movie.Language)
        console.log("Country Produced: " + movie.Country)
        console.log("\n=========Plot========\n\n" + movie.Plot)
        console.log("\n========================\n")
});
};

function searchSpotify(){
    if (argument){
        songName = argument
        var id
        spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            id = data.tracks.items[0].id
            
            spotify
            .request('https://api.spotify.com/v1/tracks/' + id)
            .then(function(data){
                console.log("\n==============")
                console.log("Artists:")
                for(var j = 0; j < data.album.artists.length ; j++){
                    console.log(data.album.artists[j].name);
                }
                console.log("================");
                console.log("\nSong: " + data.name);
                console.log("Album: " + data.album.name);
                console.log("Preview: " + data.preview_url + "\n");
            })
          });
    }
    else {
        spotify
        .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
        .then(function(data){
            console.log("\n==============")
            console.log("Artists:")
            for(var l = 0; l < data.album.artists.length ; l++){
                console.log(data.album.artists[l].name);
            }
            console.log("================");
            console.log("\nSong: " + data.name);
            console.log("Album: " + data.album.name);
            console.log("Preview: " + data.preview_url + "\n");
        })
    }
    
};

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        var dataArr = data.split(",");

        selector = dataArr[0];
        argument = dataArr[1];
        switchFunction();
      
      
      });
};

// Application Code
function switchFunction(){
    if(process.argv[2]){
        switch(selector){

            case "my-tweets":
                showTweets();
                break;

            case "spotify-this-song":
                searchSpotify();
                break;

            case "movie-this":
                searchMovie();
                break;

            case "do-what-it-says":
                doWhatItSays();
                break;

            default:
                console.log("\nI'm not sure what you want me to do");
        }
    }
    else {
        console.log("\nYou didn't tell me what you wanted to do")
    }
}

switchFunction();