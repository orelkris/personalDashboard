// BACKGROUND IMAGE
let bgImage = "";
getBackgroundImage();
function getBackgroundImage() {
  fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  )
    .then((res) => res.json())
    .then((data) => {
      bgImage = createImageObjectAPI(data);
      createBackgroundImageHtml(bgImage);
    })
    .catch((err) => {
      console.log("Something went wrong");
      // This is where I can handle the error
      // For example, a default background image can be used

      bgImage = createImageObject();
      createBackgroundImageHtml(bgImage);
    });
}

function createImageObjectAPI(obj) {
  return {
    src: obj.urls.full,
    alt: obj.alt_description,
    width: obj.width,
    author: obj.user.name,
  };
}

function createImageObject() {
  return {
    src: "images/default-background.jpg",
    alt: "beautiful lush green forest with an open path in the middle",
    width: 2832,
    author: "Luis Dalvan",
  };
}

function createBackgroundImageHtml(imgObj) {
  const outerContainer = document.getElementById("outer-container");
  outerContainer.style.backgroundImage = `url(${imgObj.src})`;

  const author = document.getElementById("author");
  author.textContent = imgObj.author;
  author.classList.add("bg-image-author");

  outerContainer.appendChild(author);
}

function createElement(elem) {
  return document.createElement(elem);
}

// GET COIN INFORMATION
getCryptoInfo("bitcoin");

// getCryptoInfo("bitcoin");

function getCryptoInfo(coinType) {
  fetch(`https://api.coingecko.com/api/v3/coins/${coinType}`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Unable to get requested coin");
      }
      return res.json();
    })
    .then((data) => {
      const coinObj = createCryptoObjectAPI(data);

      createCryptoHtml(coinObj);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createCryptoObjectAPI(obj) {
  return {
    name: obj.name,
    image: {
      src: obj.image.small,
      alt: obj.name,
    },
    publicScore: obj.public_interest_score,
    currentPriceUSD: obj.market_data.current_price.usd,
    rank: obj.coingecko_rank,
  };
}

function createCryptoHtml(obj) {
  const header = document.getElementById("crypto-header");
  const body = document.getElementById("crypto-body");

  // header
  const image = createElement("img");
  image.setAttribute("src", obj.image.src);
  image.setAttribute("alt", obj.image.alt);

  const name = createElement("p");
  name.textContent = obj.name;

  header.appendChild(image);
  header.appendChild(name);

  // body
  const publicScore = createElement("p");
  publicScore.textContent = `Public Score: ${obj.publicScore}`;

  const currentPrice = createElement("p");
  currentPrice.textContent = `Current Price: $${obj.currentPriceUSD} USD`;

  const rank = createElement("p");
  rank.textContent = `Rank: ${obj.rank}`;

  body.appendChild(publicScore);
  body.appendChild(currentPrice);
  body.appendChild(rank);
}

// CURRENT TIME
setInterval(() => {
  createCurrentTimeHtml();
}, 1000);

function createCurrentTimeHtml() {
  const timeElem = document.getElementById("current-time");
  const time = new Date();
  const timeString = time.toLocaleTimeString("en-CA", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  timeElem.textContent = timeString;
}

// WEATHER API
const apiKey = "f575e56264f4022e0ea535aa2860e455";
getCoordinates();
function getCoordinates() {
  if ("geolocation" in navigator) {
    // console.log("can use");
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const weather = {
        latitude: lat,
        longitude: lon,
      };

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          const weatherObj = createWeatherObj(data);
          createWeatherHtml(weatherObj);
        });
    });
  }
}

function createWeatherObj(obj) {
  return {
    temp: obj.main.temp,
    feelsLike: obj.main.feels_like,
  };
}

function createWeatherHtml(obj) {
  const weatherElem = document.getElementById("weather-container");

  const pTemp = createElement("p");
  const spanTemp = createElement("span");
  spanTemp.textContent = ` ${obj.temp}\u00B0`;
  pTemp.textContent = `Current Temp:`;
  pTemp.appendChild(spanTemp);

  const pFeels = createElement("p");
  const spanFeels = createElement("span");
  spanFeels.textContent = ` ${obj.feelsLike}\u00B0`;
  pFeels.textContent = `Feels Like:`;
  pFeels.appendChild(spanFeels);

  if (obj.temp > 25 || obj.feelsLike > 25) {
    spanTemp.classList.add("hot");
    spanFeels.classList.add("hot");
  } else if (obj.temp < 10 || obj.feelsLike < 10) {
    spanTemp.classList.add("cold");
    spanFeels.classList.add("cold");
  } else {
    spanTemp.classList.add("normal");
    spanFeels.classList.add("normal");
  }

  weatherElem.appendChild(pTemp);
  weatherElem.appendChild(pFeels);
}

// FETCHING ASSIGNMENT DATA***

const assignmentButtons = Array.from(
  document.querySelectorAll("#secondary-nav button")
);

assignmentButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const assignmentType = event.target.id;
    showSection(assignmentType);
  });
});

function showSection(type) {
  const assignments = document.getElementById("assignments");
  assignments.classList.add("fade-out");

  setTimeout(() => {
    fetch(`assignments/${type}.html`)
      .then((response) => response.text())
      .then((data) => {
        assignments.innerHTML = data;
      });
  }, 1000);

  assignments.addEventListener("animationend", () => {
    assignments.classList.add("fade-in");
    assignments.classList.remove("fade-out");
  });
}
