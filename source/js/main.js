// vertical align for recipe preview photo
$( ".recipe_list_item .photo a, .b-recipe-preview__photo__link" ).each( function() {
  var $this = $( this ),
    $img = $this.children( "img" ),
    img = new Image(),
    marginTop;
    
  img.src = $img.attr("src");
  var hei = Math.floor( img.height * $img.attr("width") / img.width );
  
  if ( hei > 0 ) {
    marginTop = (parseInt($this.css("height"))/2-hei/2);
    $img.css({ marginTop: marginTop + "px" });
  }
  else {
    $img.load( function() {
      var hei = Math.floor( img.height * $img.attr( "width" ) / img.width );
      if ( hei > 0 ) {
        marginTop = (parseInt($this.css("height"))/2-hei/2);
        $img.css({ marginTop: marginTop + "px" });
      }
    });
  }
});
