const filterSuggestions = (suggestion, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK){
    if (suggestion.types.includes("airport")){
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(suggestion.name));
      document.getElementById('results-container').appendChild(li);
    }
  } else {
    console.log(status);
  }
};

export const handleSuggestions = (suggestions, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK){
    clearResults();
    //sort suggestions
    suggestions.forEach( suggestion => {
      if (suggestion.formatted_address.match("United States")){
        if (suggestion.rating){
          //positionMap(suggestion);
          const result = document.createElement('li');
          result.className = "result";
          result.appendChild(document.createTextNode(suggestion.name));
          document.getElementById('results-container').appendChild(result);
        }
      }

      // placeService.getDetails(request, filterSuggestions);
    });
  } else {
    console.log(status);
  }
};

export const clearResults = () => {
  document.getElementById('results-container').innerHTML = "";
}
