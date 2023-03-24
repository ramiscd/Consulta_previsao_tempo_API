const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const content = document.querySelector(".content");

button.addEventListener("click", () => {
    if (!input.value) return;

    getDataApi();
});

async function getDataApi() {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input.value
    )}&units=metric&appid=aae9c3a868be55d0e9bb83c76fda1af5`;

    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if(data?.cod && data.cod === "404") {
                    return alert("local não encontrado!");
                }
                loadData(data);
            });
    }   catch (error) {
        alert(error);
    }
}

function loadData(data) {
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
    content.style.display = "flex";
}