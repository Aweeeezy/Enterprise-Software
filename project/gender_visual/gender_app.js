var data = [
    {dept: 'Quality Management',
     male: 10921,
     female: 7374},
    {dept: 'Finance',
     male: 9273,
     female: 6306},
    {dept: 'Research',
     male: 11587,
     female: 7698},
    {dept: 'Human Resources',
     male: 9701,
     female: 6370},
    {dept: 'Marketing',
     male: 11111,
     female: 7315},
    {dept: 'Development',
     male: 46218,
     female: 30740},
    {dept: 'Customer Service',
     male: 13101,
     female: 8712},
    {dept: 'Production',
     male: 39885,
     female: 26790},
    {dept: 'Sales',
     male: 28176,
     female: 18746},
];


var agg_data = [
];

male_total = 0;
female_total = 0;
data.forEach(function (d) {
    male_total += d.male;
    female_total += d.female;
});
agg_data.push(male_total);
agg_data.push(female_total);
console.log('agg_data: ' + agg_data);

boy_blue = '#24D5D8';
girl_green = '#38B487';

var depts  = data.map(function(d) {
  return d.dept
});

var margin = {top: 50, right: 5, bottom: 50, left: 100};
var fullWidth = 1000;
var fullHeight = 700;

var width = fullWidth - margin.right - margin.left;
var height = fullHeight - margin.top - margin.bottom;

var svg = d3.select('#gender_chart').append('svg')
  .attr('width', fullWidth)
  .attr('height', fullHeight)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var deptScale = d3.scaleBand()
  .domain(depts)
  .range([0, width])
  .paddingInner(0.1);

var bandwidth = deptScale.bandwidth() / 2.5;

var maxVal = d3.max(data, function(d) { return Math.max(d.male, d.female); });
var valScale = d3.scaleLinear()
  .domain([0, maxVal])
  .range([height, 0])
  .nice();

var xAxis = d3.axisBottom(deptScale);
var yAxis = d3.axisLeft(valScale);

var xAxisEle = svg.append('g')
  .classed('x axis', true)
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

var yAxisEle = svg.append('g')
  .classed('y axis', true)
  .call(yAxis);

var xText = xAxisEle.append('text')
  .style('text-anchor', 'middle')
  .style('fill', 'black')
  .attr('dx', width/2)
  .attr('dy', '2em')
  .style('font-size', 24)
  .style('font-weight', 'bold')
  .text('Departments');

var yText = yAxisEle.append('text')
  .attr('transform', 'rotate(-90)translate(-' + height/2 + ', -20)')
  .style('text-anchor', 'middle')
  .style('fill', 'black')
  .attr('dy', '-2em')
  .style('font-size', 24)
  .style('font-weight', 'bold')
  .text('No. Employees');

var barHolder = svg.append('g')
  .classed('bar-holder', true);

var bars = barHolder.selectAll('rect.bar').data(data).enter()
bars.append('rect')
    .classed('bar', true)
    .attr('x', function(d, i) {
      return deptScale(d.dept) + 7;
    })
    .attr('width', bandwidth)
    .attr('y', function(d) {
      return valScale(d.male);
    })
    .attr('height', function(d) {
      return height - valScale(d.male);
    })
    .style('fill', boy_blue);
bars.append('rect')
     .classed('bar', true)
     .attr('x', function(d, i) {
       return (deptScale(d.dept) + bandwidth + 11);
     })
     .attr('width', bandwidth)
     .attr('y', function(d) {
       return valScale(d.female);
     })
     .attr('height', function(d) {
       return height - valScale(d.female);
     })
     .style('fill', girl_green);

var legend = svg.append("g")
  .attr("class", "legend")
  .attr("x", 65)
  .attr("y", 25)
  .attr("height", 100)
  .attr("width", 200);

legend.append("text")
  .attr("x",  65)
  .attr("y", 20)
  .text(function(d) { return 'Male'; });

legend.append("rect")
  .attr("x", 130)
  .attr("y", 5)
  .attr("width", 100)
  .attr("height", 20)
  .style("fill", function(d) { return boy_blue });

legend.append("text")
  .attr("x",  65)
  .attr("y", 50)
  .text(function(d) { return 'Female'; });

legend.append("rect")
  .attr("x", 130)
  .attr("y", 35)
  .attr("width", 100)
  .attr("height", 20)
  .style("fill", function(d) { return girl_green});

