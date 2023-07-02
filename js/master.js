// check if there is local storage color option

let mainColors = localStorage.getItem("color-option");

if (mainColors != null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // remove active class from all colors list items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (localStorage.getItem("color-option") === element.dataset.color) {
      element.classList.add("active");
    }
  });

  // add active class on element with data-color === local storage item
}

// Random  background option

let backgroundOption = true;

let backgroundInterval;

// check if there's local storage random background item

let backgroundLocalItem = localStorage.getItem("background-option");

//check if random background local storage is not empty
if (backgroundLocalItem != null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class from all spans

  document.querySelectorAll(".option-box span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".option-box .yes").classList.add("active");
  } else {
    document.querySelector(".option-box .no").classList.add("active");
  }
}

// toggle spin class on icon

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  //toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  //toggle class open on main setting box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors

const colorsLi = document.querySelectorAll(".colors-list li");

//loop on list items
colorsLi.forEach((li) => {
  //click on every list items

  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color on loacl storage

    localStorage.setItem("color-option", e.target.dataset.color);

    handlaActive(e);
  });
});

// switch Random background option

const randomBackEl = document.querySelectorAll(".option-box span");

//loop on all spans
randomBackEl.forEach((span) => {
  //click on every span
  span.addEventListener("click", (e) => {
    handlaActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// select landing page element

let landingPage = document.querySelector(".landing-page");

// get array of images

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function to ranodmize images

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // change backgorund image url
      landingPage.style.backgroundImage =
        'url("img/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}

randomizeImgs();

// select skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  //  skills outer height

  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.scrollY;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }

  // this.console.log(skillsOffsetTop);
};

// create popup with the image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to overaly
    overlay.className = "popup-overlay";

    // append overlay to the body

    document.body.appendChild(overlay);

    // create the popup box

    let popupBox = document.createElement("div");

    // add class to the popup box

    popupBox.className = "popup-box";

    if (img.alt != null) {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading

      let imgText = document.createTextNode(img.alt);

      // append the text to the heading

      imgHeading.appendChild(imgText);

      // append the heading to the popup box

      popupBox.appendChild(imgHeading);

      // create the image

      let popupImage = document.createElement("img");

      // set image source

      popupImage.src = img.src;

      // add image to the popup box

      popupBox.appendChild(popupImage);

      // appden the popup box to the body

      document.body.appendChild(popupBox);

      // create the close span

      let closeButton = document.createElement("span");

      // create the close button text

      let closeButtonText = document.createTextNode("x");

      // append text to close button

      closeButton.appendChild(closeButtonText);

      // add class to close button

      closeButton.className = "close-button";

      // add close button to the popup box

      popupBox.appendChild(closeButton);
    }
  });
});

// close popup

document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //remove the current popup
    e.target.parentNode.remove();

    // remove overlay

    document.querySelector(".popup-overlay").remove();
  }
});

// select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);

scrollToSection(allLinks);

// handle active state

function handlaActive(ev) {
  // remove active class from all childrens

  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class on self

  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem != null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handlaActive(e);
  });
});

// reset button

document.querySelector(".reset-options").onclick = function () {
  // empty specific local storage values

  // localStorage.clear();
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");

  // reload window
  window.location.reload();
};

// toggle menu

let toggleBtn = document.querySelector(".toggle-menu");

let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop propagation

  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// click anywhere outsie menu and toggle button

document.addEventListener("click", (e) => {
  if (e.target != toggleBtn && e.target != tLinks) {
    // check if menu is open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

// stop propagation on menu

tLinks.onclick = function (e) {
  e.stopPropagation();
};
