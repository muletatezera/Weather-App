const form = document.getElementById("btn");
const search = document.getElementById("search");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");

const API_KEY = "e54abed9c871bfe94b9f8033e37449c6";

form.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = search.value.trim();
  if (city === "") return;

  await getWeather(city);
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      throw new Error("City not found");
    }

    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateUI(data) {
  cityEl.innerText = data.name;
  tempEl.innerText = `${data.main.temp} °C`;
  descEl.innerText = data.weather[0].description;
}
