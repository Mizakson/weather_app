/* 
weather api key:
9740515f7e2f4924acb162332242503

for the purpose of this project, 
this free api key is in the source code on github

free-tier limits forecast data to 3 days

request url psuedocode
https://api.weatherapi.com/v1/forecast.json?key=keyHere&q=locationHere

*/

const WEATHER_API_KEY = "9740515f7e2f4924acb162332242503"
const searchField = document.getElementById("search")
const searchBtn = document.querySelector(".main-search")

function searchLocation(location) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=1`, {mode: "cors"})
    .then(function(data) {
        return data.json()
    })
    .then(function(data) {
        console.log(data)
    })
}

searchBtn.addEventListener("click", function(event) {
    event.preventDefault()
    const location = searchField.value
    searchLocation(location)
})