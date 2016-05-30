$( '.b-figure__img img' ).each( function() {
  var $this = $( this );
  var title = $this.attr( 'title' );
  $this.closest( 'figure' ).find( 'figcaption' ).text( title );
});


