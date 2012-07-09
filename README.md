tiSlideshow
===========

**WARNING :** this plugin is under hard development. Maybe one day it will work, but not now, sorry =)

_Right now, the plugin is able to be launched via the control parameter or automatically, and draw the expose mask.
It can be closed both by the cross in the bottom right of the screen and the control parameter.
It displays the first picture of all the img element placed inside the tiSlideshow root element.
You can slide pictures by using the previous and next button located on each side of the screen !
There is a list of thumbnails displayed in the bottom of the screen, and you can switch between picture with this tool !
And that's all ! Hmm, i'm not sure i can say that anymore, cause it starts getting pretty ! o/_


### DESCRIPTION ###
A fully configurable jQuery plugin to use beautiful and fullscreen slideshow in your webpage. Compatible with tactile devices !

### REQUIREMENTS ###
* jQuery, in its last version (tested with 1.7.2)

### FEATURES ###
* _Get the full control_ :
  - launchable by a call to jQuery function with a control parameter or automatically with the auto option
  - closable by a call to jQuery function with a control parameter or with the cross inside the tiSlideshow panel
  - pictures slidable by a call to jQuery function with a control parameter or by using existing previous and next buttons
  - realtime options modification : when you modify an option, by passing a new options array to an existing tiSlideshow, the display is modified instantly
* _Configure many options_ :
  - the auto-launch of the slideshow
  - the mask color and opacity
  - the presence of the cross in the bottom right of the panel to close it
  - the presence of the previous and next buttons
  - the ability to have an infinite slide (by clicking the next buttons on the last picture, the first picture will be showed)
  - the presence of the thumbnails list
  - tactile enhancement : the experience on a tactile device is really different, so if you activate this option, it should be better (to zoom for example)
  - to let you have an optimized website, you can provide tiSlideshow a model name for thumbnails, like _%PATH%%NAME%_thumbnail%EXT%_ or _%PATH%thumbnails/%FULL_NAME%_
  - the begin picture index
* _Listen to events_ :
  - each callback has the jQuery context set properly : you can retrieve the root element by using $(this)
  - if you return false on any before callback event, it will prevent from doing anything else, so cool !
  - beforeOpen
  - onOpen
  - beforeClose
  - onClose
  - beforeSlide, take two parameters : current picture index and future picture index
  - onSlide, take two parameters : last picture index and current picture index
* _Appreciate all the bonuses_ :
  - the display changes each time the window size changes
  - the picture is scaled depending on the size of the page
  - user can use the thumbnails list to find picture faster
  - if jScrollPane is included in your page, it will automatically use the jScrollPane plugin for the thumbnails list
  - if you activate tactile option, it will prevent the user from scrolling without closing the tiSlideshow,
    and provide the user a way to scroll only the thumbnails list
* **And many many more is coming !**

### EXAMPLE ###
Here is an example to show you how to use this plugin. All the options are at their default values.

    <script type="text/javascript">
      $(document).ready(function() {
        $('#slideshow').tiSlideshow({
          auto : false,
          mask : "#000",
          opacity : 0.9,
          closeButton : true,
          slideButtons : true,
          infiniteSlide : false,
          thumbnails : true,
          tactile : false,
          beginIndex : 0,
          thumbnailName : "%PATH%%FULL_NAME%",
          beforeOpen : function() {},
          onOpen : function() {},
          beforeClose : function() {},
          onClose : function() {},
          beforeSlide : function() {},
          onSlide : function() {}
        });
        /* this is what I call a command parameter */
        $('#slideshow').tiSlideshow('open');
        $('#slideshow').tiSlideshow('next');
        $('#slideshow').tiSlideshow('previous');
        /* the realtime option change */
        $('#slideshow').tiSlideshow({
          mask : "#579"
        });
        /* Of course if we close tiSlideshow now, we will see nothing */
        $('#slideshow').tiSlideshow('close');
      });
    </script>
    <div id="slideshow">
      <img src="/pictures/my_picture1.png" alt="picture1" />
      <img src="/pictures/my_picture2.png" alt="picture2" />
      <img src="/pictures/my_picture3.png" alt="picture3" />
      <img src="/pictures/my_picture4.png" alt="picture4" />
    </div>