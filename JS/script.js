// Waits for DOM load
$(() => {

    // Copy icon hover effect
    $('#email').hover(() => {
        // Turns green/blue (#00d4b5)
        $('#copy_icn').attr('src', 'https://api.iconify.design/material-symbols:content-copy-rounded.svg?color=%2300d4b5');
    }, () => {
        // Turns back to white (#d8e4ec)
        $('#copy_icn').attr('src', 'https://api.iconify.design/material-symbols:content-copy-rounded.svg?color=%23d8e4ec');
    });

    // Github icon hover effect
    $('#github').hover(() => {
        // Turns orange (#ff8900)
        $('#github').attr('src', 'https://api.iconify.design/octicon:mark-github-16.svg?color=%23ff8900');
    }, () => {
        // Turns back to green/blue (#00d4b5)
        $('#github').attr('src', 'https://api.iconify.design/octicon:mark-github-16.svg?color=%2300d4b5');
    });

    // Linkedin icon hover effect
    $('#linkedin').hover(() => {
        // Turns orange (#ff8900)
        $('#linkedin').attr('src', 'https://api.iconify.design/akar-icons:linkedinv1-fill.svg?color=%23ff8900');
    }, () => {
        // Turns back to green/blue (#00d4b5)
        $('#linkedin').attr('src', 'https://api.iconify.design/akar-icons:linkedinv1-fill.svg?color=%2300d4b5');
    });

    // Contact menu hover effect
    $('#menu_icn').hover(() => {
        // Turns orange (#ff8800)
        $('#menu_icn').attr('src', '/Images/sandwich-icon-(ff8800).ico');
    }, () => {
        // Turns back to white (#d8e4ec)
        $('#menu_icn').attr('src', '/Images/sandwich-icon(d8e4ec).ico');
    });

    // Resume hover effect
    $('#resume').hover(() => {
        // Turns white/ red (#d8e4ec / #940000)
        $('#resume').css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    }, () => {
        // Turns back to red/ white (#940000 / #d8e4ec)
        $('#resume').css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    });

    document.addEventListener('click', (event) => {
        let element = []
        element.push(event.target);
        if ($(document).width() < 753) {
            // If element isn't any within the contact dropdown
            if (element.includes($('#contact-container')[0]) || element.includes($('#contact')[0]) || element.includes($('#menu_icn')[0]) || element.includes($('#email')[0]) || element.includes($('#github')[0]) || element.includes($('#linkedin')[0])) {
                return
            }

            else {
                $('#contact').hide()
            }
        }
        
    });
      

    // Listens for window resize
    window.addEventListener('resize', () => {
        // Shows #contact in sizes above tailwind's medium size
        console.log($(document).width())
        if ($(document).width() > 752) {
            $('#contact').show()
            $('#sandwich_menu').hide()
            $('#header_content').css({
                'grid-template-rows' : '1'
            });
        }
        // Hides #contact in sizes below tailwind's medium size
        else if ($(document).width() < 753) {
            $('#contact').hide()
            $('#sandwich_menu').show()
            $('#header').css({
                'padding-bottom' : '1rem',
                'border-radius' : '0'
            });
            $('#header_content').css({
                'grid-template-rows' : '1',
                'border-radius' : '0'
            });
        }
    });
});

function clipboard() {

    // Changes the copy icon to orange (#ff8800) outline version on click
    $('#copy_icn').attr('src', 'https://api.iconify.design/material-symbols:content-copy-outline-rounded.svg?color=%23ff8800');
    // After 300ms the icon changes back to white (#d8e4ec) original
    setTimeout(() => {
        $('#copy_icn').attr('src', 'https://api.iconify.design/material-symbols:content-copy-rounded.svg?color=%23d8e4ec');
    }, 300)

    // Copy the #email button value to the users clipboard
    navigator.clipboard.writeText($('#email').text());

    function alert() {

        // Alert the user
        $('#alert').text('copied!');

        // Makes alert come from below the button in an animation effect
        $('#alert').css({
            'display' : 'flex',
            'transform' : 'translateY(1.5em)'
        }).animate({
            'transition' : 'opacity 1s ease-in-out'
        });

        // Waits 1000ms to hide again
        setTimeout(() => {
            $('#alert').hide();
        }, 1000)
    }
    return alert();
}

function gitclick() {

    // Changes the github icon to orange (#ff8900) outline version on click
    $('#github').attr('src', 'https://api.iconify.design/iconoir:github-outline.svg?color=%23ff8900');
    // After 300ms the icon changes back to green/blue (#00ffed) original
    setTimeout(() => {
        $('#github').attr('src', 'https://api.iconify.design/octicon:mark-github-16.svg?color=%2300d4b5');
    }, 300)
}

function inclick() {

    // Changes the linkedin icon to orange (#ff8900) outline version on click
    $('#linkedin').attr('src', 'https://api.iconify.design/ph:linkedin-logo-bold.svg?color=%23ff8900');
    // After 300ms the icon changes back to green/blue (#00d4b5) original
    setTimeout(() => {
        $('#linkedin').attr('src', 'https://api.iconify.design/akar-icons:linkedinv1-fill.svg?color=%2300d4b5');
    }, 300)
}

function contact() {
    if ($('#contact').css('display') == 'none') {
        $('#header_content').css({
            'grid-template-rows' : '3',
            'border-radius' : '0 0 2rem 0'
        });
        
        $('#contact').show()

        // Turns orange (#ff8800)
        $('#menu_icn').attr('src', '/Images/sandwich-icon-(ff8800).ico');

    }
    else {
        $('#contact').hide()
        $('#contact').css({
            'border-radius' : '0'
        });

        $('#header_content').css({
            'grid-template-rows' : '1',
            'border-radius' : '0'
        });

        // Turns back to white (#d8e4ec)
        $('#menu_icn').attr('src', '/Images/sandwich-icon(d8e4ec).ico');
    }
}