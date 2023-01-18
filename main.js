const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');

const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const feelsLikeOutput = document.querySelector('.feels-like');
const maxTempOutput = document.querySelector('.max-temp');
const minTempOutput = document.querySelector('.min-temp');
const sunriseOutput = document.querySelector('.sunrise');
const sunsetOutput = document.querySelector('.sunset');

const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');

let cityInput = "Delhi";


form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');

    }

    else {
        cityInput = search.value;

        cityInput = cityInput.toLowerCase().split(' ');
        for (var i = 0; i < cityInput.length; i++) {
            cityInput[i] = cityInput[i].charAt(0).toUpperCase() + cityInput[i].slice(1);
        }
        cityInput.join(' ');

        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";

    }

    e.preventDefault();

});


function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return weekday[new Date(`${year}-${month}-${day}`).getDay()];

};



function fetchWeatherData() {


    fetch(`http://api.weatherapi.com/v1/current.json?key=aa133efaf30444eda6e90542231801&q=${cityInput}&q=India`)

        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176C";
            feelsLikeOutput.innerHTML = data.current.feelslike_c + "&#176C"


            conditionOutput.innerHTML = data.current.condition.text;
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 7));
            const d = parseInt(date.substr(8, 10));


            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`;

            
            // hrEle = parseInt(date.substr(11, 13));
            // minEle = parseInt(date.substr(14, 16));

            // if (hrEle >= 0 && hrEle <= 24 && minEle >= 0 && minEle <= 60) {
                //     let AMorPM = 'AM';
                //     if (hrEle > 12) AMorPM = 'PM';
                //     hrEle = (hrEle % 12);
                //     hrEle + ' : ' + minEle + ' ' + AMorPM;
                //     timeOutput.innerHTML = hrEle + ' : ' + minEle + ' ' + AMorPM;;
                // }
                
            var time = date.substr(11);
            time = time.split(":");

            var hours = parseInt(time[0]);
            var AmOrPm = hours >= 12 ? 'AM' : 'PM';
            hours = (hours % 12) || 12;
            var minutes = parseInt(time[1]);
            timeOutput.innerHTML = hours + ':' + minutes + ' ' + AmOrPm;


            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

            icon.src = "icons/" + iconId;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%"
            windOutput.innerHTML = data.current.wind_kph + " km/hr"




            let timeOfDay = "day";

            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "Night";
            }

            if (code == 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#e5a92";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }

            }

            else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }

            else if (code == 1063 || code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1204 || code == 1207 || code == 1240 || code == 1243 || code == 1246 || code == 1249 || code == 1252) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";

                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }
            }

            else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            app.style.opacity = "1";
        })

        .catch(() => {
            alert("City not found , please try again");
            app.style.opacity = "1";
        });

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=aa133efaf30444eda6e90542231801&q=${cityInput}&q=India`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            maxTempOutput.innerHTML = data.forecast.forecastday[0].day.maxtemp_c + "&#176C"
            minTempOutput.innerHTML = data.forecast.forecastday[0].day.mintemp_c + "&#176C"
            sunriseOutput.innerHTML = data.forecast.forecastday[0].astro.sunrise
            sunsetOutput.innerHTML = data.forecast.forecastday[0].astro.sunset


        })
}

function celsiusToFahrenheit(temperature) {
    return ((temperature * 9 / 5) + 32).toFixed(1);
}

function fahrenheitToCelsius(temperature) {
    return ((temperature - 32) * 5 / 9).toFixed(1);
}

temp.addEventListener("click", function () {

    if (temp.innerHTML.endsWith("C")) {
        temp.innerHTML = celsiusToFahrenheit(parseFloat(temp.innerHTML)) + "&#176F";
        feelsLikeOutput.innerHTML = celsiusToFahrenheit(parseFloat(feelsLikeOutput.innerHTML)) + "&#176F"
        maxTempOutput.innerHTML = celsiusToFahrenheit(parseFloat(maxTempOutput.innerHTML)) + "&#176F"
        minTempOutput.innerHTML = celsiusToFahrenheit(parseFloat(minTempOutput.innerHTML)) + "&#176F"


    }
    else if (temp.innerHTML.endsWith("F")) {
        temp.innerHTML = fahrenheitToCelsius(parseFloat(temp.innerHTML)) + "&#176C";
        feelsLikeOutput.innerHTML = fahrenheitToCelsius(parseFloat(feelsLikeOutput.innerHTML)) + "&#176C"
        maxTempOutput.innerHTML = fahrenheitToCelsius(parseFloat(maxTempOutput.innerHTML)) + "&#176C"
        minTempOutput.innerHTML = fahrenheitToCelsius(parseFloat(minTempOutput.innerHTML)) + "&#176C"
    }
});

fetchWeatherData();
app.style.opacity = "1";

