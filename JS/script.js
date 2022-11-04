// Waits for DOM load
$(() => {
    let distance = $(window).scrollTop();
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
        // Turns yellow (#f9f047)
        $('#github').attr('src', 'https://api.iconify.design/octicon:mark-github-16.svg?color=%23f9f047');
    }, () => {
        // Turns back to green/blue (#00d4b5)
        $('#github').attr('src', 'https://api.iconify.design/octicon:mark-github-16.svg?color=%2300d4b5');
    });

    // Linkedin icon hover effect
    $('#linkedin').hover(() => {
        // Turns yellow (#f9f047)
        $('#linkedin').attr('src', 'https://api.iconify.design/akar-icons:linkedinv1-fill.svg?color=%23f9f047');
    }, () => {
        // Turns back to green/blue (#00d4b5)
        $('#linkedin').attr('src', 'https://api.iconify.design/akar-icons:linkedinv1-fill.svg?color=%2300d4b5');
    });

    // Contact menu hover effect
    $('#menu_icn').hover(() => {
        // Turns yellow (#f9f047)
        $('#menu_icn').attr('src', './Images/sandwich-icon-yellow-thin.png');
    }, () => {
        // Turns back to white (#d8e4ec)
        $('#menu_icn').attr('src', './Images/sandwich-icon-thin.png');
    });

    // Resume button hover effect
    $('#resume').hover(() => {
        // Turns text red(#940000) and background white(#d8e4ec)
        $('#resume').css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    }, () => {
        // Turns text back to white(#940000) and background back to red(#940000)
        $('#resume').css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    });

    // #ten_k_code button hover effect
    $('#ten_k_code').hover(() => {
        // Turns text red(#940000) and background white(#d8e4ec)
        $('#ten_k_code').css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    }, () => {
        // Turns text back to white(#940000) and background back to red(#940000)
        $('#ten_k_code').css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    });

    // #ten_k_demo button hover effect
    $('#ten_k_demo').hover(() => {
        // Turns text red(#940000) and background white(#d8e4ec)
        $('#ten_k_demo').css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    }, () => {
        // Turns text back to white(#940000) and background back to red(#940000)
        $('#ten_k_demo').css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    });

    // #huddle_code button hover effect
    $('#huddle_code').hover(() => {
        // Turns text red(#940000) and background white(#d8e4ec)
        $('#huddle_code').css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    }, () => {
        // Turns text back to white(#940000) and background back to red(#940000)
        $('#huddle_code').css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    });

    // #huddle_demo button hover effect
    $('#huddle_demo').hover(() => {
        // Turns text red(#940000) and background white(#d8e4ec)
        $('#huddle_demo').css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    }, () => {
        // Turns text back to white(#940000) and background back to red(#940000)
        $('#huddle_demo').css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    });

    /* Nav menu hover effect. Highlights button on hover & if user is in relevant screen area
        the button keeps its current value
    */
    // Contact nav button
    $('#contact_direct').hover(() => {
        $('#contact_direct').css({
            'border-radius' : '0 0 1rem 0',
            'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.5) 37%, #00000000 100%)'
        });
    }, () => {
        distance = $(window).scrollTop();
        if (distance > 340) {
            $('#contact_direct').css({
                'border-radius' : '0',
                'background' : 'none'
            });
        }
        else {
            $('#contact_direct').css({
                'border-radius' : '0 0 1rem 0',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }
    });

    // about nav button
    $('#about_direct').hover(() => {
        $('#about_direct').css({
            'border-radius' : '0 0 1rem 1rem',
            'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.5) 37%, #00000000 100%)'
        });
    }, () => {
        distance = $(window).scrollTop();
        if (distance <= 340 || distance >= 2300) {
            $('#about_direct').css({
                'border-radius' : '0',
                'background' : 'none'
            });
        }
        else {
            $('#about_direct').css({
                'border-radius' : '0 0 1rem 1rem',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }
    });

    // project nav button
    $('#project_direct').hover(() => {
        $('#project_direct').css({
            'border-radius' : '0 0 4rem 1rem',
            'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.5) 37%, #00000000 100%)'
        });
    }, () => {
        distance = $(window).scrollTop();
        if (distance < 2300) {
            $('#project_direct').css({
                'border-radius' : '0',
                'background' : 'none'
            });
        }
        else {
            $('#project_direct').css({
                'border-radius' : '0 0 4rem 1rem',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }
    });

    /* When the viewport is below 87px, the page nav will stick to the top of the window 
    and go back in place then scrolled above 87px height
    */
    if (distance > 87) {
        $('#pg_nav').css({
            'position' : 'fixed',
            'top' : '0px'
        });
        $('header').css({
            'margin-bottom' : '40px'
        });
    }
    else {
        $('#pg_nav').css({
            'position' : 'static',
            'top' : ''
        });
        $('header').css({
            'margin-bottom' : '0'
        });
        $('#contact').css({
            'border-radius' : '0'
        });
        $('#header_content').css({
            'grid-template-rows' : '1',
            'border-radius' : '0'
        });
    }

    // Highlighs contact nav button in contact section when within the relevant screen area
    if (distance < 340) {
        // Nav bar highlight
        $('#contact_direct').css({
            'border-radius' : '0 0 1rem 0',
            'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
        });
    }
    else {
        $('#contact_direct').css({
            'border-radius' : '0',
            'background' : 'none'
        });
    }

    // Highlighs about nav button in about section
    if (distance >= 340 && distance < 2300) {
        // Nav bar highlight
        $('#about_direct').css({
            'border-radius' : '0 0 1rem 1rem',
            'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
        });
    }
    else {
        $('#about_direct').css({
            'border-radius' : '0',
            'background' : 'none'
        });
    }
    
    // Highlighs projects nav button in project section
    if (distance >= 2300) {
        // Nav bar highlight
        $('#project_direct').css({
            'border-radius' : '0 0 4rem 1rem',
            'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
        });
    }
    else {
        $('#project_direct').css({
            'border-radius' : '0',
            'background' : 'none'
        });
    }

    // Listens for click events
    document.addEventListener('click', (event) => {
        let element = []
        element.push(event.target);

        // On medium or smaller screens
        if ($(document).width() < 753) {
            /* If element isn't any within the contact dropdown when a click is detected, 
                the contact dropdown is hidden 
            */
            if (element.includes($(':header')[0]) || 
                element.includes($('#header_content')[0]) || 
                element.includes($('#md_header')[0]) || 
                element.includes($('#name-container')[0]) || 
                element.includes($('#name')[0]) || 
                element.includes($('#contact-container')[0]) || 
                element.includes($('#contact_label_container')[0]) || 
                element.includes($('#contact_label')[0]) || 
                element.includes($('#contact')[0]) || 
                element.includes($('#menu_icn')[0]) || 
                element.includes($('#email')[0]) || 
                element.includes($('#github')[0]) || 
                element.includes($('#linkedin')[0])) {

                return
            }
            else {
                $('#contact').hide()
                $('#header_content').css({
                    'grid-template-rows' : '1',
                    'border-radius' : '0'
                });
            }
        }

        // Highlights contact nav button on click
        if (element.includes($('#contact_direct')[0])) {
            $('#contact_direct').css({
                'border-radius' : '0 0 1rem 0',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }

        // Highlights about nav button on click
        if (element.includes($('#about_direct')[0])) {
            $('#about_direct').css({
                'border-radius' : '0 0 1rem 1rem',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }

        // Highlights projects nav button on click
        if (element.includes($('#project_direct')[0])) {
            $('#project_direct').css({
                'border-radius' : '0 0 4rem 1rem',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }

        if (element.includes($('#resume')[0])) {
            // Changes the resume button to white (#940000) with red (#d8e4ec) text on click
            $('#resume').css({
                'color' : '#940000',
                'background-color' : '#d8e4ec'
            });
            setTimeout(() => {
                // Changes the resume button to red (#d8e4ec) with white (#940000) text after 175ms
                $('#resume').css({
                    'color' : '#d8e4ec',
                    'background-color' : '#940000'
                });
            }, 175)
        }

        if (element.includes($('.proj_bttn')[0])) {
            // Changes the project class buttons to white (#940000) with red (#d8e4ec) text on click
            $('.proj_bttn').css({
                'color' : '#940000',
                'background-color' : '#d8e4ec'
            });
            setTimeout(() => {
                // Changes the project class buttons to red (#d8e4ec) with white (#940000) text after 175ms
                $('.proj_bttn').css({
                    'color' : '#d8e4ec',
                    'background-color' : '#940000'
                });
            }, 175)
        }

    });
      

    // Listens for window resize
    window.addEventListener('resize', () => {
        // Shows #contact in sizes above tailwind's medium size
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

    // Listens for scrolling
    window.addEventListener("scroll", () => {
        let scroll = $(window).scrollTop();
        
        // Highlighs contact nav button in contact section when scrolled
        if (scroll < 340) {
            // Nav bar highlight
            $('#contact_direct').css({
                'border-radius' : '0 0 1rem 0',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }
        else {
            $('#contact_direct').css({
                'border-radius' : '0',
                'background' : 'none'
            });
        }

        // Highlighs about nav button in about section when scrolled
        if (scroll >= 340 && scroll < 2300) {
            // Nav bar highlight
            $('#about_direct').css({
                'border-radius' : '0 0 1rem 1rem',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }
        else {
            $('#about_direct').css({
                'border-radius' : '0',
                'background' : 'none'
            });
        }
        
        // Highlighs projects nav button in project section when scrolled
        if (scroll >= 2300) {
            // Nav bar highlight
            $('#project_direct').css({
                'border-radius' : '0 0 4rem 1rem',
                'background' : 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)'
            });
        }
        else {
            $('#project_direct').css({
                'border-radius' : '0',
                'background' : 'none'
            });
        }
        
        /* When the viewport is below 87px, the page nav will stick to the top of the window 
            and go back in place then scrolled above 87px height
        */
        if (scroll > 87) {
            $('#pg_nav').css({
                'position' : 'fixed',
                'top' : '0px'
            });
            $('header').css({
                'margin-bottom' : '200px'
            });
        }
        else {
            $('#pg_nav').css({
                'position' : 'static',
                'top' : ''
            });
            $('header').css({
                'margin-bottom' : '0'
            });
            $('#contact').css({
                'border-radius' : '0'
            });
            $('#header_content').css({
                'grid-template-rows' : '1',
                'border-radius' : '0'
            });

            // Makes sure the contact dropdown hides when the viewport is below 752px
            if ($(document).width() < 752) {
                $('#contact').hide()
            }
        }
    });
});

function clipboard() {

    // Changes the copy icon to yellow (#f9f047) outline version on click
    $('#copy_icn').attr('src', 'https://api.iconify.design/material-symbols:content-copy-outline-rounded.svg?color=%23f9f047');
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

    // Changes the github icon to yellow (#f9f047) outline version on click
    $('#github').attr('src', 'https://api.iconify.design/iconoir:github-outline.svg?color=%23f9f047');
    // After 300ms the icon changes back to green/blue (#00ffed) original
    setTimeout(() => {
        $('#github').attr('src', 'https://api.iconify.design/octicon:mark-github-16.svg?color=%2300d4b5');
    }, 300)
}

function inclick() {

    // Changes the linkedin icon to yellow (#f9f047) outline version on click
    $('#linkedin').attr('src', 'https://api.iconify.design/ph:linkedin-logo-bold.svg?color=%23f9f047');
    // After 300ms the icon changes back to green/blue (#00d4b5) original
    setTimeout(() => {
        $('#linkedin').attr('src', 'https://api.iconify.design/akar-icons:linkedinv1-fill.svg?color=%2300d4b5');
    }, 300)
}

function contact() {
    // Shows the contact dropdown when the menu icon triggers this function and closes it if open when triggered
    if ($(document).width() < 752) {
        if ($('#contact').css('display') == 'none') {
            // Changes the menu icon to yellow (#f9f047) on click
            $('#menu_icn').attr('src', './Images/sandwich-icon-yellow-thin.png');
            setTimeout(() => {
                // After 175ms the icon changes back to white (#d8e4ec)
                $('#menu_icn').attr('src', './Images/sandwich-icon-thin.png');
            }, 175)
            $('#header_content').css({
                'grid-template-rows' : '3',
                'border-radius' : '0 0 2rem 0'
            });
            
            $('#contact').show()


        }
        else {
            // Changes the menu icon to yellow (#f9f047) on click
            $('#menu_icn').attr('src', './Images/sandwich-icon-yellow-thin.png');
            setTimeout(() => {
                // After 175ms the icon changes back to white (#d8e4ec)
                $('#menu_icn').attr('src', './Images/sandwich-icon-thin.png');
            }, 175)
            $('#contact').hide()
            $('#contact').css({
                'border-radius' : '0'
            });

            $('#header_content').css({
                'grid-template-rows' : '1',
                'border-radius' : '0'
            });

        }
    }
}


function contactClick() {
    $('html, body').animate({
        scrollTop: 0
    }, 750);
}

function aboutClick() {
    if ($(document).width() < 625) {
        $('html, body').animate({
            scrollTop: 700
        }, 750);
    }
    else {
        $('html, body').animate({
            scrollTop: 730
        }, 750);
    }
}

function projectClick() {
    if ($(document).width() > 1008) {
        $('html, body').animate({
            scrollTop: 2480
        }, 750);
    }
    else if ($(document).width() > 675) {        
        $('html, body').animate({
            scrollTop: 2880
        }, 750);
    }
    else if ($(document).width() > 625) {
        $('html, body').animate({
            scrollTop: 2780
        }, 750);
    }
    else if ($(document).width() > 586) {
        $('html, body').animate({
            scrollTop: 2830
        }, 750);
    }
    else if ($(document).width() > 518) {
        $('html, body').animate({
            scrollTop: 2860
        }, 750);
    }
    else if ($(document).width() > 505) {
        $('html, body').animate({
            scrollTop: 2875
        }, 750);
    }
    else if ($(document).width() < 506) {
        $('html, body').animate({
            scrollTop: 2900
        }, 750);
    }
}