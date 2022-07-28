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
