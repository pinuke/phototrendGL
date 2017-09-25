function extractImages( uploads, callback )
{
  if( uploads && uploads[0] )
  {
    log( "Files detected: " + uploads.length + " files" );
    for( var i = 0; i < uploads.length; i++ )
    {

      if( (/\.(png|jpeg|jpg)$/i).test(uploads[i].name) )
      {

        var img = new Image;
        (function (val, callback) {
          img.addEventListener( "load", function (){
            
            //PLOTTER:
            
            var virtual = document.createElement( "canvas" );
            virtual.width = this.width;
            virtual.height = this.height;
            
            var context = virtual.getContext( "2d" );
            
            context.drawImage( this, 0, 0 );
            var imageData = context.getImageData( 0, 0, this.width , this.height );
            
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
              vertices.red[ i ] = [];
              vertices.blue[ i ] = [];
              vertices.green[ i ] = [];
              vertices.alpha[ i ] = [];

              for( var c = 0, iop = index_of_pixel( c, i ); c < imageData.width; c++)
              {
                vertices.red[ i ][ c ] = imageData.data[ iop ];
                vertices.green[ i ][ c ] = imageData.data[ iop + 1 ]
                vertices.blue[ i ][ c ] = imageData.data[ iop + 2 ]
                vertices.alpha[ i ][ c ] = imageData.data[ iop + 3 ]
              }
            }

            callback( plot );
            
            window.URL.revokeObjectURL( this.src );
          })
        })(uploads[i].name, callback);
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
  extractImages( this.files );
});
