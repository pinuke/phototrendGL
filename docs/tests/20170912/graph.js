function log( input ){

}

funtion loadGraph( image ){
  var two_d = document.createElement( "canvas" );
  var context = two_d.getContext( '2d' );
  context.drawImage( image, 0, 0 );
  var imageData = context.getImageData( 0, 0, image.width - 1, image.height - 1);
  log( "imageData:<br/>" + JSON.stringify( imageData, null, '\t' ) + "<br/>" );
}

function renderImages( uploads )
{
  var errors="";
  
  if( uploads && uploads[0] )
  {
    for( var i = 0; i < uploads.length; i++ )
    {
      if( (/\.(png|jpeg|jpg)$/i).test(uploads[i].name) )
      {
        var img = new Image;
        img.onload = function()
        {
          window.URL.revokeObjectURL(image.src);
        }
        img.src = window.URL.createObjectURL(uploads[i]);
        loadGraph( image )
      }
      else if( (/\.(gif|apng)$/i).test(uploads[i].name) )
      {
        errors += uploads[i].name +" - Image extension not supported at this time<br/>";
      }
      else
      {
        errors += uploads[i].name +" - Extension not supported<br/>";
      }
    }
  }
  else
  {
    errors += "No files provided during upload to renderImage()<br/>";
  }
}

