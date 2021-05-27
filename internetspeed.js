//##### HTTP5103 - Web Programming - Pet Project File 1 #####
window.onload = function(){
//Defining variables
var settingsform = document.forms.settingsform;
console.log(settingsform);

var minimumspeed;
var refreshtimelimit;
var sessionhours;
//settingsform = document.forms.settingsform;
 settingsform.onsubmit = processStart;


function processStart() { 
    minimumspeed = settingsform.minimumspeedlimit.value;
    refreshtimelimit = settingsform.refreshlimit.value;
    sessionhours = settingsform.sessiontime.value;
    createCookie("minimumspeed", minimumspeed, 60 * 60 * sessionhours);
    createCookie("refreshtimelimit", refreshtimelimit, 60 * 60 * sessionhours);    
    window.location = "speedtesting.html";
 return false;
}   

//function to create cookie
function createCookie(minimumspeed, value, lifespan) {
    document.cookie = `${minimumspeed}=${value};max-age=${60 * 60 * sessionhours}`;
}

//Funtion to delete stored cookies
function deletecookie() {
    document.cookie = "minimumspeed=;max-age=0";
    document.cookie = "color=;max-age=0";
}

}