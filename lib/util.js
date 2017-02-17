// adds title to autocomplete suggestions
export const createResultsLabel = (string, className = "results-label") => {
  const resultsLabel = document.createElement('div');
  resultsLabel.className = className;
  resultsLabel.innerHTML = string;
  document.getElementById('results-container').appendChild(resultsLabel);
};

// displays error for no results
export const noResults = () => {
  const result = document.createElement('li');
  result.className = "result";
  result.appendChild(document.createTextNode("No Results"));
  document.getElementById('results-container').appendChild(result);
};

// clears results-container
export const clearResults = () => {
  document.getElementById('results-container').innerHTML = "";
};

export const appendData = place => {
  const result = document.createElement('li');
  result.className = "results-data";
  result.appendChild(document.createTextNode(place.name));
  result.appendChild(document.createElement("br"));
  result.appendChild(document.createElement("br"));
  result.appendChild(document.createTextNode(place.formatted_address));
  result.appendChild(document.createElement("br"));
  document.getElementById('results-container').appendChild(result);
};

export const appendSpace = () => {
  const result = document.createElement('li');
  result.appendChild(document.createElement("br"));
  document.getElementById('results-container').appendChild(result);
};

// sets mode buttons to have a white bottom border
export const clearBorder = modes  => {
  modes.forEach( mode => {
    mode.style.borderBottom = "3px solid white";
  });
};

const toRad = num => {
  return num * (Math.PI / 180);
};

// computes miles between two points using the Haversine Formula
export const computeMiles = (startLoc, endLoc) => {
  const lat = toRad(startLoc.lat() - endLoc.lat());
  const lng = toRad(startLoc.lng() - endLoc.lng());
  const r = 3956;

  const a = Math.sin(lat / 2) *
            Math.sin(Math.sin(lat / 2)) +
            Math.cos(toRad(startLoc.lat())) *
            Math.cos(toRad(endLoc.lat())) *
            Math.sin(lng / 2) *
            Math.sin(lng / 2);

  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;
  return (r * c).toFixed(3);
};

// shortens string to 30 characters
export const shortenName = name => {
  if (name.length > 30){
    return name.slice(0,30) + "...";
  } else {
    return name;
  }
};
