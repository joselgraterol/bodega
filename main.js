//dashboard

let menuIcon = document.querySelector("#menu-icon");
let sideBar = document.querySelector("aside");
let overlay = document.querySelector(".overlay");




menuIcon.addEventListener("click", () => {
    sideBar.classList.add("active");
    overlay.classList.add("active");
})


document.onclick = (e) => {
	if(e.target.id !== "side-bar" && e.target.id !== "menu-icon"){
		sideBar.classList.remove("active");
		overlay.classList.remove("active");
		
	}
}


//charts and night mode


let doughnutChart = document.getElementById('doughnutChart').getContext('2d');

let myPieChart

let checkedBox


function renderChart(){
	

	let datas = {
	    value: [14565, 3454],
	    labels: ['Ingresos', 'Egresos']
	};

	myPieChart = new Chart(doughnutChart, {
	    type: 'doughnut',
	    data: {
	        labels: datas.labels,
	        datasets: [{
	            label: 'Dataset 1',
	            data: datas.value,
	            backgroundColor: ['#388E3C', '#D32F2F']
	        }]
	    },
	    options: {
	        responsive: true,
	        maintainAspectRatio: false,
	        layout: {
	            padding: {
	                top: 0, // Adjust as needed
	                bottom: 20, // Adds space at the bottom, between the chart and the legend
	                left: 0, // Adjust as needed
	                right: 0 // Adjust as needed
	            }
	        },
	        plugins: {
	            tooltip: {
	                callbacks: {
	                    label: function (context) {
	                        let label = context.label || '';
	                        let value = context.parsed;
	                        // Format the value with a comma as a thousand separator
	                        let formattedValue = value.toLocaleString();
	                        return formattedValue + '$ ' + label;
	                    }
	                },
	                titleFont: {
	                    size: 20
	                },
	                bodyFont: {
	                    size: 20
	                },
	                // Position the tooltip at the bottom
	                position: 'average',
	                // Align the tooltip to the bottom
	                yAlign: 'bottom'
	            },
	            legend: {
	                //display: false,
	                position: 'bottom', // Position the legend at the bottom
	                labels: {
	                    font: {
	                        size: 20 // Adjust the font size as needed
	                    },
	                    color: checkedBox? "#ffffff" : "#707070"
	                }
	            }
	        }
	    }
	});
}


renderChart()


// night mode


let nightMode = localStorage.getItem('nightMode');

// if the night mode state exists, set the toggle to the corresponding state
if (nightMode) {
  let toggle = document.getElementById('toggle');
  toggle.checked = JSON.parse(nightMode);
  toggleMode(); // toggle the mode to update the UI
}



function toggleMode() {
  let body = document.body;
  let toggle = document.getElementById("toggle");
  if (toggle.checked) {
  	checkedBox = true
    body.classList.add("night-mode");
    localStorage.setItem('nightMode', true); // save the night mode state to local storage
    let doughnutChart = document.getElementById('doughnutChart')
    myPieChart.destroy()
    renderChart()
  } else {
  	checkedBox = false
    body.classList.remove("night-mode");
    localStorage.setItem('nightMode', false); // save the night mode state to local storage
    myPieChart.destroy()
    renderChart()
  }
}









