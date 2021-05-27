//##### HTTP5103 - Web Programming - Pet Project #####

//To check if exisiting cookie exist for returning user
var existingCookie = getCookie("minimumspeed");

//Asking user to input minimum speed limit in mbps
if (!existingCookie) {
    var minimumspeed = prompt("Please Enter the Minimum Speed Limit (in Mbps) You Want to get Notified.");
    if (minimumspeed === null) {
        //if user do not opt and click cancel
        alert("You have cancelled.");
        console.log("User Cancelled at start");
    }
    // while loop to ask again and again for the valid number
    else {
        while (minimumspeed < 1 || minimumspeed === "" || isNaN(minimumspeed)) {
            var minimumspeed = prompt("Please Enter Speed in Mbps!");
            console.log("Invalid Entry"); // to record the number of failed attempts
        }
    }

    //Asking user to input session time in hours for how long the cookie should be kept
    var sessionhours = prompt("Please Enter Session Time (in Hours) You Want to Monitor.");
    if (sessionhours === null) {
        //if user do not opt and click cancel
        alert("You have cancelled.");
        console.log("User Cancelled at start");
    }
    // while loop to ask again and again for the valid number
    else {
        while (sessionhours < 1 || sessionhours === "" || isNaN(sessionhours)) {
            var sessionhours = prompt("Please Enter Hours!");
            console.log("Invalid Entry"); // to record the number of failed attempts
        }
    }
    //creating cookie for minimum sped and session time entered by user
    createCookie("minimumspeed", minimumspeed, sessionhours);
    console.log(document.cookie);

    var refreshtimelimit = prompt("Please Enter Time (in Seconds) You Want to Check and Refresh Speed.");
    if (refreshtimelimit === null) {
        //if user do not opt and click cancel
        alert("You have cancelled.");
        console.log("User Cancelled at start");
    }
    // while loop to ask again and again for the valid number
    else {
        while (refreshtimelimit < 1 || refreshtimelimit === "" || isNaN(refreshtimelimit)) {
            var refreshtimelimit = prompt("Please Enter Seconds!");
            console.log("Invalid Entry"); // to record the number of failed attempts
        }
    }
    //creating cookie for refreshing time limit with the same session hour
    createCookie("refreshtimelimit", refreshtimelimit, sessionhours);
    console.log(document.cookie);
}

//function to create cookie
function createCookie(minimumspeed, value, lifespan) {
    document.cookie = `${minimumspeed}=${value};max-age=${60 * 60 * sessionhours}`;
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

//Funtion to delete stored cookies
function deletecookie() {
    document.cookie = "minimumspeed=;max-age=0";
    document.cookie = "color=;max-age=0";
}
//document.getElementById('reset').onclick = deletecookie;

var imageAddr = "https://danyal-web-development-practice.000webhostapp.com/speed-monitor/IMG_20200616_205357315.jpg";
var downloadSize = 3040000; //bytes

//Getting system time to show timestamp
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    } // add zero in front of numbers < 10
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
// parts of this are taken from internet through research

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

    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
    };

    startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

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
            var snd = new Audio('https://danyal-web-development-practice.000webhostapp.com/speed-monitor/Beep-Ping.mp3');
        snd.play();
            speed.style.color = "red";
            alert("Your Internet speed is below " + getCookie("minimumspeed") + " Timestamp: " + time);
            console.log("Speed below " + getCookie("minimumspeed") + " " + time);
        }

        document.getElementById("reset").addEventListener("click", deletecookie);
    }

    //call function to reload page on the basis of user input saved as cookie
    onload = AutoRefresh(1000 * getCookie("refreshtimelimit"));
}

//function for auto refreshing the page
function AutoRefresh(t) {
    setTimeout("location.reload();", t);
}
