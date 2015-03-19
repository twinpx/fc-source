$(document).bind("click", function() {

  $("#top_panel .kitchen .submenu")
    .slideUp("middle")
      .siblings("a")
        .children("span")
          .addClass("up")
          .removeClass("down");
          
  $("#top_panel .add .body").slideUp( "middle" );
  
});

$( "#top_panel span.kitchen > a" ).click( function(e) {
  $( this )
    .siblings( ".submenu" )
      .slideToggle( "middle" ).end()
    .children( "span" )
      .toggleClass( "up" )
      .toggleClass( "down" );
      
  e.preventDefault();
  e.stopPropagation();
});

$("#top_panel .add .button").click( function(e) {
  $( this )
    .siblings( ".submenu" ).children( ".body" )
      .slideToggle( "middle" );
    
  e.preventDefault();
  e.stopPropagation();
});

if ( window.BX ) {
	BX.addCustomEvent( "onFrameDataReceived", function () {

    $( "#top_panel span.kitchen > a" ).click( function(e) {
      $( this )
        .siblings( ".submenu" )
          .slideToggle( "middle" ).end()
        .children( "span" )
          .toggleClass( "up" )
          .toggleClass( "down" );
          
      e.preventDefault();
      e.stopPropagation();
    });

    $("#top_panel .add .button").click( function(e) {
      $( this )
        .siblings( ".submenu" ).children( ".body" )
          .slideToggle( "middle" );
        
      e.preventDefault();
      e.stopPropagation();
    });

	});
}