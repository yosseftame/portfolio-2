const input = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
let weatherImg = document.querySelector(".weather-icon img");
let langauge = document.documentElement.lang;

console.log(weatherImg.src);

const en = document.querySelector(".en");
const ar = document.querySelector(".ar");
const divInput = document.querySelector(".search-box");
const windDetails = document.querySelector(".wind");
const wind = document.querySelector(".wind-property");
const humidity = document.querySelector(".humidity-property");

en.addEventListener("click", () => {
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


searchBtn.addEventListener("click", () => {
  console.log(input.value);
  if(input.value!==""){

    getData(input.value, document.documentElement.lang).then((r) => {
      document.querySelector(".city").textContent = r.name;
  
      document.querySelector("#temp-val").textContent = `${r.main.temp}`;
      document.querySelector(".description").textContent =
        r.weather[0].description;
      document.querySelector(".humidity").textContent = `${r.main.humidity} %`;
      if (document.documentElement.lang === "en") {
        document.querySelector(".wind").textContent = `${r.wind.speed} km / h`;
      } else {
        document.querySelector(".wind").textContent = `${r.wind.speed} كم/س`;
      }
      weatherImg.src = `https://openweathermap.org/img/wn/${r.weather[0].icon}@4x.png`;
      console.log(r);
    });
  }else{
    document.querySelector(".error-message").style.display="block"
  }

  document.querySelector(".description");
  input.focus();
});
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if(input.value!==""){

      getData(input.value, document.documentElement.lang).then((r) => {
        document.querySelector(".city").textContent = r.name;
        document.querySelector("#temp-val").textContent = `${r.main.temp}`;
        document.querySelector(".description").textContent =
          r.weather[0].description;
        document.querySelector(".humidity").textContent = `${r.main.humidity} %`;
        if (document.documentElement.lang === "en") {
          document.querySelector(".wind").textContent = `${r.wind.speed} km / h`;
        } else {
          document.querySelector(".wind").textContent = `${r.wind.speed} كم/س`;
        }
        weatherImg.src = `https://openweathermap.org/img/wn/${r.weather[0].icon}@4x.png`;
        input.focus();
      });
    }else{
     document.querySelector(".error-message").style.display = "block";
    }
  } else {
    return null;
  }
});








// ! dark mode
// btn.onclick= ()=>{

//     document.body.classList.add("dark-mode")
//     document.querySelector(".weather-card").classList.add("weather-card-dark-mod");
//     document.documentElement.lang="en"
//     document.documentElement.dir="ltr"
//     input.setAttribute("placeholder", "Search for your city");
// }

// input.addEventListener("input",(e)=>{
//     input.value=(e.target.value);

// })