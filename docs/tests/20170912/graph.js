function log( input ){
  document.getElementById( "log" ).innerHTML += input;
}

function loadGraph( image ){
  var two_d = document.createElement( "canvas" );
  var context = two_d.getContext( '2d' );
  context.drawImage( image, 0, 0 );
  var imageData = context.getImageData( 0, 0, image.width - 1, image.height - 1);
  log( "imageData:<br/>" + JSON.stringify( imageData, null, '\t' ) + "<br/>" );
}

function renderImages( uploads )
{
  if( uploads && uploads[0] )
  {
    for( var i = 0; i < uploads.length; i++ )
    {
      if( (/\.(png|jpeg|jpg)$/i).test(uploads[i].name) )
      {
        var img = new Image;
        img.onload = function()
        {
          window.URL.revokeObjectURL( image.src );
        }
        img.src = window.URL.createObjectURL(uploads[i]);
        log( "filename: " + uploads[i].name + "<br/>" );
        loadGraph( image )
      }
      else if( (/\.(gif|apng)$/i).test(uploads[i].name) )
      {
        log( uploads[i].name +" - Image extension not supported at this time<br/>" );
      }
      else
      {
        log( uploads[i].name +" - Extension not supported<br/>" );
      }
    }
  }
  else
  {
    log( "No files provided during upload to renderImage()<br/>" );
  }
}

document.getElementById( "upload" ).onChange = function()
{
  renderImages( this.files );
}
