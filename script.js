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
const namesContainer = document.querySelector(".names");
const firstNameContainer = document.querySelector(".first-name-container");
const signUpInnerButton = document.querySelector(".signup-inner-button");
const logInSpan = document.querySelector(".login-span");
const lowerLoginButton = document.querySelector("#lower-login-id");

//////////////////*************************FUNCTIONS************************************/////////////////////////////////
//toggle the cross and menu icon
const toggleIcons = function (opacity, menu, cross) {
  header.style.opacity = opacity;
  menuIcon.style.display = menu;
  crossIcon.style.display = cross;
};

/////***************HANDLING THE CLICKS ON SIBLINGS*********************************/////////////////////////////

const handleSiblings = function (link) {
  if (link.classList.contains("upperNavLinks")) {
    const siblings = document.querySelectorAll(".upperNavLinks");

    // link
    //   .closest(".signup-login")
    //   .querySelectorAll(".upperNavLinks");
    for (let i = 0; i < siblings.length; i++) {
      const el = siblings[i];
      // el.classList.toggle("active-upperNavLink", el === link);
      if (el.getAttribute("id") === "signupNavLink" && el === link) {
        // el.classList.toggle("active-upperNavLink");
        signupPageContainer.classList.remove("hidden");
        loginPageContainer.classList.add("hidden");
      }
      if (el.getAttribute("id") === "loginNavLink" && el === link) {
        // el.classList.toggle("active-upperNavLink");
        signupPageContainer.classList.add("hidden");
        loginPageContainer.classList.remove("hidden");
      }
    }
  }
};

//////////////*************SIGN UP FUNCTION *********//////////////////////////////////////////
const users = JSON.parse(localStorage.getItem("users")) || {};

const addUser = function (firstName, lastName, email, password) {
  if (users.hasOwnProperty(email)) {
    console.log("the user has already been added");
    return;
  }

  if (
    !validateUserName(firstName, lastName) ||
    !validEmail(email) ||
    !validPassword(password)
  )
    return;
  users[email] = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  const signUpAlert = document.createElement("div");
  signUpInnerButton.appendChild(signUpAlert);
  signUpAlert.innerText = "You are successfully signed up!";
  setTimeout(function () {
    signUpAlert.innerText = "";
  }, 3000);
  console.log(users);
};

//////////////*************VALID EMAIL FUNCTION *******************************////////////////////////////

const validEmail = function (email) {
  let emailAlert = emailContainer.querySelector(".emailAlert");
  if (email.slice(-10) === "@gmail.com" && email.length >= 11) {
    if (emailAlert) emailAlert.innerText = "";
    return true;
  } else {
    if (emailAlert) {
      emailAlert.innerText = "Please enter a valid email";
    } else {
      emailAlert = document.createElement("div");
      emailAlert.classList.add("emailAlert");
      emailContainer.appendChild(emailAlert);
      emailAlert.innerText = "Please enter a valid email";
      console.log(emailContainer);
    }

    return false;
  }
};
//////////////////////////////********************CHECK IF THE PASSWORD IS VALID************************************////////////////////////////////////////////////////
const validPassword = function (password) {
  let passwordAlert = passwordContainer.querySelector(".passwordAlert");
  if (password.length <= 8) {
    if (passwordAlert) {
      passwordAlert.innerText = "A password must be at least 8 characters";
    } else {
      passwordAlert = document.createElement("div");
      passwordAlert.classList.add("passwordAlert");
      passwordContainer.appendChild(passwordAlert);
      passwordAlert.innerText = "A password must be at least 8 characters";
      console.log(passwordContainer);
      return false;
    }
  } else {
    if (passwordAlert) passwordAlert.innerText = "";
    return true;
  }
};
//////////////////////////////////////*****************CHECK IF THE USERNAMES INPUTS ARE NOT EMPTY*******************//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const validateUserName = function (firstName, lastName) {
  let namesAlert = namesContainer.querySelector(".namesAlert");
  if (firstName.length === 0 || lastName.length === 0) {
    if (namesAlert) {
      namesAlert.innerText = "Please enter your first and last name";
    } else {
      namesAlert = document.createElement("div");
      namesAlert.classList.add("namesAlert");
      namesContainer.appendChild(namesAlert);
      namesAlert.innerText = "Please enter your first and last name";
      console.log(namesContainer);
    }

    return false;
  } else {
    if (namesAlert) namesAlert.innerText = "";
    return true;
  }
};

//////////////////////////////////////**********************CLICK ON THE SIGN UP THE BUTTON***********************************************************************/////////////////////////////////////////////////////////////////
confirmSignUp.addEventListener("click", (e) => {
  addUser(
    firstNameInput.value,
    lastNameInput.value,
    emailInput.value,
    passwordInput.value
  );
  localStorage.setItem("users", JSON.stringify(users));
});
/////////////////////////////////////////////////////********CLICK LISTENER ON THE LOWER LOGIN SPAN********************////////////////////////////////
logInSpan.addEventListener("click", function (e) {
  signupPageContainer.classList.add("hidden");
  loginPageContainer.classList.remove("hidden");
});
/////////////////////////////////////////////////**********CLICK THE LOWER LOGIN BUTTON*********************//////////////////////

lowerLoginButton.addEventListener("click", function (e) {
  for (let key in users) {
    console.log("urihasi");
    if (
      users[key].email === "ndanyuzwealexandre@gmail.com" &&
      users[key].password === "ndanyuzwe2"
    ) {
     
      window.location.href = "dashboard.html";
    }
    else if ( users[key].email === emailInput.value &&
    users[key].password === passwordInput.value ) {
  }
});
////////////////////////////////////////////CLICK ON THE CROSS ICON////////////////////////////////////////////

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
