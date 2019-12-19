var citySearch = document.querySelector(".citySearch")
var currentdate = new Date();
var date = currentdate.getDate() 
var dateArray = []

var city 

citySearch.addEventListener("click", function(e){
        e.preventDefault()
        var city = $(".cityInput").val()
        console.log(city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"
        var day5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"

        $.ajax ({
            url: queryURL,
            method: "GET"
            }).then(function(response){
            console.log(response)
            var cityName = response.name
            
            var citydiv = $("<div></div>").addClass("city")
            var cityd = citydiv.append(cityName)
            $(".weatherPresent").append(cityd) 
            
            var iconcode = response.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            
            var iconimg = $("<img>").attr("src", iconurl)
            console.log(iconimg)
           
            $(".weatherPresent").append(iconimg) 
            
            var tempur = response.main.temp + " ℉"
            var humid = response.main.humidity + "%"
            var wind = response.wind.speed + " mph"
            
            var tempurdiv = $("<div></div>").addClass("temp")
            var humiddiv = $("<div></div>").addClass("humid")
            var winddiv = $("<div></div>").addClass("wind")

            var tempurd = tempurdiv.append(tempur)
            var humidd = humiddiv.append(humid)
            var windd = winddiv.append(wind)
            console.log(tempurd)

            $(".weatherPresent").append(tempurd) 
            $(".weatherPresent").append(humidd) 
            $(".weatherPresent").append(windd)               
           
    })
        



})

