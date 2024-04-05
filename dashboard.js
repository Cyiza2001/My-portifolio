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
const adminButton = document.querySelector(".admin-button");
const tableOfMessages = document.querySelector("#message-table-body");
/////////////////////////////////////***********GLOBAL VARIABLES********************************************////////////////////
let notificationButton;
let messageButton;
const contactusData = JSON.parse(localStorage.getItem("contactus-data"));
tableOfMessages.innerHTML = "";

///////////////////////////////////////////*************FUNCTIONS*****************************************/////////////////////////////
const hideAndDisplayUi = function (rightsection, blogs, notification, message) {
  rightSection.style.display = rightsection;
  blogsContainer.style.display = blogs;
  notificationsContainer.style.display = notification;
  messageContainer.style.display = message;
};
const activateUi = function (
  dashboard,
  admin,
  blogs,
  messages,
  notifications,
  logout
) {
  myDashboard.style.color = dashboard;
  adminButton.style.color = admin;
  blogButton.style.color = blogs;
  messageButton.style.color = messages;
  notificationButton.style.color = notifications;
  logoutButton.style.color = logout;
};

/////////////////////INITIAL CONDITIONS//////////////////////
hideAndDisplayUi("flex", "none", "none", "none");

// //////////////////////////////////////////////////////////////////
// /////////////// EVENT LISTENERS//////////////////////////////
messageButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    messageButton = button;
    activateUi(
      "black",
      "black",
      "black",
      "rgb(183, 17, 136)",
      "black",
      "black"
    );

    hideAndDisplayUi("none", "none", "none", "flex");
  });
});
myDashboard.addEventListener("click", function () {
  activateUi("rgb(183, 17, 136)", "black", "black", "black", "black", "black");
  hideAndDisplayUi("flex", "none", "none", "none");
});
adminButton.addEventListener("click", function () {
  activateUi("black", "rgb(183, 17, 136)", "black", "black", "black", "black");
  hideAndDisplayUi("none", "flex", "none", "none");
});
notificationButtons.forEach((button) => {
  button.addEventListener("click", function () {
    notificationButton = button;
    activateUi(
      "black",
      "black",
      "black",
      "black",
      "rgb(183, 17, 136)",
      "black"
    );
    hideAndDisplayUi("none", "none", "flex", "none");
  });
});

blogButton.addEventListener("click", function () {
  activateUi("black", "black", "rgb(183, 17, 136)", "black", "black", "black");
  hideAndDisplayUi("none", "flex", "none", "none");
});
logoutButton.addEventListener("click", function () {
  window.location.href = "index.html";
});
///////////////////////////////UPDATE THE MESSAGES RECEIVED FROM THE UI //////////////////////////

contactusData.forEach((data, i) => {
  const backgroundColor = (i + 1) % 2 === 0 ? "#dddddd" : "";
  const html = ` 
        <tr style= "background-color: ${backgroundColor};">
            <td id="contacter-order-id">${i + 1}</td>
            <td id="contactor-name-id">${data.name}</td>
            <td id="contactor-number-id">${data.phone}</td>
            <td id="contactor-email-id">${data.email}</td>
            <td id="contactor-message-id">${data.message}</td>
            <td id="delete-contactor-id"><img src="icons8-delete-30.png" alt="Delete icon"></td>
        </tr>
      `;

  tableOfMessages.insertAdjacentHTML("beforebegin", html);
});
