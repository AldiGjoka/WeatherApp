// Variablat const
const notificationMoti = document.querySelector(".notification");
const iconMoti = document.querySelector(".weather-icon img");
const tempMoti = document.querySelector(".temperature-value");
const pershkrimMoti = document.querySelector(".temperature-description");
const locationMoti = document.querySelector(".location");
let key = "4d3e2f62f901eeb05002fc865fa85b52";
let gjatesi;
let gjeresi;

getLocation(); 

// Get user location

function getLocation(){
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        notificationMoti.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position){
    gjatesi = position.coords.latitude;
    gjeresi = position.coords.longitude;
    fetchData(gjatesi, gjeresi);
    // Funksioni per marrjen e te dhenave per 5 dite
    fetchDataPeseDite(gjatesi, gjeresi);
}


function showError(error){
    notificationMoti.style.display = "block";
    notificationMoti.innerHTML = "<p>User doesn't share their location</p>";
}

// Marrja e te dhenave nga api
function fetchData(gjatesi, gjeresi){
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' +gjatesi+'&lon='+gjeresi+'&appid=4d3e2f62f901eeb05002fc865fa85b52&units=metric')
    .then(response => response.json())
    .then(data => changeElements(data));
}

// Ndryshimi i elementeve
function changeElements(data){
    iconMoti.src = "icons/" + data.weather[0].icon + ".png";
    tempMoti.innerHTML = "<p>"+ data.main.temp + "°<span>C</span></p>";
    pershkrimMoti.innerHTML = "<p>" + data.weather[0].main + "</p>";
    locationMoti.innerHTML = "<p>" + data.name +", " + data.sys.country + "</p>";
}



/* *********************************************************************/


// Marrja e elementeve
const titulliDitaEPare = document.querySelector(".titulliDitaEPare");
const ikonaDitaEPare = document.querySelector(".ikonaDitaEPAre img");
const tempDitaEPare = document.querySelector(".tempDitaEPare");
const pershkrimiDitaEPare = document.querySelector(".pershkrimiDitaEPare");

const titulliDitaEDyte = document.querySelector(".titulliDitaEDyte");
const ikonaDitaEDyte = document.querySelector(".ikonaDitaEDyte img");
const tempDitaEDyte = document.querySelector(".tempDitaEDyte");
const pershkrimiDitaEDyte = document.querySelector(".pershkrimiDitaEDyte");

const titulliDitaETrete = document.querySelector(".titulliDitaETrete");
const ikonaDitaETrete = document.querySelector(".ikonaDitaETrete img");
const tempDitaETrete = document.querySelector(".tempDitaETrete");
const pershkrimiDitaETrete = document.querySelector(".pershkrimiDitaETrete");

const titulliDitaEKatert = document.querySelector(".titulliDitaEKatert");
const ikonaDitaEKatert = document.querySelector(".ikonaDitaEKatert img");
const tempDitaEKatert = document.querySelector(".tempDitaEKatert");
const pershkrimiDitaEKateret = document.querySelector(".pershkrimiDitaEKateret");

let listaEDiteveTEJaves = [];
let listaEIconaveTeJaves = [];
let listaETempTeJaves = [];
let listaEPershkrimit = [];


// Marrja e te dhenave per 5 dite
function fetchDataPeseDite(gjatesi, gjeresi){
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + gjatesi + '&lon=' + gjeresi + '&appid=4d3e2f62f901eeb05002fc865fa85b52&units=metric')
    .then(response => response.json())
    .then(data => ndryshoElementetPerPeseDite(data));
};


// Ndryshimi i elementeve per 5 dite
function ndryshoElementetPerPeseDite(data){
    for(let i = 0; i < data.list.length; i++){
        calculateDate(data.list[i]);
    }

    titulliDitaEPare.innerHTML = "<p>" + listaEDiteveTEJaves[1] + "</p>";
    ikonaDitaEPare.src = "icons/" + listaEIconaveTeJaves[1] + ".png";
    tempDitaEPare.innerHTML = "<p>" + listaETempTeJaves[1] + "°<span>C</span></p>";
    pershkrimiDitaEPare.innerHTML = "<p>" + listaEPershkrimit[1] + "</p>";

    titulliDitaEDyte.innerHTML = "<p>" + listaEDiteveTEJaves[2] + "</p>";
    ikonaDitaEDyte.src = "icons/" + listaEIconaveTeJaves[2] + ".png";
    tempDitaEDyte.innerHTML = "<p>" + listaETempTeJaves[2] + "°<span>C</span></p>";
    pershkrimiDitaEDyte.innerHTML = "<p>" + listaEPershkrimit[2] + "</p>";

    titulliDitaETrete.innerHTML = "<p>" + listaEDiteveTEJaves[3] + "</p>";
    ikonaDitaETrete.src = "icons/" + listaEIconaveTeJaves[3] + ".png";
    tempDitaETrete.innerHTML = "<p>" + listaETempTeJaves[3] + "°<span>C</span></p>";
    pershkrimiDitaETrete.innerHTML = "<p>" + listaEPershkrimit[3] + "</p>";

    titulliDitaEKatert.innerHTML = "<p>" + listaEDiteveTEJaves[4] + "</p>";
    ikonaDitaEKatert.src = "icons/" + listaEIconaveTeJaves[4] + ".png";
    tempDitaEKatert.innerHTML = "<p>" + listaETempTeJaves[4] + "°<span>C</span></p>";
    pershkrimiDitaEKateret.innerHTML = "<p>" + listaEPershkrimit[4] + "</p>";
};

// Llogaritja e dates, temperatures per 5 dite
function calculateDate(data){
    let dataERe = data.dt;
    var date = new Date(dataERe * 1000);
    var timestamp = date.toLocaleDateString();
    if(!listaEDiteveTEJaves.includes(timestamp)){
        listaEDiteveTEJaves.push(timestamp);
        listaEIconaveTeJaves.push(data.weather[0].icon);
        listaETempTeJaves.push(Math.floor(data.main.temp));
        listaEPershkrimit.push(data.weather[0].main);

    }
};
