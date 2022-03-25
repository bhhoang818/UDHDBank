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
    $('#character').find('.cloes').on('click', () => {
        $('#character').fadeOut();
    });
    $('#uatModal').find('.btn-agree').on('click', () => {
        $('#uatModal').fadeOut();
    });
    $('.character-popup').find('.close').on('click', () => {
        $('.character-popup').slideToggle();
    });
    $('#character').appendTo('header .navbar .character-popup');
}
const swipeButton = () => {
    var initialMouse = 0;
    var slideMovementTotal = 0;
    var mouseIsDown = false;
    var slider = $('#slider');
    var loading = $("#loading-container");
    var url = $('#button-background .slide-text').attr('data-url');
    var swipeButton = $('#button-background');
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
                slider.animate({ left: "3px" }, 300);
            }, 800);
            setTimeout(function () {
                loading.fadeIn();
            }, 800);
            setTimeout(function () {
                window.location.href = url;
            }, 5000);
        });

        $(document.body).on('mousemove touchmove', function (event) {
            if (!mouseIsDown)
                return;

            var currentMouse = event.clientX || event.originalEvent.touches[0].pageX;
            var relativeMouse = currentMouse - initialMouse;
            var slidePercent = 1 - (relativeMouse / slideMovementTotal);

            $('.slide-text').fadeTo(0, slidePercent);

            if (relativeMouse <= 0) {
                slider.css({ 'left': '3px' });
                return;
            }
            if (relativeMouse >= slideMovementTotal + 10) {
                slider.css({ 'left': slideMovementTotal + 'px' });
                return;
            }
            slider.css({ 'left': relativeMouse - 10 });
        });

    }
}

// const loadingPage = () => {
//     window.addEventListener('load', () => {
//         var preload = document.querySelector('#loading-container');
//         preload.classList.add('preload-finish');
//     })
// }

const keyUp = () => {
    $('#txtSearch').keyup(function (event) {
        $(this).closest('.form-group').find('.clearn').addClass('active');
    });
    $('.clearn').on('click', function () {
        $('#txtSearch').val('');
        $(this).removeClass('active');
    });
}

$(document).ready(() => {
    // loadingPage();
    accordianList();
    owlCarousel();
    handlerAction();
    swipeButton();
    keyUp();
});
