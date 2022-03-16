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
const headerAction = () => {
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
    if ($(window).width() < 768) {
        $('.home-5').appendTo('#home-mobile')
    }
}


$(document).ready(() => {
    accordianList();
    owlCarousel();
    headerAction();
});
