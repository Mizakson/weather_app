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
const weatherDisplay = document.getElementById("weather-display")

const getSearch = async (e) => {
    e.preventDefault()
    
    const location = searchField.value
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=1`, {mode: "cors"})
    
    response.json().then(function(data) {
        if (data.current.condition.code === 1006) {
            document.getElementById("error-display").textContent = "INVALID LOCATION"
        }
        if (data.current.condition.code === 2007) {
            document.getElementById("error-display").textContent = "MONTHLY CALL FREQUENCY EXCEEDED"
        }
        else {
            transformData(data)
        }
        
    })

}

const renderUi = (obj) => {
    weatherDisplay.innerHTML = `
    <div id='info'>
        <div id='location'>
          <h2 id='location-name'>${obj.location[0]}</h2>
          <h4 id='location-region'>${obj.location[1]}, ${obj.location[2]}</h4>
        </div>
        <div id='forecast'>
        <h3 id='condition'>${obj.forecast[0]}</h3>
          <img src=${obj.forecast[1]} alt='${obj.forecast[0]}'>
          <div id='temps'>
          <h4 id='high-temp'>Daily High: ${obj.forecast[4]}°F</h4>
          <h4 id='low-temp'>Daily Low: ${obj.forecast[3]}°F</h4>
          </div>
        </div>
    </div>
   `
}

const transformData = (data) => {
    // location data
    const name = data.location.name
    const region = data.location.region
    const country = data.location.country

    // forecast data
    const conditionText = data.forecast.forecastday[0]["day"].condition.text
    const conditionIcon = data.forecast.forecastday[0]["day"].condition.icon
    const code = data.forecast.forecastday[0]["day"].condition.code
    const lowTemp = Math.round(data.forecast.forecastday[0]["day"].mintemp_f)
    const highTemp = Math.round(data.forecast.forecastday[0]["day"].maxtemp_f)

    const essentialData = {
        location: [name, region, country],
        forecast: [conditionText ,conditionIcon, code,
        lowTemp, highTemp]
    }

    return renderUi(essentialData)

}

searchBtn.addEventListener("click", getSearch)