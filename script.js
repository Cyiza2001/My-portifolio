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

//toggle the cross and menu icon
const toggleIcons = function (opacity, menu, cross) {
  header.style.opacity = opacity;
  menuIcon.style.display = menu;
  crossIcon.style.display = cross;
};

////////////HIDE THE CROSS ICON//////
crossIcon.style.display = "none";

///////////////////////HIDE THE LOGIN PAGE//////////
// loginPageContainer.classList.add("hidden");
// signupPageContainer.style.display = "none";
// loginPageContainer.style.display = "none";

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
  if (link.classList.contains("upperNavLinks")) {
    const siblings = link
      .closest(".signup-login")
      .querySelectorAll(".upperNavLinks");
    siblings.forEach((el) => {
      if (el === link) {
        el.classList.add("active-upperNavLink");
        if (el.getAttribute("id") === "signupNavLink") {
          signupPageContainer.classList.remove("hidden");
          loginPageContainer.classList.add("hidden");
        } else {
          signupPageContainer.classList.add("hidden");
          loginPageContainer.classList.remove("hidden");
        }
      } else {
        el.classList.remove("active-upperNavLink");
      }
    });
  }
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
