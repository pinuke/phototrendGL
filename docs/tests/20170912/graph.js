function log( input ){
  document.getElementById( "log" ).innerHTML += input + "<br/>";
  console.log( input );
}

function loadGraph( name, image ){
  var two_d = document.createElement( "canvas" );
  var context = two_d.getContext( '2d' );
  context.drawImage( image, 0, 0 );
  var imageData = context.getImageData( 0, 0, image.width - 1, image.height - 1);
  log( "imageData:<br/>" + JSON.stringify( imageData, null, '\t' ) );
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
        var img = new Image;
        img.onload = function()
        {
          window.URL.revokeObjectURL( image.src );
        }
        img.src = window.URL.createObjectURL(uploads[i]);
        log( "Graphable File: " + uploads[i].name );
        log( uploads[i].name + ": Graphing..." );
        loadGraph( uploads[i].name, image );
        log( uploads[i].name + ": Image graphed" );
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

document.getElementById( "upload" ).onChange = function()
{
  log( "Input detected!" );
  renderImages( this.files );
}
