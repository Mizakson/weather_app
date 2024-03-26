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
            console.log(data)
            // handle data -- render ui here
        }
        
    })

}

searchBtn.addEventListener("click", getSearch)