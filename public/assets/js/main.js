"use strict";

jQuery(document).ready(function($) {
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    //    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
    //        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //            var target = $(this.hash);
    //            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //            if (target.length) {
    //                $('html,body').animate({
    //                    scrollTop: (target.offset().top - 40)
    //                }, 1000);
    //                if ($('.navbar-toggle').css('display') != 'none') {
    //                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
    //                }
    //                return false;
    //            }
    //        }
    //    });

    /*---------------------------------------------*
     * Menu Section
     ---------------------------------------------*/

    $(".cd-menu-trigger").on("click", function(event) {
        event.preventDefault();
        $(".home-main-content").addClass("move-out");
        $("#main-nav").addClass("is-visible");
        $(".cd-shadow-layer").addClass("is-visible");
    });
    //close menu
    $(".cd-close-menu").on("click", function(event) {
        event.preventDefault();
        $(".home-main-content").removeClass("move-out");
        $("#main-nav").removeClass("is-visible");
        $(".cd-shadow-layer").removeClass("is-visible");
    });

    //clipped image - blur effect
    set_clip_property();
    $(window).on("resize", function() {
        set_clip_property();
    });

    function set_clip_property() {
        var $header_height = $(".cd-header").height(),
            $window_height = $(window).height(),
            $header_top = $window_height - $header_height,
            $window_width = $(window).width();
        $(".cd-blurred-bg").css(
            "clip",
            "rect(" +
                $header_top +
                "px, " +
                $window_width +
                "px, " +
                $window_height +
                "px, 0px)"
        );
    }
    $('#main-nav a[href^="#"]').on("click", function(event) {
        event.preventDefault();
        var target = $(this.hash);
        $(".home-main-content").removeClass("move-out");
        $("#main-nav").removeClass("is-visible");
        $(".cd-shadow-layer").removeClass("is-visible");
        $("body,html").animate({ scrollTop: target.offset().top }, 900);
    });

    //fancybox
    $(".youtube-media").on("click", function(e) {
        var jWindow = $(window).width();
        if (jWindow <= 410) {
            return;
        }
        $.fancybox({
            href: this.href,
            padding: 4,
            type: "iframe",
            href: this.href.replace(new RegExp("watch\\?v=", "i"), "v/")
        });
        return false;
    });

    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    $.localScroll();

    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

    /* ---------------------------------------------------------------------
     Carousel
     ---------------------------------------------------------------------= */

    //    $('.main_home_slider').owlCarousel({
    //        responsiveClass: true,
    //        autoplay: false,
    //        items: 1,
    //        loop: true,
    //        dots: true,
    //        nav: false,
    //        navText: [
    //            "<i class='lnr lnr-chevron-left'></i>",
    //            "<i class='lnr lnr-chevron-right'></i>"
    //        ],
    //        autoplayHoverPause: true

    //    });

    $(".main_choose_content").owlCarousel({
        responsiveClass: true,
        autoplay: false,
        items: 1,
        loop: true,
        dots: false,
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
        autoplayHoverPause: true
    });

    // main-menu-scroll
    //
    //    jQuery(window).scroll(function () {
    //        var top = jQuery(document).scrollTop();
    //        var height = 300;
    //        //alert(batas);
    //
    //        if (top > height) {
    //            jQuery('.navbar-fixed-top').addClass('menu-scroll');
    //        } else {
    //            jQuery('.navbar-fixed-top').removeClass('menu-scroll');
    //        }
    //    });

    // scroll Up

    $(window).scroll(function() {
        if ($(this).scrollTop() > 600) {
            $(".scrollup").fadeIn("slow");
        } else {
            $(".scrollup").fadeOut("slow");
        }
    });
    $(".scrollup").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });

    //    $('#menu').slicknav();

    $("#mixcontent").mixItUp({
        animation: {
            animateResizeContainer: false,
            effects: "fade rotateX(-45deg) translateY(-10%)"
        }
    });

    //    $('.dropdown-menu').click(function (e) {
    //        e.stopPropagation();
    //    });

    //End
});

$(document).on("scroll", function() {
    if ($(document).scrollTop() > 120) {
        $("nav").addClass("small");
    } else {
        $("nav").removeClass("small");
    }
});

