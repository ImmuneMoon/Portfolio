// Document width settings

const mediumWidth = 752;


// Window distance from top settings

// --> MAKE THE SCREEN BREAK POINTS ASSIGNED TO DIVS ON THE PAGE POSSIBLY?? <--

// Top of the page
const pageTop = 0;
// The point where the header ends
const headerBreak = 87;
// The point on the page the contact section ends
const contactBreak = 740;
const contactBreakMd = 772;
// The point on the page the about section ends
const aboutBreak = 2900;
const aboutBreakMd = 3500;
// For if new content is added in the future & a project break is needed
//const projectBreak = TBD;

// Gets the width of the page
let $width = $(window).width();

function clipboard() {
    // Change the copy icon to yellow (#f9f047) outline version on click
    $('#copy_icn')
      .attr(
        'src',
        'https://api.iconify.design/material-symbols:content-copy-outline-rounded.svg?color=%23f9f047'
      ).delay(300).queue(function () {
        // After 300ms, change the icon back to the original color
        $(this).attr(
          'src',
          'https://api.iconify.design/material-symbols:content-copy-rounded.svg?color=%23d8e4ec'
        );
        $(this).dequeue();
      });
  
    // Copy the #email button value to the user's clipboard
    navigator.clipboard.writeText($('#email').text());
  
    // Alert the user
    $('#alert').text('copied!').css({
        display: 'flex',
        transform: 'translateY(1.5em)',
      })
      .delay(1000)
      .fadeOut();
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
    if ($(document).width() < mediumWidth) {
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


function contactNavClick() {
    $('html, body').animate({
        scrollTop: pageTop
    }, 750);
}

function aboutNavClick() {
    if ($(document).width() > mediumWidth) {
        $('html, body').animate({
            scrollTop: contactBreak + 1
        }, 750);
    }
    else {
        $('html, body').animate({
            scrollTop: contactBreakMd + 1
        }, 750);
    }
}

function projectNavClick() {
    if ($(document).width() > mediumWidth) {
        $('html, body').animate({
            scrollTop: aboutBreak + 1
        }, 750);
    }
    else {
        $('html, body').animate({
            scrollTop: aboutBreakMd + 1
        }, 750);
    }
}


// Waits for DOM load
$(document).ready(() => {
    let $distance = $(window).scrollTop();
    const navFocusColor = 'linear-gradient(to top, rgba(0, 255, 238, 0.318) 37%, #00000000 100%)';
    const navHoverColor = 'linear-gradient(to top, rgba(0, 255, 238, 0.5) 37%, #00000000 100%)';
    
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

    // These elements will change from (#940000) red to (#d8e4ec) white on hovering
    $('#resume, #space_tour_code, #space_tour_challenge, #scrape_code, #scrape_demo, #isdn_code, #isdn_demo, #ten_k_code, #ten_k_demo, #huddle_code, #huddle_demo, #order_card_code, #order_card_demo')
    .on('mouseenter', (event) => {
        $(event.target).css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    })
    .on('mouseleave', (event) => {
        $(event.target).css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    }); 
     // Listens for click events
    document.addEventListener('click', (event) => {
        let element = []
        element.push(event.target);
        let contactArr = [
            $(':header')[0],
            $('#header_content')[0],
            $('#md_header')[0],
            $('#name-container')[0],
            $('#name')[0],
            $('#contact-container')[0],
            $('#contact_label_container')[0],
            $('#contact_label')[0],
            $('#contact')[0],
            $('#menu_icn')[0],
            $('#email')[0],
            $('#cpy_border')[0],
            $('#copy_icn')[0],
            $('#github')[0],
            $('#linkedin')[0]
        ]
        // On medium or smaller screens
        if ($width < 753) {
            /* If element isn't any within the contact dropdown when a click is detected, 
                the contact dropdown is hidden 
            */
            if (contactArr.includes(element[0])) {
                return
            }
            else {
                $('#contact').hide();
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
            $('#contact').show();
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
/*
    // #space_tour_demo button hover effect
    $('#space_tour_demo').hover(() => {
        // Turns text red(#940000) and background white(#d8e4ec)
        $('#space_tour_demo').css({
            'color' : '#940000',
            'background-color' : '#d8e4ec'
        });
    }, () => {
        // Turns text back to white(#940000) and background back to red(#940000)
        $('#space_tour_demo').css({
            'color' : '#d8e4ec',
            'background-color' : '#940000'
        });
    });
*/  

    if ($distance > headerBreak) {
        $('#pg_nav').css({
            'position' : 'fixed',
            'top' : '0px'
        });
        $('header').css({
            'margin-bottom' : '40px'
        });
    }

    console.log('width', $width);
    if ($width > mediumWidth) {

        if ($distance < contactBreak) {
            console.log('distance < contactBreak');
            $('#contact_direct').css({
                'border-radius' : '0 0 1rem 0',
                'background' : navFocusColor
            });
        }

        else if ($distance > contactBreak && $distance < aboutBreak) {
            $('#about_direct').css({
                'border-radius' : '0 0 1rem 1rem',
                'background' : navFocusColor
            });
        }
        else if ($distance > aboutBreak) {
            $('#project_direct').css({
                'border-radius' : '0 0 4rem 1rem',
                'background' : navFocusColor
            });
        }

        // Above medium screen nav button hover Effects

        // Contact nav button
        $('#contact_direct').hover(() => {
            $('#contact_direct').css({
                'border-radius' : '0 0 1rem 0',
                'background' : navHoverColor
            });
        }, () => {
            $distance = $(window).scrollTop();
            if ($distance > contactBreak) {
                $('#contact_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            else if ($distance < contactBreak) {
                $('#contact_direct').css({
                    'border-radius' : '0 0 1rem 0',
                    'background' : navFocusColor
                });
            }
        });

        // about nav button
        $('#about_direct').hover(() => {
            $('#about_direct').css({
                'border-radius' : '0 0 1rem 1rem',
                'background' : navHoverColor
            });
        }, () => {
            $distance = $(window).scrollTop();
            if ($distance <= contactBreak || $distance >= aboutBreak) {
                $('#about_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            else if ($distance >= contactBreak && $distance <= aboutBreak) {
                $('#about_direct').css({
                    'border-radius' : '0 0 1rem 1rem',
                    'background' : navFocusColor
                });
            }
        });

        // project nav button
        $('#project_direct').hover(() => {
            $('#project_direct').css({
                'border-radius' : '0 0 4rem 1rem',
                'background' : navHoverColor
            });
        }, () => {
            $distance = $(window).scrollTop();
            if ($distance < aboutBreak) {
                $('#project_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            else if ($distance > aboutBreak) {
                $('#project_direct').css({
                    'border-radius' : '0 0 4rem 1rem',
                    'background' : navFocusColor
                });
            }
        });
    }
    // Medium or lower screens
    else {

        if ($distance < contactBreakMd) {
            $('#contact_direct').css({
                'border-radius' : '0 0 1rem 0',
                'background' : navFocusColor
            });
        }
        else {
            $('#pg_nav').css({
                'position' : 'fixed',
                'top' : '0px'
            });
            $('header').css({
                'margin-bottom' : '40px'
            });
        }

        if ($distance > contactBreakMd && distance < aboutBreakMd) {
            $('#about_direct').css({
                'border-radius' : '0 0 1rem 1rem',
                'background' : navFocusColor
            });
        }
        else if ($distance > aboutBreakMd) {
            $('#project_direct').css({
                'border-radius' : '0 0 4rem 1rem',
                'background' : navFocusColor
            });
        }

        // Medium screen nav button hover Effects
        // Contact nav button
        $('#contact_direct').hover(() => {
            $('#contact_direct').css({
                'border-radius' : '0 0 1rem 0',
                'background' : navHoverColor
            });
        }, () => {
            $distance = $(window).scrollTop();
            if ($distance > contactBreakMd) {
                $('#contact_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            else if ($distance < contactBreakMd) {
                $('#contact_direct').css({
                    'border-radius' : '0 0 1rem 0',
                    'background' : navFocusColor
                });
            }
        });

        // about nav button
        $('#about_direct').hover(() => {
            $('#about_direct').css({
                'border-radius' : '0 0 1rem 1rem',
                'background' : navHoverColor
            });
        }, () => {
            $distance = $(window).scrollTop();
            if ($distance <= contactBreakMd || $distance >= aboutBreakMd) {
                $('#about_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            else if ($distance >= contactBreakMd && $distance <= aboutBreakMd) {
                $('#about_direct').css({
                    'border-radius' : '0 0 1rem 1rem',
                    'background' : navFocusColor
                });
            }
        });

        // project nav button
        $('#project_direct').hover(() => {
            $('#project_direct').css({
                'border-radius' : '0 0 4rem 1rem',
                'background' : navHoverColor
            });
        }, () => {
            $distance = $(window).scrollTop();
            if ($distance < aboutBreakMd) {
                $('#project_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            else if ($distance > aboutBreakMd) {
                $('#project_direct').css({
                    'border-radius' : '0 0 4rem 1rem',
                    'background' : navFocusColor
                });
            }
        });
    }

    // Listens for click events
    document.addEventListener('click', (event) => {
        let element = []
        element.push(event.target);
        let contactArr = [
            $(':header')[0],
            $('#header_content')[0],
            $('#md_header')[0],
            $('#name-container')[0],
            $('#name')[0],
            $('#contact-container')[0],
            $('#contact_label_container')[0],
            $('#contact_label')[0],
            $('#contact')[0],
            $('#menu_icn')[0],
            $('#email')[0],
            $('#cpy_border')[0],
            $('#copy_icn')[0],
            $('#github')[0],
            $('#linkedin')[0]
        ]
        // On medium or smaller screens
        if ($width < 753) {
            /* If element isn't any within the contact dropdown when a click is detected, 
                the contact dropdown is hidden 
            */
            if (contactArr.includes(element[0])) {
                return
            }
            else {
                $('#contact').hide();
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
            $('#contact').show();
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
    $(window).scroll(function() {
        $distance = $(window).scrollTop();
        /* When the viewport is below 87px, the page nav will stick to the top of the window 
        and go back in place then scrolled above 87px height, 87 px being where the header ends
        */
        
        if ($distance > headerBreak) {
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
        
        if ($width > mediumWidth) {

            // Highlighs contact nav button in contact section when within the relevant screen area
            if ($distance < contactBreak) {
                // Nav bar highlight
                $('#contact_direct').css({
                    'border-radius' : '0 0 1rem 0',
                    'background' : navFocusColor
                });
            }
            else {
                $('#contact_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }

            // Highlighs about nav button in about section
            if ($distance >= contactBreak && $distance <= aboutBreak) {
                // Nav bar highlight
                $('#about_direct').css({
                    'border-radius' : '0 0 1rem 1rem',
                    'background' : navFocusColor
                });
            }
            else if ($distance <= contactBreak || $distance >= aboutBreak) {
                $('#about_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            
            // Highlighs projects nav button in project section
            if ($distance > aboutBreak) {
                // Nav bar highlight
                $('#project_direct').css({
                    'border-radius' : '0 0 4rem 1rem',
                    'background' : navFocusColor
                });
            }
            else {
                $('#project_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
        }
        else {

            // Highlighs contact nav button in contact section when within the relevant screen area
            if ($distance < contactBreakMd) {
                // Nav bar highlight
                $('#contact_direct').css({
                    'border-radius' : '0 0 1rem 0',
                    'background' : navFocusColor
                });
            }
            else {
                $('#contact_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }

            // Highlighs about nav button in about section
            if ($distance >= contactBreakMd && $distance <= aboutBreakMd) {
                // Nav bar highlight
                $('#about_direct').css({
                    'border-radius' : '0 0 1rem 1rem',
                    'background' : navFocusColor
                });
            }
            else if ($distance <= contactBreakMd || $distance >= aboutBreakMd) {
                $('#about_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
            
            // Highlighs projects nav button in project section
            if ($distance > aboutBreakMd) {
                // Nav bar highlight
                $('#project_direct').css({
                    'border-radius' : '0 0 4rem 1rem',
                    'background' : navFocusColor
                });
            }
            else {
                $('#project_direct').css({
                    'border-radius' : '0',
                    'background' : 'none'
                });
            }
        }

        // Makes sure the contact dropdown hides when the viewport is below 752px
        if ($(window).width() < mediumWidth) {
            $('#contact').hide()
            $('#sandwich_menu').show()
        }
        else {
            $('#contact').show();
            $('#sandwich_menu').hide();
        }
    
    });

    // Listens for window resize
    $(window).resize(() => {
        $width = $(this).width();
        // Shows #contact in sizes above tailwind's medium size
        if ($width > mediumWidth) {
            $('#contact').show()
            $('#sandwich_menu').hide()
            $('#header_content').css({
                'grid-template-rows' : '1'
            });
        }
        // Hides #contact in sizes below tailwind's medium size
        else if ($width < mediumWidth) {
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

