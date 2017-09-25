function loadPlot( name, image ){
  var two_d = document.createElement( "canvas" );
  two_d.width = image.width;
  two_d.height = image.height;
  var context = two_d.getContext( '2d' );
  context.drawImage( image, 0, 0 );
  var imageData = context.getImageData( 0, 0, image.width , image.height );
  
  var plot = {
    "vertices" : {
      "red" : [],
      "blue" : [],
      "green" : [],
      "alpha" : []
    },
    "name" : name
  }
  var vertices = plot.vertices;
  
  function index_of_pixel( x, y ){
    var coeff = imageData.width * 4 //data per row of pixels should be the image width multiplied by 4 for R, G, B, + A values
    var ret = coeff * y //index of first pixel in y rows of pixels
    ret += x * 4 //index of pixel
    return ret
  }
  for( var i = 0; i < imageData.height; i++)
  {
    for( var c = 0, iop = index_of_pixel( c, i ); c < imageData.width; c++)
    {
      vertices.red[ i ][ c ] = imageData.data[ iop ];
      vertices.green[ i ][ c ] = imageData.data[ iop + 1 ]
      vertices.blue[ i ][ c ] = imageData.data[ iop + 2 ]
      vertices.alpha[ i ][ c ] = imageData.data[ iop + 3 ]
    }
  }
  
  renderGraph(plot);
  
}
