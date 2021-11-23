const contentBox = document.querySelector('.content-box')
const startButton = document.querySelector('.start')
const apiKey = '21cc77cc93174a61e65a63cdd2f81e82';
const url = 'https://api.openweathermap.org/data/2.5/weather';
const headContainer = document.querySelector('.head-container')
const kelvin = 273.15;
let result ='';


startButton.addEventListener('click',()=>{
  for(let i =20; i <= 30; i+=0.5){
    setTimeout(()=>{
      contentBox.textContent = `${result+= i +' '}`
    }, 100*i)
    result =''
  }
})


navigator.geolocation.getCurrentPosition((position)=>{
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getTheWeather(lat, lon)
  
});

const getTheWeather = (lat, lon)=>{
  let weatherRequest = new XMLHttpRequest();
  weatherRequest.overrideMimeType("application/json");
  weatherRequest.open('GET', `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ua`);
  weatherRequest.addEventListener('load',()=>{
    response = JSON.parse(weatherRequest.responseText);
    let markUp = createMarkUp(response)
    appearForecast(markUp)
  })
  weatherRequest.send();

}


const appearForecast = (elem)=>{
  headContainer.innerHTML = elem;
  headContainer.classList.add('show-content')
}

const kelvinToCelsius = (kelvinValue)=>{
  return kelvinValue - kelvin;
}

const createMarkUp = (data)=>{
  return `  
  <div>
    <h2>Місце знаходження</h2>
    <span>${data.name}</span>
  </div>
  <div>
    <h2>Температура</h2>
    <span>${( kelvinToCelsius(data.main.temp)).toFixed(2) + ' °C'}</span>
    <img src="" alt="" srcset="">
</div>
  <div>
    <h2>Температура видчувається як</h2>
    <span>${(kelvinToCelsius(data.main.feels_like )).toFixed(2) + ' °C'}</span>
    <img src="" alt="" srcset="">
  </div>
  <div>
    <h2>Тиск</h2>
    <span>${data.main.pressure + '  hPa'}</span>
    <img src="" alt="" srcset="">
  </div>
  <div>
    <h2>Вологість</h2>
    <span>${data.main.humidity + '%'}</span>
    <img src="" alt="" srcset="">
  </div>
<div>
<h2>Швидкість вітру</h2>
<span>${data.wind.speed} м/сек</span>
<img src="" alt="" srcset="">
</div>
<div>
<h2>Напрямок вітру</h2>
<span>${data.wind.deg} deg</span>
<img src="" alt="" srcset="">
</div>`
}