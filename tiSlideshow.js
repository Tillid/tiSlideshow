(function($) {
  /*
   * Prototypes for the tiSlideshow object
   */
  function tiSlideshow(container, options) {
    this.container = container;
    this.options = options;
    if (this.options.auto)
      this.open();
  };
  tiSlideshow.prototype.open = function() {
    /* Fire the beforeOpen event */
    this.options.beforeOpen();
    /* Construct the exposeMask */
    var child = "<div id=\"tiSlideshowExposeMask\" style=\"position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; display: block; opacity: " + this.options.opacity + "; z-index: 9998; background-color: rgb(0, 0, 0); \"></div>";
    $('body').append(child);
    /* Fire the onOpen event */
    this.options.onOpen();
  };

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
      beforeOpen : function() {},
      onOpen : function() {},
      beforeClose : function() {},
      onClose : function() {}
    },
    tiSlideshow : function(options) {
      var extendedOptions = $.extend({}, $.tiSlideshow.options, options);
      var obj;
      return this.each(function() {
        var id = $.tiSlideshow.interfaces.length;
        $(this).data('tiSlideshow', true);
        $(this).data('id', id);
        obj = new tiSlideshow($(this), extendedOptions);
        $.tiSlideshow.interfaces[id] = obj;
      });
    },
    tiSlideshowOpen : function() {
    }
  };

  /*
   * List of all accessible functions for plugin users
   */
  $.fn.tiSlideshow = $.tiSlideshow.tiSlideshow;
})(jQuery);