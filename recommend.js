function getWeatherByCity(city) {
  const apiKey = '9bc387c4218b073bbfc9a156235d3ba0';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function recommendLocations(weatherData) {
  const weatherCode = weatherData.weather[0].id;

  const outsideBoxes = document.querySelectorAll('#outside');
  const insideBoxes = document.querySelectorAll('#inside');

  outsideBoxes.forEach((box) => {
    box.classList.remove('hidden');
    box.classList.add('visible');
  });
  insideBoxes.forEach((box) => {
    box.classList.remove('hidden');
    box.classList.add('visible');
  });

  const body = document.querySelector('body');
  if (weatherCode >= 200 && weatherCode <= 531) {
    outsideBoxes.forEach((box) => {
      box.classList.remove('visible');
      box.classList.add('hidden');
    });
    body.classList.add('rainy');
  } else {
    insideBoxes.forEach((box) => {
      box.classList.remove('visible');
      box.classList.add('hidden');
    });
    body.classList.remove('rainy');
  }
}


const userCity = prompt('Enter a city:');
if (userCity) {
  getWeatherByCity(userCity)
    .then((weatherData) => {
      recommendLocations(weatherData);
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log('No city entered.');
}
