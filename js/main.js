// search input
var searchInput = document.getElementById("search-input")

// first day variables
var firstDayName = document.getElementById("firstDayName")
var firstDayDate = document.getElementById("firstDayDate")
var firstDayDegree = document.getElementById("firstDayDegree")
var firstDayImg;
var firstweatherStatus = document.getElementById("firstweatherStatus")
var country = document.getElementById("country")
var humPrsntg = document.getElementById("humPrsntg")
var windspeed = document.getElementById("windspeed")
var windDir = document.getElementById("windDir")
var mainWindDir = document.getElementById("mainWindDir")
var dt1;

// second day variables
var secondDayImg = document.getElementById("secondDayImg")
var secondDayName = document.getElementById("secondDayName")
var secondDayDegree = document.getElementById("secondDayDegree")
var secondDayDegreef = document.getElementById("secondDayDegreef")
var secondDayWeatherStatus = document.getElementById("secondDayWeatherStatus")
var dt2;

// third day variables
var thirdDayImg = document.getElementById("thirdDayImg")
var thirdDayName = document.getElementById("thirdDayName")
var thirdDayDegree = document.getElementById("thirdDayDegree")
var thirdDayDegreef = document.getElementById("thirdDayDegreef")
var thirdDayWeatherStatus = document.getElementById("thirdDayWeatherStatus")
var dt3;

// indexes variables
var daysArr = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
var monthsArr = ["January","February","March","April","May","June","July","August","September","October","November","December"]
var windDirections = {
    "N":"North",
    "E":"East",
    "S":"South",
    "W":"West",
    "NE":"North-west",
    "SE":"South-east",
    "SW":"South-west",
    "NW":"North-west",
    "WNW":"West-northwest",
    "NNW":"North-northwest",
    "NNE":"North-northeast",
    "ENE":"East-northeast",
    "ESE":"East-southeast",
    "SSE":"South-southeast",
    "SSW":"South-southwest ",
    "WSW":"West-southwest",
}

var defaultAPI =  "http://api.weatherapi.com/v1/forecast.json?key=67a1923b214e4484aec182012232002&q=cairo&days=3"
var searchAPIString;

function weatherForcast(API = defaultAPI){
    var weatherReq = new XMLHttpRequest()
    weatherReq.open('GET' , API)
    weatherReq.send()
    var weatherObj;
    weatherReq.addEventListener("readystatechange" , function(){
        if(weatherReq.readyState == 4){
            weatherObj = JSON.parse(weatherReq.response)
            country.innerHTML = `${weatherObj.location.name}, ${weatherObj.location.country}`
            firstDayDegree.innerHTML = `${weatherObj.forecast.forecastday[0].day.avgtemp_c}<span id="degreeSympol">&#8451;</span><img id="firstDayImg" src ="" alt="">`
            firstDayImg = document.getElementById("firstDayImg")
            firstDayImg.src = `https:${weatherObj.current.condition.icon}`
            firstweatherStatus.innerHTML = weatherObj.forecast.forecastday[0].day.condition.text
            humPrsntg.innerHTML = `${weatherObj.current.humidity}%`
            windspeed.innerHTML = `${weatherObj.current.wind_kph}km/h`
            var windDirString = weatherObj.current.wind_dir
            windDir.innerHTML = windDirections[windDirString]
            if(windDirections[windDirString].length > 5){
                mainWindDir.style.display = "block"
            }else{
                mainWindDir.style.display = "inline"
            }
            dt1 = new Date(weatherObj.forecast.forecastday[0].date)
            var day1month = dt1.getMonth()
            var day1name = daysArr[dt1.getDay()]
            firstDayName.innerHTML = day1name
            var date = weatherObj.forecast.forecastday[0].date
            var dateInWord = date.slice(8,10) + monthsArr[day1month]
            firstDayDate.innerHTML = dateInWord

            // ============second day================

            secondDayDegree.innerHTML = `${weatherObj.forecast.forecastday[1].day.avgtemp_c}<span id="degreeSympol"> &#8451;</span>`
            secondDayDegreef.innerHTML = `${weatherObj.forecast.forecastday[1].day.avgtemp_f}<span id="fDegreeSympol"> &#8457;</span>`
            secondDayImg.src = `https:${weatherObj.forecast.forecastday[1].day.condition.icon}`
            secondDayWeatherStatus.innerHTML = weatherObj.forecast.forecastday[1].day.condition.text
            dt2 = new Date(weatherObj.forecast.forecastday[1].date)
            var day2name = daysArr[dt2.getDay()]
            secondDayName.innerHTML = day2name

            // ==============third day=================

            thirdDayDegree.innerHTML = `${weatherObj.forecast.forecastday[2].day.avgtemp_c}<span id="degreeSympol"> &#8451;</span><img id="firstDayImg" src ="" alt="">`
            thirdDayDegreef.innerHTML = `${weatherObj.forecast.forecastday[2].day.avgtemp_f}<span id="fDegreeSympol"> &#8457;</span>`
            thirdDayImg.src = `https:${weatherObj.forecast.forecastday[2].day.condition.icon}`
            thirdDayWeatherStatus.innerHTML = weatherObj.forecast.forecastday[2].day.condition.text
            dt3 = new Date(weatherObj.forecast.forecastday[2].date)
            var day3name = daysArr[dt3.getDay()]
            thirdDayName.innerHTML = day3name
        }
    })
}

// calling the main function for default county (cairo)
weatherForcast()

// searching function
searchInput.addEventListener("input" , function(){
    var currentValue = searchInput.value
    if(currentValue == ""){
        weatherForcast()
    }
    var searchAPI = new XMLHttpRequest()
    searchAPI.open("GET" , `https://api.weatherapi.com/v1/search.json?key=67a1923b214e4484aec182012232002&q=${currentValue}`)
    searchAPI.send()
    searchAPI.addEventListener("readystatechange" , function(){
        if(searchAPI.readyState == 4){
            var searchResult = JSON.parse(searchAPI.response)
            if(searchResult.length >= 1){
                if(searchResult[0].name){
                    var countryCorrectName = searchResult[0].name
                    searchAPIString = `https://api.weatherapi.com/v1/forecast.json?key=67a1923b214e4484aec182012232002&q=${countryCorrectName}&days=3`
                    weatherForcast(searchAPIString)
                }
            }
        }
    })
})