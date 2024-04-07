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
const table = document.querySelector("table");
const blogTitleInput = document.querySelector("#blog-title-input");
const blogUploadInput = document.querySelector("#blog-upload-input");
const richTextEditor = document.querySelector("#editor .ql-editor");
const postBlogButton = document.querySelector(".post-blog");

/////////////////////////////////////***********GLOBAL VARIABLES********************************************////////////////////
let notificationButton;
let messageButton;
const contactusData = JSON.parse(localStorage.getItem("contactus-data"));
const blogsArray = [];

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
const deleteArow = function (rowNumber) {
  table.deleteRow(rowNumber);
  contactusData.splice(rowNumber - 1, 1);
  localStorage.setItem("contactus-data", JSON.stringify(contactusData));
  for (let i = rowNumber; i < table.rows.length; i++) {
    const orderCell = table.rows[i].querySelector("#contactor-order-id");
    orderCell.textContent = parseInt(orderCell.textContent) - 1;
    const backgroundColor = i % 2 == 0 ? "#dddddd" : "";
    table.rows[i].style.backgroundColor = `${backgroundColor}`;
  }
};
const getBlogsData = function (blogsPic, title, description) {
  const blogsData = {
    blogsPic: blogsPic,
    title: title,
    description: description,
  };
  blogsArray.push(blogsData);
  localStorage.setItem("blogs-Array", JSON.stringify(blogsArray));
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
postBlogButton.addEventListener("click", function () {
  getBlogsData(
    blogUploadInput.value,
    blogTitleInput.value,
    richTextEditor.textContent
  );
  const blogUpdate = document.querySelector("#singleBlog");
  blogUpdate.innerHTML = "";
  blogsArray.forEach((blog) => {
    const html = `   <div class="single-blog-update">
  <div class="update-blog-title">${blog.title}</div>
  <div class="update-blog">update</div>
  <div class="delete-blog">Delete</div>
 </div>`;

    blogUpdate.insertAdjacentHTML("afterbegin", html);
  });

  // const selectedImage = blogUploadInput.files[0]; // Get the selected image file

  // if (selectedImage) {
  //   const blogTitle = blogTitleInput.value;
  //   const blogDescription = richTextEditor.textContent;

  //   // Call getBlogsData function with the selected image, title, and description
  //   getBlogsData(selectedImage, blogTitle, blogDescription);

  //   // Additional code to handle the selected image
  //   console.log("Selected image:", selectedImage);
  //   // Here you can call any functions or perform operations with the selected image
  // } else {
  //   console.log("No image selected.");
  // }
});
///////////////////////////////UPDATE THE MESSAGES RECEIVED FROM THE UI //////////////////////

contactusData.forEach((data, order) => {
  const backgroundColor = (order + 1) % 2 === 0 ? "#dddddd" : "";

  const html = ` 
        <tr style="background-color: ${backgroundColor};">
            <td id="contactor-order-id">${order + 1}</td>
            <td id="contactor-name-id">${data.name}</td>
            <td id="contactor-number-id">${data.phone}</td>
            <td id="contactor-email-id">${data.email}</td>
            <td id="contactor-message-id">${data.message}</td>
            <td id="delete-contactor-id"><button onclick="deleteArow(${
              order + 1
            })"><img src="icons8-delete-30.png" alt="Delete icon"></button></td>
        </tr>
      `;

  tableOfMessages.insertAdjacentHTML("beforebegin", html);
});
