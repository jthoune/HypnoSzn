// Scroll to top on page load
$(document).ready(function () {
    // Handler for .ready() called.
    $('html, body').animate({
        scrollTop: $('#landing').offset().top
    }, 'slow');
});


// Toggle fixed header when scrolling
$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 25) {
        $('.fixed-top').addClass('header-scrolled');
    } else {
        $('.fixed-top').removeClass('header-scrolled');
    }
});

// Mobile Nav
if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none',
    });
    $('#hamburger-menu').append($mobile_nav);
    $('#hamburger-menu').prepend('<button type="button" class="mobile-nav-toggle d-lg-none mt-5 me-2"><i class="fas fa-bars"></i></button>');
    $('#hamburger-menu').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
        e.preventDefault();
        $(this).next().slideToggle(0);
        $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
} else if ($('.mobile-nav, .mobile-nav-toggle').length) {
    $('.mobile-nav, .mobile-nav-toggle').hide();
}

// Smooth scroll for the nav links and .scrollTo classes
  var scrolltoOffset = $('#header').outerHeight() - 16;
  if (window.matchMedia("(max-width: 991px)").matches) {
    scrolltoOffset += 16;
  }
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutCirc');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

AOS.init();
