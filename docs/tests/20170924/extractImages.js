function extractImages( uploads )
{
  if( uploads && uploads[0] )
  {
//    log( "Files detected: " + uploads.length + " files" );
    for( var i = 0; i < uploads.length; i++ )
    {
//      log( uploads[i].name + ": Checking file extension..." );
      if( (/\.(png|jpeg|jpg)$/i).test(uploads[i].name) )
      {
//        log( uploads[i].name + ": File is graphable! Graphing it..." );
        var img = new Image;
        (function (val) {
          img.addEventListener( "load", function (){
            loadPlot( val, this );
            window.URL.revokeObjectURL( this.src );
          })
        })(uploads[i].name);
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
