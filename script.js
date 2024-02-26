//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////SELECT ELEMENTS///////////////////////////////
const menuIcon = document.querySelector(".menu-img");
const crossIcon = document.querySelector(".cross-img");
const header = document.querySelector("header");

////////////HIDE THE CROSS ICON//////
crossIcon.style.display = "none";

//////////////////////////////////////////////////////////////
/////////////////EVENT LISTENERS /////////////////////////

//By clicking on the Menu ico
menuIcon.addEventListener("click", function () {
  header.style.opacity = 1;
  menuIcon.style.display = "none";
  crossIcon.style.display = "block";
});
crossIcon.addEventListener("click", function () {
  header.style.opacity = 0;
  crossIcon.style.display = "none";
  menuIcon.style.display = "block";
});
