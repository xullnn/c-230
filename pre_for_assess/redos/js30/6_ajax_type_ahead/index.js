let endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];
fetch(endpoint)
  .then(response => response.json())
  .then(data => cities = data);

function findMatches(wordToMatch, cities) {
  if (wordToMatch.trim().length === 0) return [];

  return cities.filter(place => {
    let regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}



document.addEventListener('DOMContentLoaded', function() {
  function displayMatches() {
    let matchArray = findMatches(this.value, cities);

    let html = matchArray.map(place => {
      return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>
      `
    }).join('');

    suggestions.innerHTML = html;
  }

  let searchInput = document.querySelector('.search');

  searchInput.addEventListener('input', displayMatches);

  let suggestions = document.querySelector('.suggestions');
})
