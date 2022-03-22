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
        $('.home-5').appendTo('#home-mobile')
    }
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
        openCharacter.next('.btn-character').fadeToggle();
        openCharacter.fadeToggle();
    });
    $('#character').find('.cloes').on('click', () => {
        $('#character').find('.btn-character').fadeOut();
        openCharacter.fadeIn();
    })
}


$(document).ready(() => {
    accordianList();
    owlCarousel();
    handlerAction();
    if (!(document.cookie.indexOf("popupOnce") > -1)) {
        $('.loadingpage').show();
        $('.loadingpage').delay(3000).fadeOut();
        $('body').css({
            display: "block"
        });
        createCookie('popupOnce', "1", 1);
    }
    else {
        $('body').css({
            display: "block"
        });
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
