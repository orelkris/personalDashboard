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
      console.log(coinObj);

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
  fetch(`assignments/${type}.html`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("assignments").innerHTML = data;
    });
}
