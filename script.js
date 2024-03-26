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

function getWeatherData(location) {

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=1`, {mode: 'cors'})
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        
        if (response.current.condition.code === 1006) {
            throw new Error("INVALID LOCATION")
        }

        if (response.current.condition.code === 2007) {
            throw new Error("MONTHLY CALL LIMIT EXCEEDED")
        }

        else {
            console.log(response)
        }

    })

}

getWeatherData("tampa")