const accordianList = () => {
    var accordion = (function () {
        var $accordion = $(".js-accordion");
        var $accordion_header = $accordion.find(".js-accordion-header");
        var $accordion_item = $(".js-accordion-item");

        var settings = {
            speed: 400,
            oneOpen: false
        };

        return {
            init: function ($settings) {
                $accordion_header.on("click", function () {
                    accordion.toggle($(this));
                });
                $.extend(settings, $settings);
                if (settings.oneOpen && $(".js-accordion-item.active").length > 1) {
                    $(".js-accordion-item.active:not(:first)").removeClass("active");
                    $this.closest(".wrapper-container").toggleClass('active');
                }
                $(".js-accordion-item.active").find("> .js-accordion-body").show();
            },
            toggle: function ($this) {
                // if ($(window).width() >= 1025) {
                //     $this.closest(".wrapper-container").toggleClass('active');
                // }

                if (
                    settings.oneOpen && $this[0] != $this.closest(".js-accordion").find("> .js-accordion-item.active > .js-accordion-header")[0]) {
                    $this
                        .closest(".js-accordion")
                        .find("> .js-accordion-item")
                        .removeClass("active")
                        .find(".js-accordion-body")
                        .slideUp();
                    $this.parentsUntil(".wrapper-container")
                        .find(".js-accordion-item")
                        .removeClass("active")
                        .find(".js-accordion-body").slideUp();
                    // if ($(window).width() >= 1025) {
                    //     $this.closest(".wrapper-container").addClass('active');
                    // }
                }
                $this
                    .closest(".js-accordion-item")
                    .toggleClass("active");

                $this
                    .next()
                    .stop()
                    .slideToggle(settings.speed);
            }
        };
    })();
    $(document).ready(function () {
        accordion.init({ speed: 300, oneOpen: true });
    });
}

const owlCarousel = () => {
    $('.list-item').owlCarousel({
        loop: true,
        margin: 16,
        nav: true,
        responsive: {
            1000: {
                items: 5
            }
        }
    });
    $('.banner-block').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
    });
}
const handlerAction = () => {
    $("header").find(".btn-toggle").on("click", () => {
        $("header").find(".btn-toggle").toggleClass("active");
        $("header").find(".navbar-mobile").toggleClass('active');
        $('#overlay').toggleClass('active');
    });
    $('#overlay').on('click', () => {
        $('#overlay').removeClass("active");
        $("header").find(".navbar-mobile").removeClass('active');
        $("header").find('.btn-toggle').toggleClass('active');
    });
    if ($(window).width() < 769) {
        $('.home-5').appendTo('#home-mobile');
    }
    $('.ui-menu').appendTo('header .navbar .navbar-main .wrap-form');
    $('.popup-app').find('.close').on('click', () => {
        $('.popup-app').slideToggle();
    })
    const toggleDropDown = $('.wrap-header_dropdown > a');
    toggleDropDown.on('click', () => {
        toggleDropDown.toggleClass('active');
        toggleDropDown.next('.dropdown').slideToggle();
    });

    $('#uatModal').find('.btn-agree').on('click', () => {
        $("#uatModal").removeClass('active')
        $('#uatModal').fadeOut();
        $('body').find('#overlay-uat').removeClass('active');
        $('html').css('overflow-y', 'auto');
    });
    $('.character-popup').find('.close').on('click', () => {
        $('.character-popup').slideToggle();
    });
    let optionToggle = $('.option-change').find('.icon-option');
    let closeToggle = $('.option-change').find('.close');

    optionToggle.on('click', () => {
        $('#button-background').addClass('active');
        optionToggle.fadeOut();
    });
    closeToggle.on('click', () => {
        $('#button-background').removeClass('active');
        optionToggle.fadeIn();
    });
}
const swipeButton = () => {
    var initialMouse = 0;
    var slideMovementTotal = 0;
    var mouseIsDown = false;
    var slider = $('#slider');
    var loading = $("#loading-container");
    var url = $('#button-background .slide-text').attr('data-url');
    var swipeButton = $('#button-background');
    window.onload = function () {
        loading.removeClass('active');
    };

    if (swipeButton.length >= 1) {
        $('.slide-text').fadeIn();
        slider.on('mousedown touchstart', function (event) {
            mouseIsDown = true;
            slideMovementTotal = $('#button-background').width() - $(this).width() + 10;
            initialMouse = event.clientX || event.originalEvent.touches[0].pageX;
        });
        $(document.body, '#slider').on('mouseup touchend', function (event) {
            if (!mouseIsDown)
                return;
            mouseIsDown = false;
            var currentMouse = event.clientX || event.changedTouches[0].pageX;
            var relativeMouse = currentMouse - initialMouse;
            if (relativeMouse < slideMovementTotal) {
                $('.slide-text').fadeTo(300, 1);
                slider.animate({
                    left: "3px"
                }, 300);
                return;
            }
            slider.addClass('unlocked');
            $('#mesange').text('Đang chuyển môi trường thử nghiệm');
            $('#mesange').fadeIn();
            $('#locker').text('');
            setTimeout(function () {
                localStorage.removeItem("IsShowPopUp");
                slider.on('click tap', function (event) {
                    if (!slider.hasClass('unlocked'))
                        return;
                    slider.removeClass('unlocked');
                    $('#mesange').fadeOut();
                    $('#locker').text('arrow_forward');
                    slider.off('click tap');
                });
                $('#mesange').fadeOut();
                $('#locker').text('arrow_forward');
                slider.removeClass('unlocked');
                $('.slide-text').fadeTo(300, 1);
                slider.animate({
                    left: "3px"
                }, 300);
            }, 500);
            setTimeout(function () {
                loading.addClass('active');
            }, 500);
            setTimeout(function () {
                window.location.href = url;
            }, 800);
        });

        $(document.body).on('mousemove touchmove', function (event) {
            if (!mouseIsDown)
                return;

            var currentMouse = event.clientX || event.originalEvent.touches[0].pageX;
            var relativeMouse = currentMouse - initialMouse;
            var slidePercent = 1 - (relativeMouse / slideMovementTotal);

            $('.slide-text').fadeTo(0, slidePercent);

            if (relativeMouse <= 0) {
                slider.css({
                    'left': '3px'
                });
                return;
            }
            if (relativeMouse >= slideMovementTotal + 10) {
                slider.css({
                    'left': slideMovementTotal + 'px'
                });
                return;
            }
            slider.css({
                'left': relativeMouse - 10
            });
        });

    }
}

const loadingPage = () => {
    window.addEventListener('load', () => {
        var preload = document.querySelector('#loading-container');
        preload.classList.add('preload-finish');
    })
}

const keyUp = () => {
    $('#txtSearch').keyup(function (event) {
        $(this).closest('.form-group').find('.clearn').addClass('active');
    });
    $('.clearn').on('click', function () {
        $('#txtSearch').val('');
        $(this).removeClass('active');
    });
}
const popUPUat = () => {
    if ($("#uatModal").hasClass('active')) {
        $('body').find('#overlay-uat').addClass('active');
        $('html').css('overflow-y', 'hidden');
    }

}
$(document).ready(() => {
    // loadingPage();
    accordianList();
    owlCarousel();
    handlerAction();
    swipeButton();
    keyUp();
    popUPUat();
});