funtion getVertices( image ){
  var virtual = document.createElement( "canvas" );
  var context = virtual.getContext('2d');
  context.drawImage(image, x, y);
  return context.getImageData(x1, y1, x2, y2)
}

function displayPreview( uploads ) {
    var reader = new FileReader();
    reader.onload = onFileLoad;
    reader.readAsDataURL(files[0]);
}
