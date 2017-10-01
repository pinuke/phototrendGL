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
			var coords = {
				"TL" : [],
				"TR" : [],
				"BR" : [],
				"BL" : [],
				"ra" : [],
				"rb" : [],
				"ha" : [],
				"hb" : []
			}
			var edge;
			var channels = [ "red", "blue", "green", "alpha" ]
  
            function index_of_pixel( coord_array ){
              var coeff = imageData.width * 4 //data per row of pixels should be the image width multiplied by 4 for R, G, B, + A values
              var ret = coeff * coord_array[1] //index of first pixel in y rows of pixels
              ret += coord_array[0] * 4 //index of pixel
              return ret
            }
            for( var i = 0; i < imageData.height - 1; i++)
            {
				
				for( var c = 0; c < imageData.width - 1; i++)
				{
					
					channels.forEach( function( name, ind ){
						
						coords.TL = [ c, i ];
						coords.TR = [ c + 1, i ];
						coords.BR = [ c + 1, i + 1 ];
						coords.BL = [ c, i + 1 ];
						
						height[0] = imageData.data[ index_of_pixel( coords.TL ) + ind ]
						height[1] = imageData.data[ index_of_pixel( coords.TR ) + ind ]
						height[2] = imageData.data[ index_of_pixel( coords.BR ) + ind ]
						height[3] = imageData.data[ index_of_pixel( coords.BL ) + ind ]
						
						vertices[ name ] = vertices[ name ].concat([
						
							coords.TL[0], coords.TL[1], height[0],
							coords.TR[0], coords.TR[1], height[1],
							coords.TL[0] + 0.5, coords.TL[1] + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
							
							coords.TR[0], coords.TR[1], height[1],
							coords.BR[0], coords.BR[1], height[2],
							coords.TL[0] + 0.5, coords.TL[1] + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
							
							coords.BR[0], coords.BR[1], height[2],
							coords.BL[0], coords.BL[1], height[3],
							coords.TL[0] + 0.5, coords.TL[1] + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
							
							coords.BL[0], coords.BL[1], height[3],
							coords.TL[0], coords.TL[1], height[4],
							coords.TL[0] + 0.5, coords.TL[1] + 0.5, ( height[0] + height[1] + height[2] + height[3] ) / 4,
						
						])
						
						edge = true;
						
						if( i === 0 )
						{
							
							coords.ra = coords.TL
							coords.ha = height[0]
							coords.rb = coords.TR
							coords.hb = height[1]
							
						}
						else
						
						if( c === imageData.width - 2 )
						{
							
							coords.ra = coords.TR
							coords.ha = height[1]
							coords.rb = coords.BR
							coords.hb = height[2]
							
						}
						else
						
						if( i === imageData.height - 2 )
						{
							
							coords.ra = coords.BR
							coords.ha = height[2]
							coords.rb = coords.BL
							coords.hb = height[3]
							
						}
						else
						
						if( c === 0 )
						{
							
							coords.ra = coords.BL
							coords.ha = height[3]
							coords.rb = coords.TL
							coords.hb = height[0]
							
						}
						else
							edge = false;
						
						if( edge ){
							
							vertices[ name ] = vertices[ name ].concat(
							
								coord.ra.concat( coord.ha ),
								coord.rb.concat( coord.hb ),
								
								coord.ra.concat( 0 ),
								
								coord.ra.concat( 0 ),
								coord.rb.concat( 0 ),
								
								coord.rb.concat( coord.hb )
								
							)
							
						}
						
					})
					
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
