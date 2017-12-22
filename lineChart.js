// This visualization allows users to select a continuous
// region (brush selection) from the context (bottom) graph. 
// The said region is shown in the focus (top) graph.

var svg = d3.select("svg"),
    margin = {top: 30, right: 20, bottom: 120, left: 40},
    marginContext = {top: 415, right: 20, bottom: 45, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    heightContext = +svg.attr("height") - marginContext.top - marginContext.bottom;

var parseDate = d3.timeParse("%Y/%m/%d %H:%M");

var xScale = d3.scaleTime().range([0, width]),
    xScaleContext = d3.scaleTime().range([0, width]),
    yScale = d3.scaleLinear().range([height, 0]),
    yScaleContext = d3.scaleLinear().range([heightContext, 0]);

var xAxis = d3.axisBottom(xScale),
    xAxisContext = d3.axisBottom(xScaleContext),
    yAxis = d3.axisLeft(yScale);

// A one-dimensional brush along x is created. The brushable
// extent is determined by the top-left and bottom-right corner
// points ([0,0] and [width, heightContext], respectively). 
// "brushed" will handle "brush" events.

var brush = d3.brushX()
    .extent([[0, 0], [width, heightContext]])
    .on("brush", brushed);

// Two line generators are required to draw the context and
// focus lines.

var line = d3.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.temperature); });

var lineContext = d3.line()
    .x(function(d) { return xScaleContext(d.date); })
    .y(function(d) { return yScaleContext(d.temperature); });

// The focus graph line is kept within the clipping area 
// when the graph is redrawn.

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height); 

// Two groups are created to hold the focus and context graphs.

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + marginContext.left + "," + marginContext.top + ")");

d3.csv("temperatures.csv", type, function(error, data) {
  if (error) throw error;

  // Input domains for the four scales are defined taking into
  // consideration the data loaded from the csv file. 

  xScale.domain(d3.extent(data, function(d) { return d.date; }));
  yScale.domain([0, 20]);
  xScaleContext.domain(xScale.domain());
  yScaleContext.domain(yScale.domain());

  focus.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  focus.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);   

  focus.append("g")
      .attr("class", "y-axis")
      .call(yAxis
        .ticks(11, "s"));

  focus.append("text")
      .attr("class", "axis-label") 
      .attr("y", -12)
      .style("text-anchor", "middle")
      .text("temp (°C)");     

  context.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineContext);

  context.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + heightContext + ")")
      .call(xAxisContext);

  context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, xScale.range());

  context.append("text")
      .attr("class", "axis-label") 
      .attr("x", width / 2)
      .attr("y", 80)
      .style("text-anchor", "middle")
      .text("date/time");    
});

function brushed() {

  // d3.event.selection returns the current brush selection, i.e.,
  // the minimum and maximum x values. These values are used
  // to define the new xScale domain and redraw the focus chart.
  
  var selection = d3.event.selection;
  xScale.domain(selection.map(xScaleContext.invert, xScaleContext));
  focus.select(".line").attr("d", line);
  focus.select(".x-axis").call(xAxis);
}

function type(d) {

  // Dates from csv file are parsed using parseDate;
  // temperature strings are converted into numbers.

  d.date = parseDate(d.date);
  d.temperature = +d.temperature;
  return d;
}