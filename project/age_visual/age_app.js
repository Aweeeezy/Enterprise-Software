var data = [
    [64, 22986],
    [65, 22928],
    [66, 6079],
    [53, 17209],
    [54, 23090],
    [55, 22769],
    [56, 23119],
    [57, 22972],
    [58, 23516],
    [59, 22998],
    [60, 22991],
    [61, 23082],
    [62, 22949],
    [63, 23336]
];

var colors = [
    '#0000ff',
    '#0000e5',
    '#0000cc',
    '#0000b2',
    '#000099',
    '#00007f',
    '#000066',
    '#00004c',
    '#00004c',
    '#00004c',
    '#000000'
];

var chart_height = 700;
var chart_width = 1000;
var padding = 80;
var y_shift = 110;

var svg = d3.select('#age_chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);


svg.append('clipPath')
    .attr('id', 'plot-clip-path')
    .append('rect')
    .attr('x', padding )
    .attr('y', padding )
    .attr('width', chart_width - padding * 3 )
    .attr('height', chart_height - padding  );

var x_scale = d3.scaleLinear()
    .domain([d3.min(data, function(d){
        return d[0] -1;
    }), d3.max(data, function(d){
        console.log(d[0] + 1);
        return d[0] + 1 ;
    })])
    .range([padding, chart_width - padding * 2]);

// var x_scale = d3.scaleLinear()
//     .domain([50, 70])
//     .range([padding, chart_width - padding ]);

var y_scale = d3.scaleLinear()
    //.domain([6000, 30000])
    .domain([5000, d3.max(data, function(d){
        return d[1];
    })])
    .range([chart_height - padding, padding * 2]);

//create axis
var x_axis = d3.axisBottom( x_scale );
svg.append( 'g' )
    .attr('class', 'x-axis')
    .attr('transform',
            'translate(40, ' + (chart_height - padding) + ')' )
    .call( x_axis );

svg.append('text')
    .attr('transform', 'translate(' + (chart_width / 2) + ',' + (chart_height - 15) + ')')
    .style('text-anchor', 'text-middle')
    .text('Age')
    .style('font-family', 'sans-serif')
    .style('font-weight', 'bold')
    .style('font-size', '20px');


var y_axis = d3.axisLeft( y_scale );
svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .attr('transform',
            'translate('+y_shift  + ',0)')
    .call( y_axis );

svg.append('text')
    .attr('transform', 'translate(30'  + ',' + chart_height /2 + ')' + 'rotate(-90)')
    // .attr('y', chart_height / 2 )
    // .attr('x', padding )
    //.attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('No. of Employees')
    .style('font-family', 'sans-serif')
    .style('font-weight', 'bold')
    .style('font-size', '20px');





// create circles
svg.append( 'g' )
    .attr('id', 'plot')
    .attr('clip-path', 'url(#plot-clip-path)')
    .selectAll( 'circle' )
    .data(data)
    .enter()
    .append( 'circle' )
    .attr('cx', function(d){
        return x_scale( d[0] );
    })
    .attr('cy', function(d){
       // console.log('inside cy for circle');
        return y_scale( d[1] );
    })
    .attr('r', 10)
    .attr('fill', '#0000b2')
    .append('title')
    .text(function(d){
        return 'Age: ' + d[0] + '\n'
                + 'Freq: ' + d[1];
    })
    .style(
        'position', 'absolute',
        'text-align', 'center',
        'width', '50px',
        'height', '28px',
        'padding', '2px',
        'font', '12px sans-serif',
        'background', 'lightsteelblue',
        'border', '0px',
        'border-radius', '8px',
    );




