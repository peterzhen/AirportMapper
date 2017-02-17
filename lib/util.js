export const createResultsLabel = (string, className = "results-label") => {
  const resultsLabel = document.createElement('div');
  resultsLabel.className = className;
  resultsLabel.innerHTML = string;
  document.getElementById('results-container').appendChild(resultsLabel);
};

export const noResults = () => {
  const result = document.createElement('li');
  result.className = "result";
  result.appendChild(document.createTextNode("No Results"));
  document.getElementById('results-container').appendChild(result);
};

export const clearResults = () => {
  document.getElementById('results-container').innerHTML = "";
};

export const computeMiles = (startLoc, endLoc) => {
  const latDiff = (startLoc.lat() - endLoc.lat()) * (Math.PI / 180);
  const lngDiff = (startLoc.lng() - endLoc.lng()) * (Math.PI / 180);
  const startLatRad = startLoc.lat() * (Math.PI / 180);
  const endLatRad = endLoc.lat() * (Math.PI / 180);

  const a = Math.sin(latDiff / 2) * Math.sin(Math.sin(latDiff / 2)) +
                  Math.cos(startLatRad) * Math.cos(endLatRad) *
                  Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;
  return (3440 * c).toFixed(2);
};
