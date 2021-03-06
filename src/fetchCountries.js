export default function fetchCountries(searchQuery, renderCountriesList) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      renderCountriesList(data);
    })
    .catch(error => console.log(error));
}
