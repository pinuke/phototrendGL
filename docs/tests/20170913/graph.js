function log( input ){
  document.getElementById( "log" ).innerHTML += input + "<br/>";
}

function loadGraph( name, image ){
  var time = [performance.now()]
  var two_d = document.createElement( "canvas" );
  two_d.width = image.width;
  two_d.height = image.height;
  var context = two_d.getContext( '2d' );
  context.drawImage( image, 0, 0 );
  var imageData = context.getImageData( 0, 0, image.width , image.height );
  log( name + "- imageData:" );
  log( "imageData height: " + imageData.height );
  log( "imageData width: " + imageData.width );
  log( "Image height: " + image.height );
  log( "Image width: " + image.width );
  log( "Canvas height: " + two_d.height );
  log( "Canvas width: " + two_d.width );
  log( "Expected size: " + image.height * image.width * 4 );
  log( "Actual size: " + imageData.data.length );
//  log( "<pre>" + JSON.stringify( imageData.data, null, '\t' ) + "</pre>" );
  time[1]=performance.now()
  log( "Execution Time: " + ( time[1] - time[0] ) + "ms" );
  log( "Last Pixel: " + imageData.data[imageData.data.length - 4]);
  log( "Expected Pixel: " + context.getImageData( image.width-1 , image.height-1 , 1 , 1 ).data[0] );
  
  var vertices = {
    "red" : [],
    "blue" : [],
    "green" : [],
    "alpha" : []
  }
  var quads = [] //should be the same for all graphs, as this does not require height, just pixel.
  var triangles = [] //triangle elements consists of *references* to vertices, so they are not height-dependent
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
  function add_to_quad ( vertex_index, quad, position ){
    
    //position 0 = TR
    //position 1 = TL
    //position 2 = BL
    //position 3 = BR
    //position 4 = M
    
    if( position < 4 )
      quads[ quad ].corners[ position ] = vertex_index;
    
    if( position === 4 ){
      
      quads[ quad ].middle = vertex_index;
      
      triangles[ triangles.length ] = [ quads[ quad ].corners[ 0 ], quads[ quad ].corners[ 1 ], quads[ quad ].middle ]
      triangles[ triangles.length ] = [ quads[ quad ].corners[ 1 ], quads[ quad ].corners[ 2 ], quads[ quad ].middle ]
      triangles[ triangles.length ] = [ quads[ quad ].corners[ 2 ], quads[ quad ].corners[ 3 ], quads[ quad ].middle ]
      triangles[ triangles.length ] = [ quads[ quad ].corners[ 3 ], quads[ quad ].corners[ 0 ], quads[ quad ].middle ]
      
    }
  }
  for( var i = 0; i < imageData.height; i++)
  {
    for( var c = 0; c < imageData.width; c++)
    {
      vertices.red[ vertices.red.length ] = [ c, i, imageData.data[ index_of_pixel( c, i ) ]/255 ]
      vertices.green[ vertices.green.length ] = [ c, i, imageData.data[ index_of_pixel( c, i ) + 1 ]/255 ]
      vertices.blue[ vertices.blue.length ] = [ c, i, imageData.data[ index_of_pixel( c, i ) + 2 ]/255 ]
      vertices.alpha[ vertices.alpha.length ] = [ c, i, imageData.data[ index_of_pixel( c, i ) + 3 ]/255 ]
      
      if( c > 0 && i < imageData.height - 1 ) //Top Right Vertices cannot be at left and bottom boundary
        add_to_quad( vertices.red.length - 1 , i * imageData.width + c - 1, 0 );
      
      if( c < imageData.width - 1 && i < imageData.height - 1 ) //Top Left Vertices cannot be at right or bottom boundary
        add_to_quad( vertices.red.length - 1 , i * imageData.width + c, 1 );
      
      if( c < imageData.width - 1 && i > 0 ) //Bottom Left Vertices cannot be at right or upper boundary
        add_to_quad( vertices.red.length - 1 , ( i - 1 ) * imageData.width + c, 2 );
      
      if( c > 0 && i > 0 ){ //Bottom Right Vertices cannot be at left and upper boundary
        add_to_quad( vertices.red.length - 1, ( i - 1 ) * imageData.width + c - 1, 3 );
        add_to_quad( vertices.red.length, ( i - 1 ) * imageData.width + c - 1, 4 );
        
        vertices.red[ vertices.red.length ] = [ c - 0.5, i - 0.5, mid_point_height( c, i , 0 ) ]
        vertices.green[ vertices.red.length ] = [ c - 0.5, i - 0.5, mid_point_height( c, i , 0 ) ]
        vertices.blue[ vertices.red.length ] = [ c - 0.5, i - 0.5, mid_point_height( c, i , 0 ) ]
        vertices.alpha[ vertices.red.length ] = [ c - 0.5, i - 0.5, mid_point_height( c, i , 0 ) ]
      }
    }
  }
}

function renderImages( uploads )
{
  log( "Checking files..." );
  if( uploads && uploads[0] )
  {
    log( "Files detected: " + uploads.length + " files" );
    for( var i = 0; i < uploads.length; i++ )
    {
      log( uploads[i].name + ": Checking file extension..." );
      if( (/\.(png|jpeg|jpg)$/i).test(uploads[i].name) )
      {
        log( uploads[i].name + ": File is graphable!" );
        log( uploads[i].name + ": Preparing image for graphing..." );
        var img = new Image;
        (function (val) {
          img.addEventListener( "load", function (){
            log( val + ": Graphing..." );
            loadGraph( val, this );
            log( val + ": Image graphed" );
            window.URL.revokeObjectURL( this.src );
          })
        })(uploads[i].name);
        log( uploads[i].name + ": Load handler set" );
        img.src = window.URL.createObjectURL(uploads[i]);
      }
      else if( (/\.(gif|apng)$/i).test(uploads[i].name) )
      {
        log( uploads[i].name +": Image extension not supported at this time!" );
      }
      else
      {
        log( uploads[i].name +": Extension not supported!" );
      }
    }
  }
  else
  {
    log( "No files provided during upload to renderImage()" );
  }
}

document.getElementById( "upload" ).addEventListener("change", function(){
  log( "Input detected!" );
  renderImages( this.files );
});
