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
  function mid_point_height ( x, y, offset ){
    var ret = imageData.data[ index_of_pixel( x, y ) + offset ]
    ret += imageData.data[ index_of_pixel( x - 1, y ) + offset ]
    ret += imageData.data[ index_of_pixel( x, y - 1 ) + offset ]
    ret += imageData.data[ index_of_pixel( x - 1, y - 1 ) + offset ]
    ret = ret/1020
    return ret
  }
  for( var i = 0; i < imageData.height; i++)
  {
    for( var c = 0, iop = index_of_pixel( c, i ); c < imageData.width; c++)
    {
      vertices.red[ 2i ][ 2c ] = c, imageData.data[ iop ];
      vertices.green[ 2i ][ 2c ] = c, imageData.data[ iop + 1 ]
      vertices.blue[ 2i ][ 2c ] = c, imageData.data[ iop + 2 ]
      vertices.alpha[ 2i ][ 2c ] = c, imageData.data[ iop + 3 ]
      
      if( c > 0 && i > 0 ){
        //Bottom Right Vertices
        // - cannot be at left and upper boundary
        // - middle point is found only when bottom right is found
        
        vertices.red[ 2i - 1 ][ 2c - 1 ] = mid_point_height( c, i , 0 );
        vertices.green[ 2i - 1 ][ 2c - 1 ] = mid_point_height( c, i , 1 );
        vertices.blue[ 2i - 1 ][ 2c - 1 ] = mid_point_height( c, i , 2 );
        vertices.alpha[ 2i - 1 ][ 2c - 1 ] = mid_point_height( c, i , 3 );
      }
    }
  }
  
  return plot;
  
}
