var cityNames = [];
if(localStorage.getItem("city-names") !== null){
    cityNames = JSON.parse(localStorage.getItem("city-names"));
}

function createCityList(event){
    event.preventDefault();

    addCity();
    renderButtons();
}

function addCity(){
    var cityName = $("#city-name").val();
    cityNames.push(cityName);
    localStorage.setItem("city-names", JSON.stringify(cityNames));
    renderWeather(cityName);
    // renderFiveDayForecast(cityName);
}

function renderButtons(){
    $("#city-list").empty();

    for(var i = 0; i < cityNames.length ; i++){
        var button = $("<div>")
        button.addClass("list-button btn col-md-12 bg-white border");
        button.text(cityNames[i]);
        $("#city-list").prepend(button);
    }
}

function renderWeather(city){
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=2cf011e0ff0bddcd3b775b324d2a19d4";

    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function(response){
        var currentWeather = $("#current-weather");
        currentWeather.empty();

        var cityName = $("<h1>");
        cityName.text(response.name + "(" + moment().format('L') + ")");


        var weatherImg = $("<img>");
        weatherImg.attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon +"@2x.png");


        var temperature = $("<p>");
        temperature.text("Temperature: " + response.main.temp);


        var humidity = $("<p>");
        humidity.text("Humidity: " + response.main.humidity);


        var windSpeed = $("<p>");
        windSpeed.text("Wind Speed: " + response.wind.speed);

        currentWeather.append(cityName);
        currentWeather.append(weatherImg);
        currentWeather.append(temperature);
        currentWeather.append(humidity);
        currentWeather.append(windSpeed);

        uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lon + "&lon=" + response.coord.lat +"&appid=2cf011e0ff0bddcd3b775b324d2a19d4";

        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function(response){
            var currentWeather = $("#current-weather");

            var uvIndex = $("<p>");
            uvIndex.text("UV Index: " + response.value);
            currentWeather.append(uvIndex);
        });
    });

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=2cf011e0ff0bddcd3b775b324d2a19d4";

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){
        var fiveDay = $("#five-day");
        fiveDay.empty();
        
        for(var i = 0; i < response.list.length; i = i+=8){
            var date = response.list[i].dt_txt;
            var forcastDate = new Date(date).toLocaleDateString('en-US');

            var dayCard = $("<div>");
            dayCard.addClass("card col-md-2 ml-3 text-white bg-primary");

            var dayContent = $("<div>");
            dayContent.addClass("text-center");
            dayContent.addClass("card-body");

            var dateDiv = $("<h4>");
            dateDiv.text(forcastDate);

            var dayImg = $("<img>");
            dayImg.attr("src", "http://openweathermap.org/img/wn/"+response.list[i].weather[0].icon +"@2x.png");

            var temperature = $("<p>");
            temperature.text("Temperature: " + response.list[i].main.temp);
    
    
            var humidity = $("<p>");
            humidity.text("Humidity: " + response.list[i].main.humidity);

            fiveDay.append(dayCard);
            dayCard.append(dayContent);
            dayContent.append(dateDiv);
            dayContent.append(dayImg);
            dayContent.append(temperature);
            dayContent.append(humidity);
        }
    });
}

function renderWeatherFromHistory(){
    var cityName = $(this).text();
    renderWeather(cityName);
    // renderFiveDayForecast(cityName);
}

renderWeather(cityNames[cityNames.length-1]);
renderButtons();
$("#city-search").on("submit",createCityList);
$(document).on("click", ".list-button", renderWeatherFromHistory);