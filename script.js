//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////SELECT ELEMENTS///////////////////////////////
const menuIcon = document.querySelector(".menu-img");
const crossIcon = document.querySelector(".cross-img");
const header = document.querySelector("header");
//toggle the cross and menu icon
const toggleIcons = function (opacity, menu, cross) {
  header.style.opacity = opacity;
  menuIcon.style.display = menu;
  crossIcon.style.display = cross;
};

////////////HIDE THE CROSS ICON//////
crossIcon.style.display = "none";

//////////////////////////////////////////////////////////////
/////////////////EVENT LISTENERS /////////////////////////

//By clicking on the Menu icon
menuIcon.addEventListener("click", function () {
  // header.style.opacity = 1;
  // menuIcon.style.display = "none";
  // crossIcon.style.display = "block";
  toggleIcons(1, "none", "block");
});
crossIcon.addEventListener("click", function () {
  // header.style.opacity = 0;
  // crossIcon.style.display = "none";
  // menuIcon.style.display = "block";
  toggleIcons(0, "block", "none");
});
