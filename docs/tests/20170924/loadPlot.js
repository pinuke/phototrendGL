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
    "quads" : [],
    "triangles" : [],
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
      vertices.red[ vertices.red.length ] = [ 
        c, i, 
        imageData.data[ iop ]
      ]
      vertices.green[ vertices.green.length ] = [ 
        c, i, 
        imageData.data[ iop + 1 ]
      ]
      vertices.blue[ vertices.blue.length ] = [ 
        c, i, 
        imageData.data[ iop + 2 ]
      ]
      vertices.alpha[ vertices.alpha.length ] = [ 
        c, i, 
        imageData.data[ iop + 3 ]
      ]
      
      if( c > 0 && i < imageData.height - 1 ) //Top Right Vertices - cannot be at left and bottom boundary
        plot.quads[ i * imageData.width + c - 1 ].corners[ 0 ] = vertices.red.length - 1;
      
      if( c < imageData.width - 1 && i < imageData.height - 1 ){
        //Top Left Vertices 
        // - cannot be at right or bottom boundary
        // - first corner to be found
        
        plot.quads[ i * imageData.width + c ] = {
          "corners": [],
          "middle"
        }
        plot.quads[ i * imageData.width + c ].corners[ 1 ] = vertices.red.length - 1;
        
      }
      
      if( c < imageData.width - 1 && i > 0 ) //Bottom Left Vertices - cannot be at right or upper boundary
        plot.quads[ ( i - 1 ) * imageData.width + c ].corners[ 2 ] = vertices.red.length - 1;
      
      if( c > 0 && i > 0 ){
        //Bottom Right Vertices
        // - cannot be at left and upper boundary
        // - middle point is found and triangles are established only when bottom right is found
        
        plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 3 ] = vertices.red.length - 1;
      
        plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].middle = vertices.red.length;

        plot.triangles[ plot.triangles.length ] = [ 
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 0 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 1 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].middle 
        ]
        plot.triangles[ plot.triangles.length ] = [ 
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 1 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 2 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].middle 
        ]
        plot.triangles[ plot.triangles.length ] = [ 
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 2 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 3 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].middle 
        ]
        plot.triangles[ plot.triangles.length ] = [ 
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 3 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].corners[ 0 ],
          plot.quads[ ( i - 1 ) * imageData.width + c - 1 ].middle
        ]
        
        vertices.red[ vertices.red.length ] = [ 
          c - 0.5, 
          i - 0.5,
          mid_point_height( c, i , 0 ) 
        ]
        vertices.green[ vertices.red.length ] = [ 
          c - 0.5, 
          i - 0.5, 
          mid_point_height( c, i , 1 ) 
        ]
        vertices.blue[ vertices.red.length ] = [ 
          c - 0.5, 
          i - 0.5, 
          mid_point_height( c, i , 2 ) 
        ]
        vertices.alpha[ vertices.red.length ] = [ 
          c - 0.5, 
          i - 0.5, 
          mid_point_height( c, i , 3 ) 
        ]
      }
    }
  }
  
  return plot;
  
}
