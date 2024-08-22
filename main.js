//Function to only read this script when the entire html file has been loaded
$(document).ready(function(){

let city = "";

$("#search_button").click(function(){
    city = $("#search_text").val();
    weatherAPI();
})

function weatherAPI(){
    
    const access_key = 'API_KEY';
    const days = 5;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${access_key}&q=${city}&days=${days}`;

    // execute the conversion using the "convert" endpoint:
        $.ajax({
            url: url, 
            method: 'GET',
            success: function(data) {

                const forecastDays = data.forecast.forecastday;

                // Clear previous data
                $(".dates").empty();

                // Display the weather information
                forecastDays.forEach(day => {
                    const date = day.date;
                    const avgTemp = day.day.avgtemp_c;

                //append the data
                $(".dates").append(`
                    <div class='day'>
                        <p class='date'>${date}</p>
                        <p class='temperature'>${avgTemp}°C</p>
                        <p class='advice'>maybe stay inside</p>
                    </div>
                `);

                });
            },
            error: function(error) {
                console.error('Error fetching the weather data:', error);
            }
        });
    }
});