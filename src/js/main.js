const accordianList = () => {
    $("#accordian .wrap-title").click(function () {
        var link = $(this);
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active")
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;

        closest_ul.find("ul").slideUp(function () {
            if (++count == closest_ul.find("ul").length)
                parallel_active_links.removeClass("active");
        });

        if (!link_status) {
            closest_li.children("ul").slideDown();
            closest_li.addClass("active");
        }
    })
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
    var openCharacter = $('.open-character');
    openCharacter.on('click', () => {
        openCharacter.next('.btn__swipe').fadeToggle();
        openCharacter.fadeToggle();
    });
    $('#character').find('.cloes').on('click', () => {
        $('#character').find('.btn__swipe').fadeOut();
        openCharacter.fadeIn();
    });
    $('#uatModal').find('.btn-agree').on('click', () => {
        $('#uatModal').fadeOut();
    });
    $('.character-popup').find('.close').on('click', () => {
        $('.character-popup').slideToggle();
    });
}
const swipeButton = () => {
    var inputRange = document.getElementsByClassName('btn__swipe__pullee')[0],
        maxValue = 100,
        speed = 12,
        currValue, rafID;
    var fake = document.querySelector('.btn__swipe__fake');
    var label = document.querySelector('.btn__swipe__literal .literal');

    // set min/max value
    inputRange.min = 0;
    inputRange.max = maxValue;

    // listen for unlock
    function unlockStartHandler() {
        // clear raf if trying again
        window.cancelAnimationFrame(rafID);
        // set to desired value
        currValue = +this.value;
        animateFake();
    }

    function unlockEndHandler() {
        // store current value
        currValue = +this.value;
        // determine if we have reached success or not
        if (currValue >= maxValue) {
            successHandler();
        }
        else {
            rafID = window.requestAnimationFrame(animateHandler);
        }
        animateFake();
    }

    // handle range animation
    function animateHandler() {

        // update input range
        inputRange.value = currValue;

        // determine if we need to continue
        if (currValue > -1) {
            window.requestAnimationFrame(animateHandler);
        }

        // decrement value
        currValue = currValue - speed;
        animateFake();
    }

    // handle successful unlock
    function successHandler() {
        const dataHref = $('.btn__swipe__pullee').attr('datahref');
        location.replace(dataHref)
        // reset input range
        inputRange.value = 0;
        // inputRange.closest('.btn__swipe').classList.add('success');
        // animateFake();
    };

    function animateFake() {
        const thumbSize = 45;
        const value = inputRange.value;
        const valueMax = inputRange.max;
        const valueMin = inputRange.min;
        const totalInputWidth = $('.btn__swipe').outerWidth();
        const thumbHalfWidth = 55 / 2;
        const ratio = (value - valueMin) / (valueMax - valueMin); //el max value es 1

        const left = (((value - valueMin) / (valueMax - valueMin)) * ((totalInputWidth - thumbHalfWidth) - thumbHalfWidth)) + thumbHalfWidth;
        fake.style.left = `${left}px`;
        // fake.style.transform = `translateX(-50%) rotate(${360*ratio}deg)`;
        label.style.opacity = (1 - ratio);
    };

    // bind events
    animateFake(); // para colocar en la posicion correcta
    inputRange.addEventListener('mousedown', unlockStartHandler, false);
    inputRange.addEventListener('mousestart', unlockStartHandler, false);
    inputRange.addEventListener('mouseup', unlockEndHandler, false);
    inputRange.addEventListener('touchend', unlockEndHandler, false);
    inputRange.addEventListener('input', animateFake);
}

const loadingPage = () => {
    $(window).on('load', function () {
        $('#loadingpage').delay(1500).queue(function (next) {
            $(this).fadeOut()
            next();
        })
    })
}
$(document).ready(() => {
    loadingPage();
    accordianList();
    owlCarousel();
    handlerAction();
    swipeButton();
});
