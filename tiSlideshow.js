(function($) {
  /*
   * Prototypes for the tiSlideshow object
   */
  function tiSlideshow(container, options, id) {
    this.container = container;
    this.options = options;
    this.maskId = "";
    this.isOpen = false;
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
    var self = this;
    $('.tiSlideshowPlaceControlClose').click(function() {
      self.close();
      return false;
    });
    /* Apply options */
    this.changeOptions();
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
    }
  };

  /*
   * List of all accessible functions for plugin users
   */
  $.fn.tiSlideshow = $.tiSlideshow.tiSlideshow;
  $(window).resize($.tiSlideshow.adjustSize);
})(jQuery);