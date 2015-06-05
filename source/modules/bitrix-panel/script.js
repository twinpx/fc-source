$( '#bx-panel-hider' ).bind( 'click', function() {
  var $header = $( '.b-header' );
  $header.data( 'topBorder', $header.offset().top );
});