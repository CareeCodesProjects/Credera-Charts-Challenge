Vue.use(VueHighcharts);

var options = {
  title: {
    text: 'Monthly Temperature',
    x: -20 //center
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    title: {
      text: 'Temperature (°C)'
    },
    plotLines: [{
      value: 0,
      width: 3,
      color: '#3499FD'
    }]
  },
  tooltip: {
    valueSuffix: '°C'
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  series: [{
    name: 'Tokyo',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  }, {
    name: 'New York',
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  }, {
    name: 'Berlin',
    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  }, {
    name: 'London',
    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
  }]
};

var vm = new Vue({
  el: '#app',
  data: {
    options: options
  },
  methods: {
    updateCredits: function updateCredits() {
      var chart = this.$refs.highcharts.chart;
      chart.credits.update({
        style: {
          color: '#' + (Math.random() * 0xffffff | 0).toString(16)
        }
      });
    }
  }
});

var stackedChartCtx = document.getElementById("stackedChartCanvas").getContext('2d');
var stackedChartCanvas = new Chart(stackedChartCtx, {
    type: 'bar',
    data: {
        labels: ["2011", "2012", "2013", "2014", "2015", "2016", "2017"],
        datasets: [{
            label: 'Label 1',
            data: [1550, 1570, 2300, 5000, 7000, 8000, 20000],
            backgroundColor: '#074F57'
        }, {
            label: 'Label 2',
            data: [0, 3630, 28200, 48809, 73700, 110700, 160791],
            backgroundColor: '#077187'
        }, {
            label: 'Label 3',
            data: [0, 0, 0, 0, 0, 20100, 22000],
            backgroundColor: '#7FB069'
        }]
    },
    
    options: {
        tooltips: {
            enabled: false 
        },
        responsive: true,
        legend: {
            position: 'bottom',
            fullWidth: true,
            labels: {
                boxWidth: 20,
                padding: 50,
                fontSize: 20,
                fontFamily: 'Lato'
            }
        },
        scales: {
            xAxes: [{
                barPercentage: 0.8,
                gridLines: {
                    display: true,
                    drawTicks: true,
                    drawOnChartArea: false
                },
                ticks: {
                  fontSize: 16,
                  fontFamily: 'Lato'
                },
                stacked: true
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                    drawTicks: true,
                    tickMarkLength: 5,
                    drawOnChartArea: false
                },
                ticks: {
                    padding: 10,
                    beginAtZero: true,
                    fontSize: 16,
                    fontFamily: 'Lato',
                    callback: function(label, index, labels) {
                        return label/1000;
                    }
                },
                scaleLabel: {
                    display: true,
                    padding: 20,
                    fontColor: '#555759',
                    fontSize: 18,
                    fontFamily: 'Lato',
                    fontStyle: 700,
                    labelString: 'Scale Label'
                },
                stacked: true
            }]
        },
        animation: {
          onComplete: function() {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            var bars = [0, 0, 0, 0, 0, 0, 0]
            this.data.datasets.forEach(
              function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  var data = dataset.data[index];
                  bars[index] += data;
                  if(i === 2 && index > 2) {
                    var fillString = '$' + Math.floor(bars[index]/1000);
                    if( bars[index] > 1000000) {
                      fillString += ' Billion';
                    } else {
                      fillString += ' Million';
                    }
                    ctx.fillText(fillString, bar._model.x, bar._model.y - 5);
                  }
                });
              });
            
          }
        }
    }
});