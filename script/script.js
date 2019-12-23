var cityArray = []

var citySearch = document.querySelector(".citySearch")




citySearch.addEventListener("click", create)
function create (e, search){
        $(".allWeather").css("visibility", "visible")
        $(".allWeather").css("overflow-x", "visible")
        $(".weatherPresent").css("visibility", "visible")
        $(".weatherFuture").css("visibility", "visible")
        e.preventDefault()
        var city
        if (search) {
           city = search 
        } else {
             city = $(".cityInput").val() 
        }
       

        var currentdate = new Date();
        var date = currentdate.getMonth()+1 + "-" + currentdate.getDate() 
        var lato = ""
        var lono = ""
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"
       
        $.ajax ({
            url: queryURL,
            method: "GET"
            }).then(function(response){
        
            var cityName = response.name
        
            addCity(cityName)
            $(".weatherPresent").empty()
            $(".weatherFuture").empty()
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
        

            $(".weatherPresent").append(tempurdivHead) 
            $(".weatherPresent").append(tempurd) 
            $(".weatherPresent").append(humiddivHead) 
            $(".weatherPresent").append(humidd) 
            $(".weatherPresent").append(winddivHead) 
            $(".weatherPresent").append(windd)
            uv(lato, lono) 
            day5weather(city)
            storecity (cityArray)
             
        })
    
        
}

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

function addCity(cityNameString) {
    
    if($.inArray(cityNameString, cityArray) !== -1) {
       
    } else {
    
    
    if (cityArray.length >= 5) {
            cityArray = [cityNameString].concat(cityArray.slice(0,4))
       
        } else {
            cityArray.unshift(cityNameString)
          
        }
    }
}

function day5weather (a) {
    var day5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + a + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"
    
    $.ajax({
        url: day5,
        method: "GET"
    }).then(function(response){
  
        for (i=0; i<40; i++) {
            timeOfDay = response.list[i].dt_txt
      
            if (timeOfDay.indexOf("12:00:00") !== -1) {
                
                var days = response.list[i]
                var strSplit1 = timeOfDay.split(" ")
                var strSplit2 = strSplit1[0].split("-")
                var dates = strSplit2[1] + "-" + strSplit2[2]
                
                var parent = $("<div></div>").addClass("future parent" + i)
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
                document.querySelector(".weatherFuture").scrollIntoView()

            }
        }
    })
}

function storecity (a) {
    $(".searchHistory").empty()
 
    for (i = 0; i < a.length; i++) {
       var cityNameDivs = $("<button></button>").addClass("citySearched").text(a[i]).on("click", searched);

       $(".searchHistory").append(cityNameDivs)
    }
}

function searched (e){
  e.preventDefault()
    var searchPushed = $(this).text() 

    create(e, searchPushed)
}