function renderGraph( plot ){
  z1 = plot.vertices.red
  z2 = plot.vertices.green
  z3 = plot.vertices.blue
  z4 = plot.vertices.alpha

  // creating data objects..
  var data_z1 = {
    z: z1,
    showscale: false,
    type: 'surface',
    colorscale: [ 
      [0, 'rgb(0,0,0)'], 
      [1, 'rgb(255,0,0)']
    ]
  };
  var data_z2 = {
    z: z2,
    showscale: false,
    type: 'surface',
    colorscale: [ 
      [0, 'rgb(0,0,0)'], 
      [1, 'rgb(0,255,0)']
    ]
  };
  var data_z3 =  {
    z: z3,
    showscale: false,
    type: 'surface',
    colorscale: [ 
      [0, 'rgb(0,0,0)'], 
      [1, 'rgb(0,0,255)']
    ]
  };
  var data_z4 =  {
    z: z4,
    showscale: false,
    type: 'surface',
    colorscale: [ 
      [0, 'rgb(0,0,0)'], 
      [1, 'rgb(230,230,230)']
    ]
  };

  // Plotting the surfaces..
  Plotly.newPlot('myDiv', [data_z4]);
}
