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
			var heights = [];
  
            function index_of_pixel( x, y ){
              var coeff = imageData.width * 4 //data per row of pixels should be the image width multiplied by 4 for R, G, B, + A values
              var ret = coeff * y //index of first pixel in y rows of pixels
              ret += x * 4 //index of pixel
              return ret
            }
            for( var i = 0; i < imageData.height - 1; i++)
            {
				
				for( var c = 0; c < imageData.width - 1; i++)
				{
					
					height[0] = imageData.data[ index_of_pixel( c, i ) ]
					height[1] = imageData.data[ index_of_pixel( c + 1, i ) ]
					height[2] = imageData.data[ index_of_pixel( c + 1, i + 1 ) ]
					height[3] = imageData.data[ index_of_pixel( c, i + 1 ) ]
					
					vertices.red.concat([
					
						c, i, height[0],
						c + 1, i, height[1],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i, height[1],
						c + 1, i + 1, height[2],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i + 1, height[2],
						c, i + 1, height[3],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c, i + 1, height[3],
						c, i, height[0],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
					
					])
					
					height[0] = imageData.data[ index_of_pixel( c, i ) + 1 ]
					height[1] = imageData.data[ index_of_pixel( c + 1, i ) + 1 ]
					height[2] = imageData.data[ index_of_pixel( c + 1, i + 1 ) + 1 ]
					height[3] = imageData.data[ index_of_pixel( c, i + 1 ) + 1 ]
					
					vertices.green.concat([
					
						c, i, height[0],
						c + 1, i, height[1],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i, height[1],
						c + 1, i + 1, height[2],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i + 1, height[2],
						c, i + 1, height[3],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c, i + 1, height[3],
						c, i, height[0],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
					
					])
					
					height[0] = imageData.data[ index_of_pixel( c, i ) + 2 ]
					height[1] = imageData.data[ index_of_pixel( c + 1, i ) + 2 ]
					height[2] = imageData.data[ index_of_pixel( c + 1, i + 1 ) + 2 ]
					height[3] = imageData.data[ index_of_pixel( c, i + 1 ) + 2 ]
					
					vertices.blue.concat([
					
						c, i, height[0],
						c + 1, i, height[1],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i, height[1],
						c + 1, i + 1, height[2],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i + 1, height[2],
						c, i + 1, height[3],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c, i + 1, height[3],
						c, i, height[0],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
					
					])
					
					height[0] = imageData.data[ index_of_pixel( c, i ) + 3 ]
					height[1] = imageData.data[ index_of_pixel( c + 1, i ) + 3 ]
					height[2] = imageData.data[ index_of_pixel( c + 1, i + 1 ) + 3 ]
					height[3] = imageData.data[ index_of_pixel( c, i + 1 ) + 3 ]
					
					vertices.alpha.concat([
					
						c, i, height[0],
						c + 1, i, height[1],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i, height[1],
						c + 1, i + 1, height[2],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c + 1, i + 1, height[2],
						c, i + 1, height[3],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						c, i + 1, height[3],
						c, i, height[0],
						c + 0.5, i + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
					
					])
					
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
