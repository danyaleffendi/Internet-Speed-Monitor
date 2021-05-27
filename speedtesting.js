//##### HTTP5103 - Web Programming - Pet Project File 2 #####

//To check if exisiting cookie exist for returning user
var existingCookie = getCookie("minimumspeed");

if (!existingCookie) {
window.location = "internetspeed.html";
}

//function to call cookie
function getCookie(minimumspeed) {
    minimumspeed = minimumspeed + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
        var cookieElement = cookieArray[i];
        while (cookieElement.charAt(0) == " ") {
            cookieElement = cookieElement.substring(1);
        }
        if (cookieElement.indexOf(minimumspeed) == 0) {
            return cookieElement.substring(minimumspeed.length, cookieElement.length);
        }
    }
    return "";
}

//Funtion to delete stored cookies and redirect to settings page
function deletecookie() {
    document.cookie = "minimumspeed=;max-age=0";
    document.cookie = "refreshtimelimit=;max-age=0";
    window.location = "internetspeed.html";
}

//Variables with values ofr Image used to calculate download speed
var imagelink = "https://danyal-web-development-practice.000webhostapp.com/speed-monitor/IMG_20200616_205357315.jpg";
var downloadSize = 3040000; //bytes

//Getting system time to show timestamp & Adding zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
var today = new Date();
var time = checkTime(today.getHours()) + ":" + checkTime(today.getMinutes()) + ":" + checkTime(today.getSeconds());

//function to show progress message in console log
function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
}

//function to detect internet speed on the basis of download
// some parts of this were seen on internet and taken inspiration from

function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
}

if (window.addEventListener) {
    window.addEventListener("load", InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = new Date().getTime();
        showResults();
    };
//Incase of error while reaching to image
    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
        var error = document.getElementById("speed");
        error.innerHTML = "Verification failed. Trying Again.";
    };

    startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imagelink + cacheBuster;

    var speedlimit = document.getElementById("speedlimit");
    speedlimit.innerHTML = getCookie("minimumspeed");

    //function to show results
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        ShowProgressMessage(["Your connection speed is:", speedBps + " bps", speedKbps + " kbps", speedMbps + " Mbps"]);

        //using DOM to customize results
        var speed = document.getElementById("speed");
        speed.innerHTML = speedMbps;
        speed.style.color = "green";
        speed.style.fontSize = 60 + "px";
        speed.style.padding = 0 + "px";

        //Alert with change in color in result if actual speed is lower then the limit on the basis of saved cookie value
        if (speedMbps < getCookie("minimumspeed")) {
            var audio = document.getElementById('beep'); 
                function play(){ 
                    audio.play() 
                }
            speed.style.color = "red";         
            alert("Your Internet speed is below " + getCookie("minimumspeed") + " Mbps. Timestamp: " + time);
            console.log("Speed below " + getCookie("minimumspeed") + " " + time);
            
        }

//Action on Reset button to delete cookies
        document.getElementById("reset").addEventListener("click", deletecookie);
    }

    //call function to reload page on the basis of user input saved as cookie
    onload = AutoRefresh(1000 * getCookie("refreshtimelimit"));
}

//function for auto refreshing the page
function AutoRefresh(t) {
    setTimeout("location.reload();", t);
}
