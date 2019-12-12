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
    var city = $("#city-name").val();
    cityNames.push(city);
    localStorage.setItem("city-names", JSON.stringify(cityNames));
}

function renderButtons(){
    $("#city-list").empty();

    for(var i = 0; i < cityNames.length ; i++){
        var button = $("<div>")
        button.addClass("btn col-md-12 bg-white border");
        button.text(cityNames[i]);
        $("#city-list").append(button);
    }
}

renderButtons();
$("#city-search").on("submit",createCityList);