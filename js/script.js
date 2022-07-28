// BACKGROUND IMAGE
let bgImage = "";
getBackgroundImage();
async function getBackgroundImage() {
  const response = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  const data = await response.json();

  bgImage = createImageObject(data);
  createBackgroundImageHtml(bgImage);
}

function createImageObject(obj) {
  return {
    src: obj.urls.full,
    alt: obj.alt_description,
    width: obj.width,
    author: obj.user.name,
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
