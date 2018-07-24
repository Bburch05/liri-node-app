# Liri Node App

This simple node app takes up to two arguments and spits out data depending on the first argument.

# Important
This project utilizes a .env file. In order to make use of this project you must supply your own .env file!


# Commands 

### my-tweets "username"
    Displays the last 20 tweets from the twitter username you type in.
    If no username is selected the app will use a pre-defined user.

###  spotify-this-song "song name"
    Displays various info on the selected song using the Spotify API

### movie-this "movie name"
    Displays info on the movie that is the closest match to the string you enter.

###  do-what-it-says
    Reads the random.txt file provided and performs the appropriate above command. 

    Must be in <command>,<option> format
