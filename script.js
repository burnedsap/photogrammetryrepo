
var TITLE = 'Geekbench Scores';
var POINT_X = 'price'; // column name for x values in data.csv
var POINT_X_PREFIX = '$'; // prefix for x values, eg '$'	
var POINT_Y = 'score'; // column name for y values in data.csv
var POINT_MY = 'm_score'; // column name for y values in data.csv
var POINT_Y_PREFIX = ''; // prefix for x values, eg 'USD '
var POINT_NAME = 'name'; // point names that appear in tooltip
var POINT_COLOR = 'rgba(0, 0, 255,0.7)'; // point color, eg `black` or `rgba(10, 100, 44, 0.8)`
var POINT_MCOLOR = 'rgba(242, 137, 39,0.7)'; // point color, eg `black` or `rgba(10, 100, 44, 0.8)`
var POINT_RADIUS = 5; // radius of each data point
var POINT_DESCRIPTION = 'description';
var X_AXIS = 'Price';  // x-axis label and label in tooltip
var Y_AXIS = 'Geekbench Score'; // y-axis label and label in tooltip
var SHOW_GRID = true; // `true` to show the grid, `false` to hide


// Read data file and create a chart
d3.csv('data 2.csv').then(function (rows) {

	var data1 = rows.map(function (row) {
		return {
			x: row[POINT_X],
			y: row[POINT_Y],
			name: row[POINT_NAME],
			description: row[POINT_DESCRIPTION]
		}
	})
	var data2 = rows.map(function (row) {
		return {
			x: row[POINT_X],
			y: row[POINT_MY],
			name: row[POINT_NAME],
			description: row[POINT_DESCRIPTION]
		}
	})

	var scatterChartData = {
		datasets: [{
			label: 'Single Core',
			backgroundColor: POINT_COLOR,
			data: data1,
			pointRadius: 5,
			pointHoverRadius: POINT_RADIUS + 2,

		},
		{
			label: 'Multi Core',
			backgroundColor: POINT_MCOLOR,
			data: data2,
			pointRadius: 5,
			pointHoverRadius: POINT_RADIUS + 2,

		}]
	};

	var ctx = document.getElementById('mac-21').getContext('2d');
	Chart.Scatter(ctx, {
		data: scatterChartData,
		options: {
			title: {
				display: true,
				text: TITLE,
				fontSize: 14,

			},
			legend: {
				display: true,

			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: X_AXIS
					},
					gridLines: {
						display: SHOW_GRID,

					},
					ticks: {
						callback: function (value, index, values) {
							return POINT_X_PREFIX + value.toLocaleString();
						}
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: Y_AXIS
					},
					gridLines: {
						display: SHOW_GRID,

					},
					ticks: {
						callback: function (value, index, values) {
							return POINT_Y_PREFIX + value.toLocaleString();
						}
					}
				}]
			},
			tooltips: {
				displayColors: false,
				callbacks: {
					title: function (tooltipItem, all) {
						return [
							all.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].name, all.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].description,]
					},
					label: function (tooltipItem, all) {
						return [
							X_AXIS + ': ' + POINT_X_PREFIX + tooltipItem.xLabel.toLocaleString(), 'Score' + ': ' + POINT_Y_PREFIX + tooltipItem.yLabel.toLocaleString(), 'Analysis: ' + ((tooltipItem.xLabel / tooltipItem.yLabel) * 1).toFixed(2)

						]
					}
				}
			}
		}
	});
});
