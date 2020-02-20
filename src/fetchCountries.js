export default function fetchCountries (searchQuery, renderCountriesList){
    fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        renderCountriesList(data)
    }).catch(error => console.log(error));
}

