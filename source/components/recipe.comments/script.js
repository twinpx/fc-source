(function ($) {
  'use strict';

  $(function () {
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {
        init();
      });
    } else {*/
    var sendFlag = false;

    $(window).bind('scroll', function () {
      //load

      if ($('.b-recipe-comments').is(':empty')) {
        var top =
          $(document).scrollTop() + parseInt(window.screen.height) - 150;

        $('.b-recipe-comments').each(function () {
          var $recipeBlock = $(this);
          if ($recipeBlock.offset().top < top) {
            if (!sendFlag) {
              sendFlag = true;
              $.ajax({
                url: $recipeBlock.data('load-action'),
                type: $recipeBlock.data('load-method'), //GET
                dataType: 'html',
                success: function (html) {
                  $recipeBlock.html(html);
                  init();
                },
                error: function (a, b, c) {
                  sendFlag = false;
                  if (window.console) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                  }
                },
              });
            }
          }
        });
      }
    });

    $('#b-comment-form .b-textarea').resizeTextarea();

    //}

    function init() {
      $(function () {
        $('.b-recipe-comments').each(function () {
          new RecipeComments(this);
        });

        $('#b-comment-form').each(function () {
          new CommentForm(this);
        });

        autolike();
      });
    }

    //check like action

    function parseGetParams() {
      var $_GET = {};
      var __GET = window.location.search.substring(1).split('&');
      for (var i = 0; i < __GET.length; i++) {
        var getVar = __GET[i].split('=');
        $_GET[getVar[0]] = typeof getVar[1] == 'undefined' ? '' : getVar[1];
      }
      return $_GET;
    }

    function autolike() {
      var getParams = parseGetParams();
      if (getParams['commentid'] && getParams['commentid'].length) {
        $('#liketn_' + getParams['commentid'] + ':eq(0)').click();
        setTimeout(function () {
          $.scrollTo(
            $('[data-id=' + getParams['commentid'] + ']').offset().top - 100,
            500
          );
        }, 1000);
      }
    }

    function CommentForm(elem) {
      var self = this;

      init();

      function init() {
        initVarsAndElems();
        handleEvents();
      }

      function initVarsAndElems() {
        self.$elem = $(elem);
        self.$elem.data('CommentForm', self);
      }

      function handleEvents() {
        self.$elem
          .delegate('form', 'submit', submitForm)
          .delegate(
            '.b-admin-buttons .b-delete-icon',
            'click',
            $('.b-recipe-comments').data('RecipeComments').clickDelete
          );

        self.$elem.find('[type=submit]').click(clickSubmit);
      }

      function clickSubmit(e) {
        e.preventDefault();
        $(this).closest('form').submit();
      }

      function submitForm(e) {
        e.preventDefault();

        var $form = $(this);
        var $submit = $form.find('[type=submit]');

        if (!isValid($form) || $submit.hasClass('i-preloader')) {
          return;
        }

        $submit.addClass('i-preloader');
        $.ajax({
          url: $form.attr('action'),
          type: $form.attr('method'),
          dataType: 'json',
          data: $form.serialize(),
          async: false,
          success: successSubmit,
          error: ajaxError,
        });

        function successSubmit(data) {
          $submit.removeClass('i-preloader');
          if (data && data.error) {
            $form.find('.error_message').text(data.error);
          } else {
            reset($form);
            addComment(data);
          }
        }

        function addComment(data) {
          setTimeout(function () {
            $form.find('[type=submit]').removeClass('i-preload');
            var $div = $('<div style="display:none;"></div>');

            $div.html(compileComment(data));
            $('.b-recipe-comments').prepend($div);
            //alignImg($div);
            $div.find('.input_file').each(function () {
              new InputFile($(this));
            });
            initFileUpload($div);
            $.scrollTo($('#b-comments').offset().top - 100, 500, function () {
              $div.css({ opacity: 0 }).show().animate({ opacity: 1 }, 500);
            });

            window.upButton.styleElements();
          }, 500);
        }
      }

      function reset($form) {
        $form.find('textarea').val('').end().find('.error_message').text('');

        if ($form.find('.b-comment-form__photo__url').val() == '') return;

        var $field = $form.find(':file').closest('.b-form-field');
        resetInputFile($field, 'comment');
      }
    }

    function RecipeComments(elem) {
      var self = this;

      init();

      function init() {
        initElements();
        handleEvents();
        initFileUpload();
      }

      function initElements() {
        self.$elem = $(elem);
        self.$elem.data('RecipeComments', self);
        self.$replyForm = self.$elem.find('#b-rc__reply-form');
        self.$editForm = self.$elem.find('#b-rc__edit-form');
        self.$getMoreButton = self.$elem.find('.b-more-button a');
        self.commentsPerPage = 5;
        self.page = 1;
      }

      function handleEvents() {
        self.$getMoreButton.click(clickMoreRecipes);

        self.$elem
          //actions
          .delegate('.b-rc__props__reply a', 'click', clickReply)
          .delegate('.b-rc__admin-buttons .b-edit-icon', 'click', clickEdit)
          .delegate('.b-close-icon', 'click', clickClose)
          .delegate('button[type=submit]', 'click', clickSubmitButton)
          .delegate('.b-textarea', 'keyup', keyupReplyFormSubmit)
          //requests
          .delegate('.b-like-icon__type-button', 'click', clickLike)
          .delegate('.b-admin-buttons .b-delete-icon', 'click', clickDelete)
          .delegate('form', 'submit', submitForm)
          //effects
          .delegate('.b-rc__item__content__text__img', 'click', clickCommentImg)
          .find('.b-textarea')
          .resizeTextarea();
      }

      //actions
      function clickReply(e) {
        e.preventDefault();
        var $replyButton = $(this);
        var $item = $replyButton.closest('.b-rc__item');

        if ($item.hasClass('i-reply')) {
          self.$replyForm.find('.b-close-icon').click();
          return;
        }

        hideEdit();
        hideReply();

        function hideEdit() {
          self.$elem.find('.i-edit').removeClass('i-edit');
        }

        function hideReply() {
          if (self.$replyForm.is(':visible')) {
            self.$replyForm.slideUp(300, onHide);
          } else {
            onHide();
          }

          function onHide() {
            self.$elem.find('.i-reply').each(function () {
              $(this)
                .removeClass('i-reply')
                .find('.b-rc__props__reply a')
                .text('Ответить');
            });
            showReplyForm();
          }
        }

        function showReplyForm() {
          self.$replyForm
            .hide()
            .insertAfter($replyButton.closest('.b-rc__item__content'))
            .slideDown('middle')
            .find('.b-textarea')
            .val('')
            .resizeTextarea();

          setTimeout(function () {
            self.$replyForm.find('.b-textarea').focus();
          }, 100);

          var rId = $item.attr('data-id');
          self.$replyForm.find("input[name='rId']").val(rId);

          modifyItem();
        }

        function modifyItem() {
          $replyButton.text('Скрыть');
          $item.addClass('i-reply');
        }
      }

      function clickEdit(e) {
        e.preventDefault();
        var $item = $(this).closest('.b-rc__item');
        $item.addClass('i-edit');
      }

      function clickClose(e) {
        var $closeIcon = $(this);
        if ($closeIcon.closest('#b-rc__reply-form').length !== 0) {
          clickReplyFormClose(e);
        } else if ($closeIcon.hasClass('b-rc__item__close')) {
          closeEditForm(e);
        }

        function clickReplyFormClose(e) {
          self.$replyForm
            .closest('.b-rc__item')
            .removeClass('i-reply')
            .find('.b-rc__props__reply a')
            .text('Ответить');
          self.$replyForm.slideUp('middle', function () {
            self.$replyForm.find('.b-form-field').removeClass('i-attention');
          });
          e.preventDefault();
        }

        function closeEditForm(e) {
          e.preventDefault();
          var $item = $closeIcon.closest('.b-rc__item');
          $item
            .removeClass('i-edit')
            .find('.b-form-field')
            .removeClass('i-attention');
        }
      }

      function clickSubmitButton(e) {
        e.preventDefault();
        $(this).closest('form').submit();
      }

      function keyupReplyFormSubmit(e) {
        if (e.ctrlKey && e.keyCode == 13) {
          if ($(this).val() == '') return false;
          self.$replyForm.find('form').submit();
        }
      }
      //__actions

      function isAuthorized() {
        if ($('#b-comment-form .b-rc__item.i-foodclub').length === 1)
          return false;
        return true;
      }

      //requests
      function clickLike(e) {
        if (!isAuthorized()) {
          //window.location.href = $( this ).attr( 'href' );
          if (document.getElementById('authModal')) {
            $('#authModal form').each(function () {
              $(this)
                .find('div:first')
                .append(
                  '<input type="hidden" name="commentLikeFlag" value="Y">'
                );
              Cookies.set(
                'likeComment',
                $(this).closest('.b-rc__item').data('id')
              );
            });

            $('.b-header__auth-button').click();
            //$('#authModal').modal( 'show' );
          }
          return false;
        }

        e.preventDefault();
        var $button = $(this);
        var url = $button.attr('data-ajax-url');

        var action = 'like';
        if ($button.hasClass('b-like-icon__type-active')) action = 'dislike';

        var likeNum = sendLike(action);
        markLike($button, likeNum);

        function sendLike(action) {
          var result;

          $.ajax({
            type: 'GET',
            dataType: 'text',
            url: url,
            async: false,
            data:
              'id=' +
              $button.closest('.b-rc__item').attr('data-id') +
              '&action=' +
              action,
            success: function (data) {
              result = data;
            },
          });

          return result;
        }

        function markLike($button, likeNum) {
          if (!likeNum || likeNum == '0') likeNum = '';
          $button.siblings('.b-like-num').text(likeNum);
          $button.toggleClass('b-like-icon__type-active');
        }
      }

      function clickDelete(e, elem) {
        elem = elem || this;
        e.preventDefault();
        if (confirm($(elem).attr('title') + '?')) {
          if (
            $(elem).closest('.b-admin-buttons').hasClass('b-rc__admin-buttons')
          ) {
            //wish to delete comment or its reply
            deleteComment($(elem));
          } else {
            var $formField = $(elem).closest('.b-form-field');
            if ($formField.closest('.b-rc-edit-form').length !== 0) {
              //wish to delete a pic of a comment or its reply
              deleteCommentPhoto($(elem));
            } else if ($formField.closest('#b-rc__reply-form').length !== 0) {
              //wish to delete a pic in the reply
              deleteTempPhoto($(elem), 'reply');
            } else if ($formField.closest('#b-comment-form').length !== 0) {
              //wish to delete a pic in the comment form
              deleteTempPhoto($(elem), 'comment');
            }
          }
        }
        return false;

        function deleteComment($icon) {
          var $item = $icon.closest('.b-rc__item');
          var data = getData();
          $.ajax({
            url: self.$elem.attr('data-delete-action'),
            type: self.$elem.attr('data-delete-method'),
            data: data,
            success: function (data) {
              if ($item.parent().is('.b-rc__block')) {
                $icon.closest('.b-rc__block').remove();
              } else {
                $item.remove();
              }
            },
            error: ajaxError,
          });

          function getData() {
            var imgId = $item
              .find('.b-form__photo-block__img img')
              .attr('data-id');
            var data = {
              id: $item.attr('data-id'),
              sessid: $item.closest('.b-recipe-comments').attr('data-sessId'),
            };
            if (imgId) data.imgId = imgId;
            return data;
          }
        }

        function deleteCommentPhoto($icon) {
          var $item = $icon.closest('.b-rc__item');
          $.ajax({
            url: self.$elem.attr('data-delete-photo-action'),
            type: self.$elem.attr('data-delete-photo-method'),
            data:
              'id=' +
              $item.attr('data-id') +
              '&imgId=' +
              $item.find('.b-form__photo-block__img img').attr('data-id'),
            success: function (data) {
              var id = $item.attr('data-id');
              //add html to the form
              var $formField = $icon.closest('.b-form__photo-block').empty();
              var html = compilePhoto(
                { id: id, type: 'edit' },
                'file-input-template'
              );
              $formField.html(html);
              $formField.find('.input_file').each(function () {
                new InputFile($(this));
              });
              initFileUpload($formField);
              //remove comment photo
              if (
                $item.find('.b-rc__item__content__text__content').length !== 0
              ) {
                var content = $item
                  .find('.b-rc__item__content__text__content')
                  .html();
                $item.find('.b-rc__item__content__text').html(content);
              }
            },
            error: ajaxError,
          });
        }

        function deleteTempPhoto($icon, type) {
          var $field = $icon.closest('.b-form-field');
          $.ajax({
            url: self.$elem.attr('data-delete-photo-action'),
            type: self.$elem.attr('data-delete-photo-method'),
            data:
              'src=' + $field.find('.b-form__photo-block__img img').attr('src'),
            success: function (data) {
              //add html to the form
              resetInputFile($field, type);
            },
            error: ajaxError,
          });
        }
      }

      function submitForm(e) {
        e.preventDefault();

        var $form = $(this);
        var $submit = $form.find('[type=submit]');

        if (!isValid($form) || $submit.hasClass('i-preloader')) return;

        $submit.addClass('i-preloader');

        var url = $form.attr('action');
        var type = $form.attr('method');

        if (!url || url == '') url = self.$elem.attr('data-edit-form-action');
        if (!type || type == '')
          type = self.$elem.attr('data-edit-form-method');

        $.ajax({
          url: url,
          type: type,
          dataType: 'json',
          data: $form.serialize(),
          async: false,
          beforeSend: beforeSend,
          success: successSubmit,
          error: ajaxError,
        });

        function beforeSend() {
          var $item = $form.closest('.b-rc__item');
          $item.addClass('i-preload');
        }

        function successSubmit(data) {
          $submit.removeClass('i-preloader');
          var $item = $form.closest('.b-rc__item');
          $item.removeClass('i-preload');
          if ($item.hasClass('i-edit')) {
            edit(data, $item);
          } else if ($item.hasClass('i-reply')) {
            reply(data, $item);
          }
        }

        function edit(data, $item) {
          $item.removeClass('i-edit');
          if (data && data.image && data.image.src && data.image.src != '') {
            var html =
              '<div style="background-image: url(\'' +
              data.image.src +
              '\');" data-id="' +
              data.image.id +
              '" class="b-rc__item__content__text__img"></div><div class="b-rc__item__content__text__content">' +
              data.text.html +
              '</div><div class="i-clearfix"></div>';
          } else {
            html = data.text.html;
          }
          $item
            .children('.b-rc__item__content')
            .find('.b-rc__item__content__text')
            .empty()
            .html(html)
            .end()
            .find('.b-form__text-block textarea')
            .val(data.text.text);

          if (data.image && data.image.src) {
            $item
              .find('.b-rc-edit-form .b-image-icon__photo-url')
              .val(data.image.src);
            var $imgBlock = $item.find(
              '.b-rc-edit-form .b-form__photo-block__img'
            );
            if ($imgBlock.text() != '') {
              $item
                .find('.b-rc-edit-form .b-form__photo-block__img')
                .data({ id: data.image.id })
                .css({ backgroundImage: "url('" + data.image.src + "')" });
            } else {
              showEditFormImage(
                { result: { files: [{ url: data.image.src }] } },
                $item.find('.b-rc-edit-form input[id*=fileupload]'),
                'edit'
              );
            }
          }

          if (data && data.date) {
            $item.find('.b-rc__props__date').text(data.date);
          }

          //alignImg( $item );
        }

        function reply(data, $item) {
          data.root = $item.attr('data-id');
          var $html = $(compileReply(data));
          if ($item.parent().find('.b-rc__reply-block').length === 0) {
            $item.after('<div class="b-rc__reply-block"></div>');
          }
          $item.parent().find('.b-rc__reply-block').prepend($html);
          //alignImg($html);
          $item.find('.b-rc__reply-form__close').click();
          $html.find('.input_file').each(function () {
            new InputFile($(this));
          });
          initFileUpload($html);

          //reset photo
          var $field = self.$replyForm.find('.b-form__photo-block');
          resetInputFile($field, 'reply');
        }
      }
      //__requests

      //effects
      function clickCommentImg() {
        var $img = $(this);
        var $item = $img.closest('.b-rc__item');
        var img = new Image();
        img.src = $img
          .css('backgroundImage')
          .substring(5, $img.css('backgroundImage').length - 2);

        if (!$img.hasClass('b-rc__item__content__text__img__type_block')) {
          //expand photo
          $img.addClass('b-rc__item__content__text__img__type_block');

          var width = img.width;
          var height = img.height;

          if (img.width > $img.closest('.b-rc__item__content__text').width()) {
            width = $img.closest('.b-rc__item__content__text').width();
            height = Math.floor((img.height * width) / img.width);
          }

          $img.css({
            width: width,
            height: height,
            margin: '0 0 15px',
          });
          $.scrollTo();
          $item.data({ scroll: getScrolled() });
          $.scrollTo(
            parseInt($img.closest('.b-rc__item').offset().top, 10) -
              parseInt($('#top_panel').height(), 10),
            500
          );
        } else {
          //resize photo back
          $img
            .css({
              width: '65px',
              height: '65px',
              margin: '0 12px 0 0',
            })
            .removeClass('b-rc__item__content__text__img__type_block');

          if ($item.data('scroll') && $item.data('scroll') != '') {
            var scroll = $item.data('scroll');
          } else {
            scroll =
              parseInt($img.closest('.b-rc__item').offset().top, 10) -
              parseInt($('#top_panel').height(), 10);
          }
          $.scrollTo(scroll, 500);
        }
      }

      function enterPhoto(e, elem) {
        elem = elem || this;
        $(elem).addClass('i-hover');
        $(elem)
          .find('.b-form__photo-block__img img')
          .stop()
          .animate({ opacity: 0.35 }, 200);
      }

      function leavePhoto(e, elem) {
        elem = elem || this;
        $(elem).removeClass('i-hover');
        $(elem)
          .find('.b-form__photo-block__img img')
          .stop()
          .animate({ opacity: 1 }, 200);
      }
      //__effects

      //secondary
      function getScrolled() {
        return window.pageYOffset || document.documentElement.scrollTop;
      }

      function clickMoreRecipes() {
        $.ajax({
          url: '/php/get_more_comments.php',
          dataType: 'json',
          data: {
            page: ++self.page,
          },
          beforeSend: function () {
            self.$getMoreButton.parent().addClass('i-preload');
          },
          success: function (data) {
            setTimeout(function () {
              self.$getMoreButton.parent().removeClass('i-preload');
              var $div = $('<div style="display:none;"></div>');

              for (var i = 0; i < data.comments.length; i++) {
                $div.append(compileComment(data.comments[i]));
              }
              self.$getMoreButton.parent().before($div);
              $div.css({ opacity: 0 }).show().animate({ opacity: 1 }, 500);

              $.scrollTo($div, 1000);

              showHideGetMoreButton();
              window.upButton.styleElements();
            }, 500);
          },
          error: ajaxError,
        });

        return false;
      }

      function showHideGetMoreButton() {
        var pages = parseInt(self.$getMoreButton.attr('data-pages'), 10);
        pages--;

        self.$getMoreButton.attr({ 'data-pages': pages });

        if (pages == 1) {
          self.$getMoreButton.hide();
        }
      }
      //__secondary

      /*--- public methods ---*/

      this.clickDelete = function (e) {
        clickDelete(e, this);
        e.preventDefault();
        e.stopPropagation();
      };
    }

    function resetInputFile($field, type) {
      $field.empty();
      var html = compilePhoto({ id: '', type: type }, 'file-input-template');
      $field.html(html);
      $field.find('.input_file').each(function () {
        new InputFile($(this));
      });
      initFileUpload($field);
    }

    function compileComment(commentObj) {
      var comment = {
        id: '',
        rId: '',
        sessid: $('.b-recipe-comments').attr('data-sessId'),
        author: {
          href: '',
          src: '',
          name: '',
        },
        text: {
          html: '',
          text: '',
        },
        image: {},
        likeNum: 0,
        mine: false,
        date: '',
        reply: [],
      };
      commentObj = $.extend(comment, commentObj);

      var template = document.getElementById('comment-template').innerHTML;
      var compiled = tmpl(template);
      var $comment = $(compiled(commentObj));

      for (var i = 0; i < commentObj.reply.length; i++) {
        commentObj.reply[i].root = commentObj.id;
        $comment.append(compileReply(commentObj.reply[i]));
      }

      return $comment;
    }

    function compileReply(replyObj) {
      replyObj.cId = replyObj.id;
      var reply = {
        id: '',
        cId: '',
        rId: '',
        sessid: $('.b-recipe-comments').attr('data-sessId'),
        root: '',
        image: {},
        text: {
          html: '',
          text: '',
        },
        author: {
          href: '',
          src: '',
          name: '',
        },
        mine: false,
        date: '',
        likeNum: 0,
      };
      replyObj = $.extend(reply, replyObj);

      var template = document.getElementById('reply-template').innerHTML;
      var compiled = tmpl(template);

      return compiled(replyObj);
    }

    function compilePhoto(photoObj, tmplId) {
      if (!photoObj.id) photoObj.id = '';
      var template = document.getElementById(tmplId).innerHTML;
      var compiled = tmpl(template);

      return compiled(photoObj);
    }

    function initFileUpload($context) {
      $context = $context || $('#b-comments');

      $context.find('input[id*=fileupload]').each(function () {
        var $fileupload = $(this);
        var id = $fileupload.attr('id');
        var url = $fileupload.attr('data-ajax-url');

        $fileupload.fileupload({
          url: url,
          dataType: 'json',
          add: function (e, data) {
            if (data.files.length > 1) {
              showError('maxNumberOfFiles', $fileupload);
            } else if (!/(\.|\/)(gif|jpe?g|png)$/i.test(data.files[0].type)) {
              showError('acceptFileTypes', $fileupload);
            } else if (data.files[0].size > 2e6) {
              showError('maxFileSize', $fileupload);
            } else {
              data.submit();
            }
          },
          progress: function (e, data) {
            $('#' + id)
              .closest('.b-form-field')
              .addClass('i-progress');
          },
          done: function (e, data) {
            var $fileupload = $('#' + id);
            $fileupload
              .closest('.b-form-field')
              .removeClass('i-progress')
              .removeClass('i-hover');

            if ($fileupload.closest('#b-comment-form').length !== 0) {
              //comment form in the bottom
              showCommentFormImage(e, data, $fileupload);
            } else {
              //if we reply or edit a comment
              if ($fileupload.closest('.b-rc-edit-form').length !== 0)
                var type = 'edit'; //edit form
              if ($fileupload.closest('#b-rc__reply-form').length !== 0)
                type = 'reply'; //reply form
              showEditFormImage(data, $fileupload, type);
            }
          },
        });
      });

      function showError(errorName, $fileupload) {
        var messages = {
          maxNumberOfFiles: 'Загружайте только одну фотографию',
          acceptFileTypes: 'Загружайте фотографии формата jpg, jpeg, gif, png',
          maxFileSize: 'Размер файла превышает 2 Мб',
        };
        var text = messages[errorName];
        alert(text);
        $fileupload
          .closest('.b-form-field')
          .removeClass('i-progress')
          .removeClass('i-hover');
      }

      function showCommentFormImage(e, data, $fileupload) {
        $.each(data.result.files, function (index, file) {
          var html = compilePhoto(
            { id: '', url: file.url, type: 'comment' },
            'photo-template'
          );
          var $photoBlock = $fileupload.closest('.b-form-field');
          $photoBlock.html(html);
          $photoBlock.find('.input_file').each(function () {
            new InputFile($(this));
          });
          initFileUpload($photoBlock);
          //alignImg($photoBlock);
        });
      }
    }

    function showEditFormImage(data, $fileupload, type) {
      $.each(data.result.files, function (index, file) {
        var html = compilePhoto(
          {
            id: $fileupload.closest('.b-rc__item').attr('data-id'),
            url: file.url,
            type: type,
          },
          'photo-template'
        );
        var $photoBlock = $fileupload.closest('.b-form-field');
        $photoBlock.html(html);
        $photoBlock.find('.input_file').each(function () {
          new InputFile($(this));
        });
        initFileUpload($photoBlock);
        //alignImg($photoBlock);
      });
    }

    function isValid($form) {
      //used only in recipe comments
      var result = true;
      var firstElem;
      $form.find('[required]').each(function () {
        var $elem = $(this);
        if ($.trim($elem.val()) == '') {
          result = false;
          $elem.closest('.b-form-field').addClass('i-attention');
          if (!firstElem) {
            $elem.focus();
            firstElem = $elem;
          }
        } else {
          $elem.closest('.b-form-field').removeClass('i-attention');
        }
      });
      $form.find(':file').each(function () {
        if ($(this).closest('.b-form-field').hasClass('i-progress')) {
          result = false;
        }
      });

      return result;
    }
  });

  function InputFile($elem, params) {
    var self = this;
    self.$elem = $elem;
    self.$input = self.$elem.find(':file');
    var options = {},
      params = params || {};
    options.extentions = params.extentions || ['jpg', 'jpeg'];
    options.messages = params.maessages || {
      wrongExtention: 'Загружайте изображения в jpeg формате',
    };
    init();
    function init() {
      createHTML();
      self.$name = self.$elem.find('div.new_file_name');
      self.$input.change(function () {
        handleChanges();
      });
    }
    function clearValue() {
      self.$elem.find(':file').remove();
      self.$elem.find('.browse_button').after(self.$input);
    }
    function createHTML() {
      self.$elem.html(
        '<div class="browse_button" title="Выбрать файл"></div><div class="blocker"></div><div class="new_file_name"></div>'
      );
      self.$elem.find('.browse_button').after(self.$input);
    }
    function handleChanges() {
      var fileTitle = getFileTitle();
      var fileExt = getFileExt(fileTitle);
      if (isValidFileExt(fileExt)) {
        self.$name.text(fileTitle);
        self.$name.removeClass('i-attention');
      } else {
        self.$name.text(options.messages.wrongExtention);
        self.$name.addClass('i-attention');
      }
      self.$name.css({
        display: 'block',
      });
    }
    function filesize(url) {
      var req = this.window.ActiveXObject
        ? new ActiveXObject('Microsoft.XMLHTTP')
        : new XMLHttpRequest();
      if (!req) {
        throw new Error('XMLHttpRequest not supported');
      }
      req.open('HEAD', url, false);
      req.send(null);
      if (!req.getResponseHeader) {
        try {
          throw new Error('No getResponseHeader!');
        } catch (e) {
          return false;
        }
      } else if (!req.getResponseHeader('Content-Length')) {
        try {
          throw new Error('No Content-Length!');
        } catch (e2) {
          return false;
        }
      } else {
        return req.getResponseHeader('Content-Length');
      }
    }
    function isValidFileExt(fileExt) {
      var flag = false;
      for (var i = 0; i < options.extentions.length; i++) {
        if (fileExt.toLowerCase() == options.extentions[i]) flag = true;
      }
      return flag;
    }
    function getFileExt(fileTitle) {
      var RegExExt = /.*\.(.*)/;
      var fileExt = fileTitle.replace(RegExExt, '$1');
      return fileExt;
    }
    function getFileTitle() {
      var value = self.$input.val();
      var reWin = /.*\\(.*)/;
      var fileTitle = value.replace(reWin, '$1');
      var reUnix = /.*\/(.*)/;
      fileTitle = fileTitle.replace(reUnix, '$1');
      if (fileTitle.length > 18) {
        fileTitle = '...' + fileTitle.substr(fileTitle.length - 16, 16);
      }
      return fileTitle;
    }
  }
})(jQuery);
