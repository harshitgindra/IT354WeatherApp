//to get the details
function fetchWeatherDetails() {
    //empty the table with any previous data
    $("#records_table").empty();
    document.getElementById("link").innerHTML = "";
    var display;
    var city = document.getElementById("station1").value;
    //preparing the link with the input
    var link = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&mode=json';
    //ajax call for fetching API data
    $.ajax({
        type: 'GET',
        url: link,
        dataType: 'html',
        //If fetching was successful, success function will run
        success: function (data) {
            //parsing retrieved json data
            var json = $.parseJSON(data);
            var code = json.cod;
            //verifying if the data fetched in legitimate and correct
            if (code == 200) {
                //fetching data for display
                //  display = "<table border='1' data-role=\"table\" data-mode=\"columntoggle\" class=\"ui-responsive\" id=\"myTable\">";
                display += "<thead><tr><th>Date</th><th>Image</th><th>Min Temperature</th><th>Max Temperature</th><th>Humidity</th><th>Description</th></tr></thead><tbody>";

//                display += "<tr>";
//                display += "<td>" + json.list[0].dt_txt.substring(0, 10) + "</td>";
//                display += "<td><img src='http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png'/></td>";
//                display += "<td>" + json.list[0].main.temp_min + "</td>";
//                display += "<td>" + json.list[0].main.temp_max + "</td>";
//                display += "<td>" + json.list[0].main.humidity + "</td>";
//                display += "<td>" + json.list[0].weather[0].description + "</td>";
//                display += "</tr>";
                for (var i = 0; i < json.list.length; i++) {
                    //getting data for midnight for each of the 5 days
                    if ((json.list[i].dt_txt).indexOf("12:00:00") != -1) {
                        display += "<tr>";
                        display += "<td>" + json.list[i].dt_txt.substring(0, 10) + "</td>";
                        display += "<td><img src='http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png'/></td>";
                        display += "<td>" + json.list[i].main.temp_min + "</td>";
                        display += "<td>" + json.list[i].main.temp_max + "</td>";
                        display += "<td>" + json.list[i].main.humidity + "</td>";
                        display += "<td>" + json.list[i].weather[0].description + "</td>";
                        display += "</tr>";
                    }
                }
                display += "</tbody>";
                //appending data to page
                $('#records_table').append(display);
                document.getElementById("link").innerHTML = "<h2>" + json.city.name + "," + json.city.country + "</h2>";
            }
            //for invalid data received
            else {
                var disp = "<h2>Invalid City entered</h2>";
                document.getElementById("link").innerHTML = disp;
            }
        },
        //any kind of error during fetching.
        error: function (x, e) {
            alert("Error. Please check internet connectivity");
        }
    });
}

var y = document.getElementById("demo");

function clearAll() {
    y.innerHTML = "";
}

var x = document.getElementById("link");
//fetching the geolocation of the IP address
function getLocations() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

    // preparing the display. position object provides the latititude and longitude.
    //reference w3 schools
    //link : http://www.w3schools.com/html/html5_geolocation.asp
    var dos = "<h2><bold>Latitude:</bold></h2> " + position.coords.latitude + "<br><h2><bold>Longitude:</bold></h2> " + position.coords.longitude;
    document.getElementById("demo").innerHTML = dos;
}