"use strict";

var chart = document.getElementById('myChart').getContext('2d');
var lineChart = new Chart(chart, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: {
        labels: time,
        datasets: [{
          label: 'Last 24 Hours',
          data: ping_value
        }]
      }
    }],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }
});