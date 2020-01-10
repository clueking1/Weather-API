var cityArray = []
var cityLocalArray = []
var citySearch = document.querySelector(".citySearch")
var cityLocal = localStorage.getItem("city")
var cityLocalArray
localStorage.getItem("cityArray")

//localStorage.setItem("cityArray", cityLocalArray)

cityLocalArray.push(cityLocal)
cityStorage ()


function cityStorage () {
    //e.preventDefault()
   if (!cityLocal) {

   } else {
   
    cityLocalArray = cityLocal.split(",")

    for (i = 0; i < cityLocalArray.length; i++) {
        var cityNameDivs = $("<button></button>").addClass("citySearched").text(cityLocalArray[i]).on("click", searched);
 
        $(".searchHistory").append(cityNameDivs)
     }
   } 

  //var search = cityLocalArray[0]
   //create(search)

   
}

citySearch.addEventListener("click", create)
function create (e, search){
    //e.preventDefault()
      
  
    
        $(".allWeather").css("visibility", "visible")
        $(".allWeather").css("overflow-x", "visible")
        $(".clouds").css("height", "38%")
        $(".weatherPresent").css("visibility", "visible")
        $(".weatherFuture").css("visibility", "visible")
        $(".dayHeader").css("display", "inline")
        //console.log(e)
       
        
        var city
        if (search) {
           city = search 
        } else {
            city = $(".cityInput").val() 
        }
       e.preventDefault()

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

            var presentDiv = $("<div></div>").addClass("fade weatherpres")
            var citydiv = $("<div></div>").addClass("city")
            var cityd = citydiv.append(cityName)
            $(presentDiv).append(cityd) 

            var currentdateDive = $("<div></div>").addClass("date").text(date)
            $(presentDiv).append(currentdateDive) 

            var iconcode = response.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            
            var iconimg = $("<img>").attr("src", iconurl).addClass("daysImg")
            $(presentDiv).append(iconimg) 
            
            var tempur = Math.floor(response.main.temp) + " ℉"
            var humid = response.main.humidity + "%"
            var wind = Math.floor(response.wind.speed) + " mph"

            var tempurdiv = $("<div></div>").addClass("tempNum")
            var humiddiv = $("<div></div>").addClass("humidNum")
            var winddiv = $("<div></div>").addClass("windNum")

            //var tempurdivHead = $("<div></div>").addClass("weatherHead").text("Temp")
            var humiddivHead = $("<div></div>").addClass("weatherHead1").text("Humidity")
            var winddivHead = $("<div></div>").addClass("weatherHead2").text("Wind Speed")

            var tempurd = tempurdiv.append(tempur)
            var humidd = humiddiv.append(humid)
            var windd = winddiv.append(wind)
        

            //$(presentDiv).append(tempurdivHead) 
            $(presentDiv).append(tempurd) 
            $(presentDiv).append(humiddivHead) 
            $(presentDiv).append(humidd) 
            $(presentDiv).append(winddivHead) 
            $(presentDiv).append(windd)

            $(".weatherPresent").append(presentDiv)
            uv(lato, lono, presentDiv) 
            day5weather(city)
            storecity (cityArray)
        
           
             
        })
  
}

function uv (a, b, presentDiv) {
    var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?APPID=654c88e2f3602b7e34cbe1a0f99b9ef0&lat=" + a + "&lon=" + b 

    $.ajax({
        url: uvIndex,
        method: "GET"
    }).then(function(response){
        var uv = response.value
        var uvHead = "UV Index"

        var uvDiv = $("<div></div>").addClass("uvNum")
        var uvDivHead = $("<div></div>").addClass("weatherHead3")

        var uvAll = uvDiv.append(uv)
        var uvHeader = uvDivHead.append(uvHead)

        $(presentDiv).append(uvHeader)
        $(presentDiv).append(uvAll)

        $(".weatherPresent").append(presentDiv)



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
    localStorage.setItem("city", cityArray)
}

function day5weather (a) {
    var day5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + a + ",us&units=imperial&APPID=654c88e2f3602b7e34cbe1a0f99b9ef0"
 
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
                
                var parent = $("<div></div>").addClass("future mySlides fade parent" + i)
                var datesDiv = $("<div></div>").addClass("date5").text(dates)
                $(parent).append(datesDiv)
 
                var iconcode = days.weather[0].icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            
                var iconimg = $("<img>").attr("src", iconurl)
                $(parent).append(iconimg) 

                var tempurdiv = $("<div></div>").addClass("tempNum5").text(Math.floor(days.main.temp) + " ℉")
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
        plusSlides(0)
    
    })
}

function storecity (a) {
    //localStorage.setItem("city", a)
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

//function slides ()
var slideIndex = 1;

//showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
 
  var dots = document.getElementsByClassName("dot");

  
  console.log(slides.length)
  if (n > slides.length) {slideIndex = 1
   //slides[slideIndex-1].style.display = "block";
}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      $(slides[i]).css("display", "none")
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  $(slides[slideIndex-1]).css("display", "block")
  dots[slideIndex-1].className += " active";
}

