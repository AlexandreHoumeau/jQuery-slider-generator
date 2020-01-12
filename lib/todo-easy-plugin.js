'use strict';

(function ($) {
  $.fn.MySlider = function (options) {
    this.settings = $.extend({
      'width': 908,
      'height': 340,
      'position': 'bottom', 
      'bullets': false, 
      'thumbs':  true, 
      'row': 10,
      'auto': true,
      'autoSpeed': 5000,
      'fadeSpeed': 1000,
      'autoPlay': false,
      'el': $(this) || []
    }, options);

    var el = this.settings.el;
    var priv = {};
    var i = 0;
    var currentSlideIndex = 1;
    var currentSlide;
    var slides;
    var delay = this.settings.delay;
    var speedEffect = this.settings.speedEffect;
    var autoSpeed = this.settings.autoSpeed;
    var autoPlay = this.settings.autoPlay;

    var autoPlay = null;

    // Public Methods - External methods
    Object.assign(this, {

       /**
       * get photos
       */
       'getPhotos': function() {
         var slider = jQuery('<div id="slider"></div>');
         var slideContainer = jQuery('<div class=slides-container></div>');
         var arrows = jQuery('<div class="arrows"></div>')
         var prev = jQuery('<a class="prev" href=""><</a>');
         var next = jQuery('<a class="next" href="">></a>');

         $(el).append(slider);
         $(slider).append(slideContainer);
         $(slider).append(arrows);
         $(arrows).append(prev);
         $(arrows).append(next);

         $.each(this.settings.photos, function(index, value) {
           var divSlide = jQuery('<div class="slide"></div>')
           var img = jQuery('<img src='+value+'>');

           $(divSlide).append(img);
           $(slideContainer).append(divSlide);
         }.bind(this))
        $('.slide').slice(1).css('display', 'none');
        $('.slide').first().addClass('active');
        currentSlide = $('.slide').first();
        slides = $('.slide');
        this.arrowsAction();
       },

       'animateOut' : function(element) {
        if(this.settings.effects === 'fade') {
          element.fadeOut(speedEffect);
        }
        if(this.settings.effects === 'slide') {
          element.slideUp(speedEffect);
        }
       },
       'animateIn' : function(element) {
        if(this.settings.effects === 'fade') {
          element.fadeIn(speedEffect);
        }
        if(this.settings.effects === 'slide') {
          element.slideDown(speedEffect);
        }
       },

       'fadeNext': function() {
        
        this.animateOut(currentSlide.removeClass('active'));

         if(currentSlideIndex === $('.slide').length) {
            currentSlide = slides.first();
            this.animateIn(currentSlide.delay(delay).addClass('active'));
            currentSlideIndex = 1;
          } else {
            currentSlideIndex++;
            currentSlide = currentSlide.next();
            this.animateIn(currentSlide.delay(delay).addClass('active'));
            console.log($('.slide').length, currentSlideIndex)
          }
       },

       'fadePrev': function() {

        this.animateOut(currentSlide.removeClass('active'));

         if(currentSlideIndex === 1) {
            currentSlide = slides.last();
            this.animateIn(currentSlide.delay(delay).addClass('active'));
            currentSlideIndex = $('.slide').length;
          } else {
            currentSlideIndex--;
            currentSlide = currentSlide.prev();
            this.animateIn(currentSlide.delay(delay).addClass('active'));
          }
       },

       'autoPlay': function() {
         clearInterval(autoPlay);
         if(this.settings.autoPlay === true) {
           this.settings.autoPlay = setInterval(function() {this.fadeNext()}.bind(this),autoSpeed);
         }
       },

       'arrowsAction': function() {
        
         $('.next').click(function(e) {

            e.preventDefault();
            this.fadeNext();
            this.autoPlay();
        }.bind(this));
         $('.prev').click(function(e) {
            e.preventDefault();
            this.fadePrev();
            this.autoPlay();
        }.bind(this));
       },
    });

    // Private Methods - Internal methods
    Object.assign(priv, {
      'style': function () {
        $('#slider').css({
          'width': '70%',
          'margin': 'auto',
          'position': 'relative',
        })
        $('.slides-container').css({
          'position': 'relative',
          'width': '100%',
          'height': '100%',
        })
        $('.slide').css({
          'width': '100%',
          'height': '100%',
          // 'position': 'absolute',
          'left': '0',
          'top': '0',
          // 'display': 'none',
        })
        $('.slide:first-child').css({
          'display': 'block',
        })
        $('img').css({
          'width': '100%',
          'height': '100%',
          'object-fit': 'cover',
        })
        $('a').css({
          'position': 'absolute',
          'text-decoration': 'none',
          'color': 'rgba(255, 255, 255, 0.65)',
          'color': 'rgba(255, 255, 255, 0.65)',
          'top': '43%',
          'left': '15px',
          'font-weight': '400',
          'line-height': '1',
          'font-size': '42px',
        })
        $('.next').css({
          'left': 'initial',
          'right': '15px',
        })

        return this;
      },
      /**
       * Initialize the plugin
       */
      'init': function () {
        this.getPhotos();
        priv.style();
        
        
        this.autoPlay();
        return this;
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();

    return this;
  };
}(jQuery));