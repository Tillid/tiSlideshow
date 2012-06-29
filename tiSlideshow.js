(function($) {
  /*
   * Prototypes for the tiSlideshow object
   */
  function tiSlideshow(container, options, id) {
    this.container = container;
    this.options = options;
    this.maskId = "";
    this.isOpen = false;
    this.imageList = [];
    this.currentImageIndex = 0;
    $.tiSlideshow.interfaces[id] = this;
    if (this.options.auto)
      this.open();
  };
  tiSlideshow.prototype.open = function() {
    /* To prevent multi open */
    if (this.isOpen)
      return ;
    this.isOpen = true;
    /* Fire the beforeOpen event */
    this.options.beforeOpen();
    /* Construct the exposeMask and the content */
    var maskId = "tiSlideshowExposeMask";
    while ($('#'+maskId).length) {
      maskId += "i";
    }
    this.maskId = maskId;
    var exposeMask = "<div id=\"" + this.maskId + "\" class=\"tiSlideshowExposeMask\" style=\"opacity: " + this.options.opacity + "; background-color: " + this.options.mask + "; \"></div>";
    var placeControl = '<div class="tiSlideshowPlaceControl"><a href="#" class="tiSlideshowPlaceControlClose"></a></div>';
    var place = '<div class="tiSlideshowPlace"><div class="tiSlideshowPlaceSlider"><div class="tiSlideshowPlaceSliderPicture"></div></div>'+placeControl+'</div>';
    $('body').append(exposeMask);
    $('body').append(place);
    if (navigator.appName == 'Microsoft Internet Explorer') {
      $('.tiSlideshowPlaceControl').css('border', '1px solid white');
    }
    var self = this;
    $('.tiSlideshowPlaceControlClose').click(function() {
      self.close();
      return false;
    });
    /* Initialize slider content */
    $(self.container).children('img').each(function() {
      self.imageList.push($(this).attr('src'));
    })
    /* If there is a picture for the given index, we show it */
    if (parseInt(self.currentImageIndex) < parseInt(self.imageList.length)) {
      $('.tiSlideshowPlaceSliderPicture').html('<img src="'+self.imageList[self.currentImageIndex]+'" alt="test" />');
      $('.tiSlideshowPlaceSliderPicture img').load(function() {
        $('.tiSlideshowPlaceSliderPicture img').data('originalHeight', $('.tiSlideshowPlaceSliderPicture img').height());
        $('.tiSlideshowPlaceSliderPicture img').data('originalWidth', $('.tiSlideshowPlaceSliderPicture img').width());
        $.tiSlideshow.adjustSize();
      });
    }
    /* Apply options */
    this.changeOptions();
    /* Flush the display */
    $('.tiSlideshowExposeMask').show();
    $('.tiSlideshowPlace').show();
    /* Fire the onOpen event */
    this.options.onOpen();
  };
  tiSlideshow.prototype.close = function() {
    /* To prevent multi close */
    if (!this.isOpen)
      return ;
    /* Fire the beforeClose event */
    this.options.beforeClose();
    /* Destruct the exposeMask and the content */
    $('.tiSlideshowExposeMask').remove();
    $('.tiSlideshowPlace').remove();
    this.isOpen = false;
    /* Fire the onClose event */
    this.options.onClose();
  };
  tiSlideshow.prototype.changeOptions = function(options) {
    this.options = $.extend({}, this.options, options);
    /* mask */
    $('#'+this.maskId).css('background-color', this.options.mask);
    /* opacity */
    $('#'+this.maskId).css('opacity', this.options.opacity);
    /* closeButton */
    if (!this.options.closeButton)
      $('.tiSlideshowPlaceControlClose').width('0');
    
    /* Render the elements */
    $.tiSlideshow.adjustSize();
  }

  /* 
   * Usefull functions for the jQuery launch, with default settings
   * and global parameters
   */
  $.tiSlideshow = {
    name : "tiSlideshow",
    author : "Emeric Kasbarian",
    version : "0.0.1",
    interfaces : [],
    options : {
      auto : false,
      mask : "#000",
      opacity : 0.9,
      closeButton : true,
      beforeOpen : function() {},
      onOpen : function() {},
      beforeClose : function() {},
      onClose : function() {}
    },
    tiSlideshow : function(options) {
      var extendedOptions = $.extend({}, $.tiSlideshow.options, options);
      var obj;
      return this.each(function() {
        if (typeof options == 'string') {
          if ($(this).data('tiSlideshow')) {
            obj = $.tiSlideshow.interfaces[$(this).data('id')];
            /* Manage the commands that can be passed as parameters */
            if (options == 'open')
              obj.open();
            if (options == 'close')
              obj.close();
            if (options == 'showCloseButton')
              obj.showCloseButton();
            if (options == 'hideCloseButton')
              obj.hideCloseButton();
          }
        } else {
          if ($(this).data('tiSlideshow')) {
            $.tiSlideshow.interfaces[$(this).data('id')].changeOptions(extendedOptions);
          } else {
            var id = $.tiSlideshow.interfaces.length;
            $(this).data('tiSlideshow', true);
            $(this).data('id', id);
            new tiSlideshow($(this), extendedOptions, id);
          }
        }
      });
    },
    adjustSize : function() {
      var window_height = $(window).height();
      /* Check if a tiSlideshow is open */
      if (!$('.tiSlideshowExposeMask').length)
        return ;
      /* Resize inside tiSlideshowPlace, choose size of the main top and bottom parts */
      $('.tiSlideshowPlaceSlider').height(window_height - 100);
      
      /* Resize inside tiSlideshowPlaceControl */
      
      
      /* Resize inside tiSlideshowPlaceSlider */
      var max_h = parseInt($('.tiSlideshowPlaceSlider').height());
      var max_w = parseInt($('.tiSlideshowPlaceSlider').width());
      if (!$('.tiSlideshowPlaceSliderPicture img').data('originalHeight') || !$('.tiSlideshowPlaceSliderPicture img').data('originalWidth')) {
        $('.tiSlideshowPlaceSliderPicture img').data('originalHeight', $('.tiSlideshowPlaceSliderPicture img').height());
        $('.tiSlideshowPlaceSliderPicture img').data('originalWidth', $('.tiSlideshowPlaceSliderPicture img').width());
        return ;
      }
      var h = parseInt($('.tiSlideshowPlaceSliderPicture img').data('originalHeight'));
      var w = parseInt($('.tiSlideshowPlaceSliderPicture img').data('originalWidth'));
      /* Check if you have to resize image */
      $('.tiSlideshowPlaceSliderPicture img').css('margin-top', '0px');
      if (h > max_h || w > max_w) {
        if (h > max_h) {
          w = w * max_h / h;
          h = max_h;
        }
        if (w > max_w) {
          h = h * max_w / w;
          w = max_w;
        }
      }
      $('.tiSlideshowPlaceSliderPicture img').height(h);
      $('.tiSlideshowPlaceSliderPicture img').width(w);
      var diff = (max_h - h) / 2;
      $('.tiSlideshowPlaceSliderPicture img').css('margin-top', diff+'px');
    }
  };

  /*
   * List of all accessible functions for plugin users
   */
  $.fn.tiSlideshow = $.tiSlideshow.tiSlideshow;
  $(window).resize($.tiSlideshow.adjustSize);
})(jQuery);