google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  // Some raw data (not necessarily accurate)
  const data = google.visualization.arrayToDataTable([
    [
      "Month",
      "Like",
      "Subscriptions",
      "Visitors",
      "Blogs",
      "Completed-Task",
      "Average",
    ],
    ["Jan", 165, 938, 522, 998, 450, 614.6],
    ["Feb", 135, 1120, 599, 1268, 288, 682],
    ["March", 157, 1167, 587, 807, 397, 623],
    ["April", 139, 1110, 615, 968, 215, 609.4],
    ["May", 136, 691, 629, 1026, 366, 569.6],
  ]);

  const options = {
    title: "Monthly Achievements and Interactions",
    vAxis: { title: "Total Number" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  const chart = new google.visualization.ComboChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

////////////////////////////////////////////////////////////////////////////////
/////// SELECT ELEMENTS//////////////////////////

const messageContainer = document.querySelector(".messages-container");
const messageButtons = document.querySelectorAll("#display-messages");
const rightSection = document.querySelector(".right-section");
const myDashboard = document.querySelector(".users-text");
const notificationButtons = document.querySelectorAll("#display-notifications");
const notificationsContainer = document.querySelector(
  ".notifications-container"
);
const blogButton = document.querySelector("#manage-blogs");
const blogsContainer = document.querySelector(".blogs-container");
const logoutButton = document.querySelector("#logout-id");
const dashboardContainer = document.querySelector(".dashboard-container");

/////////////////////INITIAL CONDITIONS//////////////////////
messageContainer.style.display = "none";
notificationsContainer.style.display = "none";
blogsContainer.style.display = "none";

//////////////////////////////////////////////////////////////////
/////////////// EVENT LISTENERS//////////////////////////////
messageButtons.forEach((messageButton) => {
  messageButton.addEventListener("click", function (e) {
    e.preventDefault();
    rightSection.style.display = "none";
    messageContainer.style.display = "block";
  });
});
myDashboard.addEventListener("click", function () {
  rightSection.style.display = "block";
  messageContainer.style.display = "none";
  notificationsContainer.style.display = "none";
  blogsContainer.style.display = "none";
});
notificationButtons.forEach((button) => {
  button.addEventListener("click", function () {
    rightSection.style.display = "none";
    notificationsContainer.style.display = "block";
  });
});

blogButton.addEventListener("click", function () {
  blogsContainer.style.display = "flex";
  rightSection.style.display = "none";
});
logoutButton.addEventListener("click", function () {
  console.log(dashboardContainer);
  window.location.href = "index.html";
});
