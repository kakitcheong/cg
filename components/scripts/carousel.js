////////////////////////////////////////////////////////////////////////////////
//  header hero carousel control                                              //
////////////////////////////////////////////////////////////////////////////////

$('.header-hero__carousel, .menu__carousel').slidesjs({
    height: 450,
    navigation: {
        active: false
    },
    pagination: {
        active: false
    },
    effect: {
        fade: {
            speed: 800,
            crossfade: true
        }
    },
    play: {
        active: false,
        // [boolean] Generate the play and stop buttons.
        // You cannot use your own buttons. Sorry.
        effect: "fade",
        // [string] Can be either "slide" or "fade".
        interval: 5000,
        // [number] Time spent on each slide in milliseconds.
        auto: true,
        // [boolean] Start playing the slideshow on load.
        swap: true,
        // [boolean] show/hide stop and play buttons
        pauseOnHover: true,
        // [boolean] pause a playing slideshow on hover
        restartDelay: 1500
        // [number] restart delay on inactive slideshow
    }
});