$(document).on("click", ".navbar-collapse.in", function(e) {
    if ($(e.target).is("a")) {
        $(this).collapse("hide");
    }
});

window.addEventListener(
    "play",
    function(evt) {
        if (
            window.$_currentlyPlaying &&
            window.$_currentlyPlaying != evt.target
        ) {
            window.$_currentlyPlaying.pause();
        }
        window.$_currentlyPlaying = evt.target;
    },
    true
);

Vue.component("wavesurfer-player", {
    template: "#player-template",
    props: ["layout"],
    data: function() {
        return {
            sources: [
                {
                    name: "Alex Ruwe",
                    title: "Missin Me",
                    src: "assets/audio/MissinMe_FINALMASTER.wav",
                    isActive: true
                },
                {
                    name: "TEST",
                    title: "TEST",
                    src: "assets/audio/ColonFinalMaster.mp3",
                    isActive: true
                },
                {
                    name: "TEST",
                    title: "TEST",
                    src: "assets/audio/Two_Ghosts_Master.mp3",
                    isActive: true
                }
            ],
            titles: ["Missin Me by Alex Ruwe!!!!"]
        };
    },

    methods: {
        initWaveSurf: function(self) {
            this.wavesurfer = WaveSurfer.create({
                container: "#waveform",
                barWidth: 1,
                height: 50,
                waveColor: "#262626",
                progressColor: "#2ddcb4"
            });
            // this.wavesurfer.load(this.sources[0].src);
            // this.indexPlaying = 0;
        },
        addWaveSurfListeners: function() {
            var me = this;
            this.wavesurfer.on("ready", function() {
                console.log("wavesurfer ready to surf");
                me.wavesurfer.play();
            });
            this.wavesurfer.on("finish", function() {
                console.log("wavesurfer finished a run");
                me.playNext();
            });
        },
        getSurfer: function() {
            return this.wavesurfer;
        },
        play: function() {
            console.log("play methode raised in component");
            this.wavesurfer.play();
        },
        pause: function() {
            console.log("pause methode raised in component");
            this.wavesurfer.pause();
        },
        playNext: function() {
            if (this.indexPlaying === this.sources[0]) {
                this.wavesurfer.load(this.sources[0]);
                this.wavesurfer.load(this.sources[this.indexPlaying].src);
                this.wavesurfer.play(this.sources[0]);
            } else {
                this.indexPlaying = 0;
                this.wavesurfer.load(this.sources[0].src);
                this.wavesurfer.play(this.sources[0]);
            }
            console.log("try play but maybe didn t finish to load?");
            //this.play();
        },

        playNext2: function() {
            if (this.indexPlaying != this.sources[2]) {
                this.wavesurfer.load(this.sources[2]);
                this.wavesurfer.load(this.sources[2].src);
                this.wavesurfer.play(this.sources[2]);
            } else {
                this.indexPlaying = 2;
                this.wavesurfer.load(this.sources[2].src);
                this.wavesurfer.play(this.sources[2]);
            }
            console.log("try play but maybe didn t finish to load?");
            //this.play();
        },
        playPrev: function() {
            if (this.indexPlaying > 0) {
                this.indexPlaying -= 1;
                this.wavesurfer.load(this.sources[this.indexPlaying].src);
            } else {
                this.indexPlaying = 0;
                this.wavesurfer.load(this.sources[0].src);
            }
            console.log("try play but maybe didn t finish to load?");
            //this.play();
        },
        togglePlayPause: function(event) {
            console.log("titi");
            if ($(event.currentTarget).hasClass("play")) {
                console.log("play");
                this.play();
                $(event.currentTarget).removeClass("play");
                $(event.currentTarget).addClass("pause");
            } else {
                console.log("pause");
                this.pause();
                $(event.currentTarget).removeClass("pause");
                $(event.currentTarget).addClass("play");
            }
        }
    },

    mounted: function() {
        console.log("wavesurferlayer component mounted");
        console.log(this);
        this.initWaveSurf(this);
        this.addWaveSurfListeners();
    }
});

var audiodemo = new Vue({
    el: "#audio-demos-vuejs",
    ready: function() {}
});
