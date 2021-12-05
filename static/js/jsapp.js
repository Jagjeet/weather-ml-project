

function createChart(diurnalData) {
        
        diurnalData.sort(function(a, b){return a.MONTH - b.MONTH});

        var min = [];
        var max = [];
        var sum3 = 0;
        var sum4 = 0;
        var yearnumber = diurnalData[1].YEAR
        var statelabel = diurnalData[1].STATE
        
        for (var i = 1; i < 13; i++) {
            var monthData =  diurnalData.filter(diurnalData => diurnalData.MONTH == i);
            
            var sum1 = 0;
            var sum2 = 0;
            var count = 0;
            
            for (var k = 0; k < monthData.length; k++) {
                if (monthData[k].MAX !== 9999.9) {
                    if (monthData[k].MIN !== 9999.9) {   
                    sum1 += parseInt( monthData[k].MAX, 10 );
                    sum2 += parseInt( monthData[k].MIN, 10 );
                    count += 1;
                    }
                }
            };

            var avg1 = sum1/count;
            var avg2 = sum2/count;
            let data = {
                x: i,
                y: avg1
            };

            max.push(data);

            let data2 = {
                x: i,
                y: avg2
            };

            min.push(data2);

            if (monthData.length !== 0) {
                sum3 += avg1,
                sum4 += avg2
            };
        };
        
        var avg3 = sum3/min.length;
        var avg4 = sum4/min.length;
        console.log(min.length);
        console.log(sum3);
        var unrounded = avg3 - avg4;
        var avgDiurnal = Math.round(unrounded)
        console.log(avgDiurnal)
        document.getElementById("average").innerHTML = `<p>The average diurnal tempature range for ${statelabel} in ${yearnumber} is ${avgDiurnal}</p>`;

        var ctx = document.getElementById('MinMaxChart').getContext('2d'); //get the context (canvas)

          
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [{ 
                      data: min,
                      label: "Min",
                      borderColor: "#006DB0",
                      backgrrunoundColor: "#E6E6FA",
                      fill: false,
                      spanGaps: true,
                    }, { 
                      data: max,
                      label: "Max",
                      borderColor: "#FF3333",
                      backgroundColor: "#E6E6FA",
                      fill: '-1',
                      spanGaps: true,
                    }, 
                  ]
                },
                options: {
                  maintainAspectRatio: true,
                  spanGaps: true,
                  elements: {
                      line: {
                          tension: 0.000001
                      }
                  },
                  plugins: {
                      filler: {
                          propagate: false
                      }
                  },
                  scales: {
                      xAxes: [{
                          ticks: {
                              
                              beginAtZero: true,
                              steps: 1,
                              stepValue: 1,
                              maxTicksLimit: 12, 
                              maxRotation: 0
                          }
                      }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 5,
                            max: 110
                        }
                    }] 
                  }
                }

              });
}
function drawType(state, year) {
    // ping type route
    
};
function initializeSelector() {
    let state = document.getElementById('State').value;
    let year = document.getElementById('Year').value;

    d3.json(`/${state}/${year}/data`).then(function (myData) {
        
        createChart(myData)
    });
    
}
// initialize upon page load
function initWeather() {

    // get first value for type
    let selection1 = document.getElementById('State').options[0].value
    let selection2 = document.getElementById('Year').options[0].value
    // ping type route
    d3.json(`/${selection1}/${selection2}/data`).then(function (myData) {
        
        createChart(myData) 
    });
    
    
}

initWeather();