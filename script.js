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
  toggleIcons(1, "none", "block");
});
crossIcon.addEventListener("click", function () {
  toggleIcons(0, "block", "none");
});

////////////////////////////////////////LOAD MAP/////////////////////////////////////////////////////////////////////////////////////

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
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
