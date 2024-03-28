

const apiKey = "280d01b7d5f2fdca26e646fff88ee520";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDetailsCard = document.querySelector(".details-card");

async function fetchCityDetails(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }
        const data = await response.json();
        displayCityDetails(data);
    } catch (error) {
        console.error('Error fetching city details:', error.message);
        // Display an error message to the user
    }
}

function displayCityDetails(data) {
    const temperatureElement = document.querySelector(".temp");
    const temperatureValue = Math.round(data.main.temp);

    document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = (data.wind.speed) * 2 + "km/h";
    document.querySelector(".weather-state").innerHTML = "Weather : " + data.weather[0].main;

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
        showCloudyDetails(data);

    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzel.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Humidity") {
        weatherIcon.src = "images/humidity.png";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
    } else if (data.weather[0].main == "Wind") {
        weatherIcon.src = "images/wind.png";
    }

    document.querySelector(".weather").style.display = "block";

    
    // Change the color based on temperature range
    if (temperatureValue < 10) {
        temperatureElement.style.color = "blue";
    }
     else if (temperatureValue > 10 && temperatureValue <= 20) {
        temperatureElement.style.color = "green";
    } 
    else if (temperatureValue > 20 && temperatureValue <= 30) {
        temperatureElement.style.color = "orange";
    } 
    else {
        temperatureElement.style.color = "red";
    }

    // Update temperature value
    temperatureElement.innerHTML = temperatureValue + "°C";
}

searchBtn.addEventListener("click", () => {
    fetchCityDetails(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchCityDetails(searchBox.value);
    }
});

    