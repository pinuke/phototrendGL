function renderGraph( plot ){
  // initial data..
  z1 = plot.vertices.red
  // generating data for other traces..
  z2 = plot.vertices.green

  z3 = plot.vertices.blue
  
  z4 = plot.vertices.alpha

  // creating data objects..
  var data_z1 = {z: z1, type: 'surface'};
  //var data_z2 = {z: z2, showscale: false, opacity:0.9, type: 'surface'};
  //var data_z3 = {z: z3, showscale: false, opacity:0.9, type: 'surface'};

  // Plotting the surfaces..
  Plotly.newPlot('myDiv', [data_z1]);
}
