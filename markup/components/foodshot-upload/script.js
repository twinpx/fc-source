( function($) {

  'use strict';
  
  $( function() {
    
    //tags
    $( '.chips-placeholder' ).chips({
      placeholder: 'Введите тэг + Enter',
      secondaryPlaceholder: '+Тэг',
      onChipAdd: function( field, chip ) {
        var text = String( $( chip ).text()).split( 'close' )[0];
        $( field ).append( '<input type="hidden" name="tag[]" value="' + text + '">' );
      },
      onChipDelete: function( field, chip ) {
        var text = String( $( chip ).text()).split( 'close' )[0];
        $( 'input[value="' + text + '"]' ).remove();
      }
    });
    
    //URL
    $( '#foodshotURL' ).keyup( fillURL ).click( fillURL ).blur( fillURL );
    
    var inputValue = '';
    
    function fillURL(e) {
      var $input = $( this );
      
      if ( $( '#foodshotURL' ).val() === inputValue ) {
        return;
      } else {
        inputValue = $( '#foodshotURL' ).val();
      }
      
      if ( $( '#foodshotURL' ).val() !== '' ) {
        //check http
        if ( !/^http/.exec( $( '#foodshotURL' ).val())) {
          return;
        }
        //check extention
        if ( !/jpg|jpeg|png|webp/.exec(getFileExtension( $( '#foodshotURL' ).val())) ) {
          return;
        }
        
        //send to the server
        $.ajax({
          url: $input.data( 'url' ),
          type: $input.data( 'method' ),
          dataType: "json",
          data: 'url=' + $input.val(),
          success: function( data ) {
            if ( data && data.STATUS === 'Y' ) {
              //get new image URL
              //show the picture
              showImage( data.URL );
              //set URL as a value
              $input.val( data.URL );
            }
          },
          error: function( a, b, c ) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
        
      }
    }
    
    function getFileExtension( filename ) {
      filename = filename.split( '?' )[0];
      return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }
    
    function showImage( imgURL ) {
      showErrorMessage( '' );
      $( '.b-foodshot-upload__block-body' ).fadeOut();
      $( '#foodshotPreview' ).css({ backgroundImage: 'url( ' + imgURL + ')' }).fadeIn();
      $( '.b-foodshot-upload__remove-image' ).show();
    }
    
    function clearImage() {
      $( '.b-foodshot-upload__block-body' ).fadeIn();
      $( '#foodshotPreview' ).fadeOut( 500, function() {
        $( '#foodshotPreview, .b-foodshot-upload__remove-image' ).hide();
      });
      //clear URL input
      $( '#foodshotURL' ).val( '' ).parent().find( 'label' ).removeClass( 'active' );
      //clear file inputs
      $( '#foodshotFileBase64, #foodshotFileName, #foodshotFileElem' ).val( '' );
    }
    
    //drag and drop
    var dropArea = document.getElementById( 'foodshotDropArea' );
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach( function( eventName ) {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach( function( eventName ) {
      dropArea.addEventListener( eventName, highlight, false );
    });
    
    ['dragleave', 'drop'].forEach( function( eventName ) {
      dropArea.addEventListener( eventName, unhighlight, false );
    });
    
    dropArea.addEventListener( 'drop', handleDrop, false );
    
    $( '#foodshotFileElem' ).change( function(e) {
      
      var file = this.files;
      
      //check file size
      if ( file.size > 15000000 ) {
        //throw the error
        showErrorMessage( 'Размер файла больше 15 Mб.' );
        return;
      }
      
      //check file extention
      if ( !/jpg|jpeg|png|webp/.exec(getFileExtension( file[0].name ))) {
        //throw the error
        showErrorMessage( 'Загрузите изображение JPG, PNG, WEBP.' );
        return;
      }
      
      var reader = new FileReader();
      reader.readAsDataURL( file[0] );
      
      reader.onloadend = function() {
        showImage( reader.result );//base64
      }
      
    });
    
    $( '.b-foodshot-upload__remove-image' ).click( function(e) {
      e.preventDefault();
      clearImage();
    });
    
    $( '.b-foodshot-upload__buttons span' ).click( function(e) {
      e.preventDefault();
      $( '.b-foodshot-upload__text .input-field input, .b-foodshot-upload__text .input-field textarea' ).val( '' );
      clearImage();
      $( '.b-foodshot-upload__buttons button' ).removeClass( 'i-disabled' );
    });
    
    $( '.b-foodshot-upload form' ).submit( function(e) {
      //e.preventDefault();
      $( '.b-foodshot-upload__buttons button' ).addClass( 'i-disabled' );
    });
    
    function preventDefaults (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    function highlight(e) {
      $( '.b-foodshot-upload__block' ).addClass( 'i-highlight' );
    }
    
    function unhighlight(e) {
      $( '.b-foodshot-upload__block' ).removeClass( 'i-highlight' );
    }
    
    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;
      handleFiles( files );
    }
    
    function handleFiles(files) {
      var f = Array.from( files );
      f.forEach( uploadFile );     
    }
    
    function uploadFile( file ) {
      
      //check file size
      if ( file.size > 15000000 ) {
        //throw the error
        showErrorMessage( 'Размер файла больше 15 Mб.' );
        return;
      }
      
      //check file extention
      if ( !/jpg|jpeg|png|webp/.exec(getFileExtension( file.name ))) {
        //throw the error
        showErrorMessage( 'Загрузите изображение JPG, PNG, WEBP.' );
        return;
      }
      
      previewFile( file );
      
      /*var url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ';
      var formData = new FormData();
      formData.append( 'file', file );
      fetch( url, {
        method: 'POST',
        body: formData
      })
      .then( function() {})
      .catch( function() {});*/
    }
    
    function showErrorMessage( message ) {
      $( '.b-foodshot-upload__error' ).text( message );
    }
    
    function previewFile(file) {
      var reader = new FileReader();
      reader.readAsDataURL( file );
      
      reader.onloadend = function() {
        showImage( reader.result );//base64
        fillImgFields( file, reader.result );
      }
      
    }
    
    function fillImgFields( file, base64 ) {
      $( '#foodshotFileName' ).val( file.name );
      $( '#foodshotFileBase64' ).val( base64 );
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));