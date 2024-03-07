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
