const input = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
let weatherImg = document.querySelector(".weather-icon img");
let langauge = document.documentElement.lang;

const en = document.querySelector(".en");
const ar = document.querySelector(".ar");
const divInput = document.querySelector(".search-box");
const wind = document.querySelector(".wind-property");
const humidity = document.querySelector(".humidity-property");

const cityName = document.querySelector(".city");
const tempValue = document.querySelector("#temp-val");
const description = document.querySelector(".description");
const windDetails = document.querySelector(".wind");
const humidityDetails = document.querySelector(".humidity");

const errorMessage=document.querySelector(".error-message")

en.addEventListener("click", () => {
  errorMessage.textContent =
    "Invalid city name, please try again.";
  errorMessage.setAttribute("dir", "ltr");
  divInput.setAttribute("dir", "ltr");
  windDetails.setAttribute("dir", "ltr");
  input.setAttribute("placeholder", "Country Name");
  wind.textContent = "wind speed";
  humidity.textContent = "humidity";
  document.documentElement.lang = "en";
  en.classList.add("active");
  ar.classList.remove("active");
});
ar.addEventListener("click", () => {
  errorMessage.style.textAlign="start"
  errorMessage.setAttribute("dir","rtl")
  errorMessage.textContent="اسم الدوله غير صحيح"
  divInput.setAttribute("dir", "rtl");
  windDetails.setAttribute("dir", "rtl");
  input.setAttribute("placeholder", "ابحث عن اسم المدينه");
  wind.textContent = "سرعه الرياح";
  humidity.textContent = "الرطوبه";
  document.documentElement.lang = "ar";
  en.classList.remove("active");
  ar.classList.add("active");
});

let getData = async function (countryName, lang) {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=e96dfdaecc3b0640eb24ea6b891d1e6c&units=metric&lang=${lang}`,
  );
  const data = await resp.json();
  return data;
};

function resetDetailsAndShowError() {
  errorMessage.style.display = "block";
  cityName.textContent = "---";
  tempValue.textContent = "---";
  description.textContent = "---";
  windDetails.textContent = "---";
  humidityDetails.textContent = "---";
}
function showDetailsِAndHideError(data) {
  errorMessage.style.display = "none";
  cityName.textContent = data.name;
  tempValue.textContent = `${data.main.temp}`;
  description.textContent = data.weather[0].description;
  humidityDetails.textContent = `${data.main.humidity} %`;
  if (document.documentElement.lang === "en") {
    windDetails.textContent = `${data.wind.speed} km / h`;
  } else {
    windDetails.textContent = `${data.wind.speed} كم/س`;
  }
  weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  input.focus();
}
function handleSearch(){
    if (input.value !== "") {
      getData(input.value, document.documentElement.lang)
        .then((data) => {
          showDetailsِAndHideError(data);
        })
        .catch(() => {
          resetDetailsAndShowError();
        });
    } else {
      resetDetailsAndShowError();
    }

    input.focus();
}

searchBtn.addEventListener("click",handleSearch)

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch()
});
