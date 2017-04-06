# Airport Mapper

[AirportMapper Link][airportmapper]

[airportmapper]: http://peterzhen.com/AirportMapper/

Airport Mapper is a web and desktop application built with vanilla javascript.  The application allows for airport searches within the United States and it calculates distance between them in nautical miles.  It uses Google Maps and it's services to search, autosuggest and plot it's searches.

# How to Use

Airport Mapper is built in with JavaScript without any frameworks, so you can run `index.html` in the browser to see the application live on the web browser.  The build has been precompiled with webpack prior.  

To view the application on your OS X device, you need to first have [Node.js](https://nodejs.org/en/).

Once you have `Node.js` installed, run the following commands in the terminal:

* Navigate to the app's root directory in terminal
* Run `npm install` to install dependencies
* Run `npm start` to open the app in your browser

If you wish to have the program in a executable desktop package, run these following commands in the terminal:

* Navigate to the app's root directory in terminal
* Run `npm install` to install dependencies
* Run `npm run build` to open the app in your browser

A new folder should be created within the directory.  The executable desktop package is stored inside the that directory, simply launch to use.


# Technologies Used

The application was written in ES6 JavaScript, using babel and webpack to compile the files.  The application is wrapped in electron to provide desktop support as well.  

To handle the autocomplete suggestions, I bound the input field to do a Google Place Search with change in input data.  I used Google Place Search over their AutoComplete Library because of it's ability to restrict type to `airport`.  From there, I filtered the results to only show airports that reside in the United States.  This allows for airport searches using a wide array of keywords, including entering city, zip code or state to do a search.  To prevent over querying, a global `setTimeout` was used to only query an autocomplete when typing is ceased.

Given two locations, I used the Haversine Formula to compute the nautical miles.  I displayed and plotted the points on the map using marks and paths.  The ability to route the distance between aiports using Google Directions Services were also added.  This allowed for walking, driving and transit directions.

# Alternate Approaches

With the limitations of filtering for Google's AutoComplete, another alternative was to store all the airports in a local database.  Matching would then be done using Regular Expressions, providing for a faster search.  I opted to use the Google Place Search method because it's more versatile in it's searches compared to matching characters to a local database.
