//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////SELECT ELEMENTS///////////////////////////////
const menuIcon = document.querySelector(".menu-img");
const crossIcon = document.querySelector(".cross-img");
const header = document.querySelector("header");
const loginPageContainer = document.querySelector(".login-container");
const signupPageContainer = document.querySelector(".signup-container");
const signupLogin = document.querySelector(".section-login-signup");
const buttonSignupLogin = document.querySelector("#signup-login-id");
const sectionSignupLogin = document.querySelector(".section-login-signup");
const navSignupLogin = document.querySelector(".signup-login");
const signupNavLink = document.querySelector(".signupNavLink");
const loginNavLink = document.querySelector(".loginNavLink ");
const firstNameInput = document.querySelector(".first-name-input");
const lastNameInput = document.querySelector(".last-name-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const confirmSignUp = document.querySelector(".button-confirm-signup");
const emailContainer = document.querySelector(".email");
const passwordContainer = document.querySelector(".password");

//////////////////*************************FUNCTIONS************************************/////////////////////////////////
//toggle the cross and menu icon
const toggleIcons = function (opacity, menu, cross) {
  header.style.opacity = opacity;
  menuIcon.style.display = menu;
  crossIcon.style.display = cross;
};

/////***************HANDLING THE CLICKS ON SIBLINGS*********************************/////////////////////////////

const handleSiblings = function (link) {
  console.log("wahiye sha");
  if (link.classList.contains("upperNavLinks")) {
    const siblings = link
      .closest(".signup-login")
      .querySelectorAll(".upperNavLinks");
    for (let i = 0; i < siblings.length; i++) {
      const el = siblings[i];
      // el.classList.toggle("active-upperNavLink", el === link);
      if (el.getAttribute("id") === "signupNavLink" && el === link) {
        console.log(link);
        // el.classList.toggle("active-upperNavLink");
        signupPageContainer.classList.remove("hidden");
        loginPageContainer.classList.add("hidden");
      }
      if (el.getAttribute("id") === "loginNavLink" && el === link) {
        console.log(link);
        // el.classList.toggle("active-upperNavLink");
        signupPageContainer.classList.add("hidden");
        loginPageContainer.classList.remove("hidden");
      }
    }
  }
};

//////////////*************SIGN UP FUNCTION *********//////////////////////////////////////////
const users = {};
const addUser = function (firstName, lastName, email, password) {
  if (users.hasOwnProperty(email)) {
    console.log("the user has already been added");
    return;
  }

  if (!validEmail(email) || !validPassword(password)) return;
  users[email] = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  console.log(users);
};

//////////////*************VALID EMAIL FUNCTION *******************************////////////////////////////

const validEmail = function (email) {
  if (email.slice(-10) === "@gmail.com" && email.length >= 11) {
    return true;
  } else {
    const emailAlert = document.createElement("div");
    emailContainer.appendChild(emailAlert);
    emailAlert.innerText = "Please enter a valid email";
    console.log(emailContainer);
    return false;
  }
};

const validPassword = function (password) {
  if (password.length <= 8) {
    const passwordAlert = document.createElement("div");
    passwordContainer.appendChild(passwordAlert);
    console.log(passwordContainer);
    passwordAlert.innerText = "A password must be at least 8 characters";
    console.log(password.length);
    return false;
  } else {
    return true;
  }
};
confirmSignUp.addEventListener("click", (e) => {
  addUser(
    firstNameInput.value,
    lastNameInput.value,
    emailInput.value,
    passwordInput.value
  );
});

////////////HIDE THE CROSS ICON//////
crossIcon.style.display = "none";

///////////////////////HIDE THE LOGIN PAGE//////////
// loginPageContainer.classList.add("hidden");
// signupPageContainer.style.display = "none";
// loginPageContainer.style.display = "none";

/////////////////////////////**************REGISTERED USERS*****************************************///////////////////////

//////////////////////////////////////////////////////////////
/////////////////EVENT LISTENERS /////////////////////////

//By clicking on the Menu icon
menuIcon.addEventListener("click", function () {
  toggleIcons(1, "none", "block");
});
crossIcon.addEventListener("click", function () {
  toggleIcons(0, "block", "none");
});
////////////////////////CLICK ON THE SIGN UP/ LOGINBUTTON ////////////////////////

navSignupLogin.addEventListener("click", function (e) {
  const link = e.target;
  handleSiblings(link);
});

buttonSignupLogin.addEventListener("click", function (e) {
  e.preventDefault();
  sectionSignupLogin.style.display = "flex";
  signupPageContainer.style.display = "flex";
});
///////////////////////////CLICK ON THE TOP MOST SIGN UP AND LOGIN NAVIGATIONS//////////////////

//HIDE THE PAGE WHENEVER ONE CLICKS OUTSIDE OF THE LOGIN PAGE//////
document.body.addEventListener("click", function (event) {
  if (
    !sectionSignupLogin.contains(event.target) &&
    event.target !== buttonSignupLogin
  ) {
    sectionSignupLogin.style.display = "none";
  }
});
////////////////////////////////////////LOAD MAP/////////////////////////////////////////////////////////////////////////////////////

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log([latitude, longitude]);
    const coords = [latitude, longitude];

    const map = L.map("contacts-id").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords).addTo(map).bindPopup("").openPopup();

    // Disable various interactions
    map.scrollWheelZoom.disable(); // Disable scroll wheel zoom
    map.dragging.disable(); // Disable dragging
    map.touchZoom.disable(); // Disable touch zoom
    map.doubleClickZoom.disable(); // Disable double click zoom
    map.boxZoom.disable(); // Disable box zoom
    map.keyboard.disable(); // Disable keyboard navigation
    if (map.tap) map.tap.disable(); // Disable tap (for touch devices)
  });
}
