

var citySearch = document.querySelector(".citySearch")
citySearch.addEventListener("click", function(e){
        e.preventDefault()
        var city = $(".cityInput").val()
        var currentdate = new Date();
        var date = currentdate.getMonth()+1 + "-" + currentdate.getDate() 
        var lato = ""
        var lono = ""
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"
        //var day5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"
        //var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=654c88e2f3602b7e34cbe1a0f99b9ef0&lat=" + lat + "&lon=" + lon
        $.ajax ({
            url: queryURL,
            method: "GET"
            }).then(function(response){
            console.log(response)
            var cityName = response.name
            lato = response.coord.lat
            lono = response.coord.lon

            var citydiv = $("<div></div>").addClass("city")
            var cityd = citydiv.append(cityName)
            $(".weatherPresent").append(cityd) 

            var currentdateDive = $("<div></div>").addClass("date").text(date)
            $(".weatherPresent").append(currentdateDive) 

            var iconcode = response.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            
            var iconimg = $("<img>").attr("src", iconurl)
            $(".weatherPresent").append(iconimg) 
            
            var tempur = response.main.temp + " ℉"
            var humid = response.main.humidity + "%"
            var wind = response.wind.speed + " mph"

            var tempurdiv = $("<div></div>").addClass("tempNum")
            var humiddiv = $("<div></div>").addClass("humidNum")
            var winddiv = $("<div></div>").addClass("windNum")

            var tempurdivHead = $("<div></div>").addClass("weatherHead").text("Temp")
            var humiddivHead = $("<div></div>").addClass("weatherHead").text("Humidity")
            var winddivHead = $("<div></div>").addClass("weatherHead").text("Wind Speed")

            var tempurd = tempurdiv.append(tempur)
            var humidd = humiddiv.append(humid)
            var windd = winddiv.append(wind)
            console.log(tempurd)

            $(".weatherPresent").append(tempurdivHead) 
            $(".weatherPresent").append(tempurd) 
            $(".weatherPresent").append(humiddivHead) 
            $(".weatherPresent").append(humidd) 
            $(".weatherPresent").append(winddivHead) 
            $(".weatherPresent").append(windd)
            uv(lato, lono) 
            day5weather(city)
             
        })
    
        
})

function uv (a, b) {
    var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?APPID=654c88e2f3602b7e34cbe1a0f99b9ef0&lat=" + a + "&lon=" + b 

    $.ajax({
        url: uvIndex,
        method: "GET"
    }).then(function(response){
        var uv = response.value
        var uvHead = "UV Index"

        var uvDiv = $("<div></div>").addClass("uvNum")
        var uvDivHead = $("<div></div>").addClass("weatherHead")

        var uvAll = uvDiv.append(uv)
        var uvHeader = uvDivHead.append(uvHead)

        $(".weatherPresent").append(uvHeader)
        $(".weatherPresent").append(uvAll)

    })
}

function day5weather (a) {
    var day5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + a + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"
   
    $.ajax({
        url: day5,
        method: "GET"
    }).then(function(response){
        console.log(response)
        for (i=0; i<40; i++) {
            timeOfDay = response.list[i].dt_txt
            //console.log(timeOfDay)
            if (timeOfDay.indexOf("12:00:00") !== -1) {
                
                var days = response.list[i]
                console.log(response.list[i])

                var strSplit1 = timeOfDay.split(" ")
                console.log(strSplit1)
                var strSplit2 = strSplit1[0].split("-")
                console.log(strSplit2)

                var dates = strSplit2[1] + "-" + strSplit2[2]
                
                var parent = $("<div></div>").addClass("parent" + i)
                var datesDiv = $("<div></div>").addClass("date5").text(dates)
                $(parent).append(datesDiv)
 
                var iconcode = days.weather[0].icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            
                var iconimg = $("<img>").attr("src", iconurl)
                $(parent).append(iconimg) 

                var tempurdiv = $("<div></div>").addClass("tempNum5").text(days.main.temp + " ℉")
                var humiddiv = $("<div></div>").addClass("humidNum5").text(days.main.humidity + "%")

                var tempurdivHead = $("<div></div>").addClass("weatherHead5").text("Temp")
                var humiddivHead = $("<div></div>").addClass("weatherHead5").text("Humidity")

                
                
                
                $(parent).append(tempurdivHead)
                $(parent).append(tempurdiv)
                $(parent).append(humiddivHead) 
                $(parent).append(humiddiv) 

                $('.weatherFuture').append(parent)

            }
        }

    })


}
