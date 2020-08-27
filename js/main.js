//Load JSON
let myRequest = new Request('data/journey.json');
let mainObj, pageContent, charSelection, capstone, ending;

fetch(myRequest).then((response) => {
    return response.json();
}).then((data) => {
    mainObj = data;
    pageContent = data.pageContent;
    charSelection = data.charSelection;
    capstone = data.capstone;
    ending = data.ending;
    console.log(mainObj);
}).catch((error) => {
    console.error(error);
});

//Function to control scrolling the background during "page" transitions
function scrollBackground() {
    console.log('Scrolling!');
    var pageBody = document.querySelectorAll('body')[0];
    pageBody.classList.add('bg-scroll');
    setTimeout(() => {
        pageBody.classList.remove('bg-scroll');
    }, 1000);
}

//timeout controller
function doTimeoutOnThisPage() {
    console.log("Time's ticking!");
    const timeOutTime = 1000*60*2; //1000 milliseconds times 60 sections times 2 minutes
    let time = setTimeout(timeRanOut, timeOutTime);

    document.addEventListener("touchstart", () => {
        resetTime();
    });
    document.addEventListener("touchmove", () => {
        resetTime();
    });
    document.addEventListener("touchend", () => {
        resetTime();
    });

    function resetTime() {
        clearTimeout(time);
        time = setTimeout(timeRanOut, timeOutTime);
        console.log("Time reset");
    }

    function timeRanOut() {
        window.location.href='index.html';
        console.warn('Time ran out');
    }
}

//Function to control returning the user to the character selection page
function backToStart(replaceID) {
    //This is temporary for now
    //location.reload();
    const content = document.getElementById('content');
    const htmlToReplace = document.getElementById(replaceID);
    htmlToReplace.classList.add('animated', 'fadeOut', "fast");
    htmlToReplace.addEventListener("animationend", () => {
        let originalHTML = "<div id='charSelect' class='animated fadeIn'><h2>Choose your character</h2><section class='clickable' onclick='selectCharacter(\"webApps\")'><h3>Web Application Design</h3><img src='images/web_apps.gif' alt='The web application designer' /></section><section class='clickable' onclick='selectCharacter(\"intMedia\")'><h3>Interactive Media</h3><img src='images/im.gif' alt='The interactive media designer' /></section><section class='clickable' onclick='selectCharacter(\"digCommerce\")'><h3>Digital Commerce</h3><img src='images/commerce.gif' alt='The digital commerce person' /></section><section class='clickable' onclick='selectCharacter(\"massMedia\")'><h3>Digital Mass Media</h3><img src='images/media.gif' alt='The mass media person' /></section></div>";
        content.innerHTML = originalHTML;
    });
}

//Character selection
function selectCharacter(concentration) {
    //Fade out the existing content
    let sections = document.getElementById('charSelect');
    sections.classList.add('animated', 'fadeOut');
    //When the fadeout is complete
    sections.addEventListener('animationend', () => {
        console.log(concentration);
        //Get content element
        const content = document.getElementById('content');
        //Create new content string
        let newContent = "";
        let stat1, stat2, stat3, stat4;
        //Create stats template and arrows
        const statsHTML = "<section id='stats' class='animated fadeIn delay-2s'><p>PROGRAM:</p><div class='bar'><div class='yellow'></div></div><p>DESIGN:</p><div class='bar'><div class='green'></div></div><p>COMMERCE:</p><div class='bar'><div class='blue'></div></div><p>MEDIA:</p><div class='bar'><div class='red'></div></section>";
        //NOTE: Change arrow onClick so that instead of reloading the page, it calls a function to plug in the original HTML
        const arrows = "<p class='arrow-back clickable animated fadeIn delay-2s' onclick='backToStart(\"charDetail\");'>&lt; Go Back</p> <p class='arrow-continue clickable animated fadeIn delay-2s' onClick='level1(\"" + concentration + "\")'>Continue &gt;</p>";
        switch(concentration) {
            //WEB APPS
            case "webApps":
                //Title and body content
                newContent += "<h2 class='animated fadeInDown delay-1s'>" + charSelection.webApps.concentration + "</h2>";
                newContent += "<p class='animated fadeIn delay-2s'>" + charSelection.webApps.body + "</p>";
                //Stats
                newContent += statsHTML;
                stat1 = charSelection.webApps.stats[0];
                stat2 = charSelection.webApps.stats[1];
                stat3 = charSelection.webApps.stats[2];
                stat4 = charSelection.webApps.stats[3];
                //Character image
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.webApps.image + "'/>";
                //Arrows
                newContent += arrows;
                break;

            //INTERACTIVE MEDIA
            case "intMedia":
                //Title and body content
                newContent += "<h2 class='animated fadeInDown delay-1s'>" + charSelection.intMedia.concentration + "</h2>";
                newContent += "<p class='animated fadeIn delay-2s'>" + charSelection.intMedia.body + "</p>";
                //Stats
                newContent += statsHTML;
                stat1 = charSelection.intMedia.stats[0];
                stat2 = charSelection.intMedia.stats[1];
                stat3 = charSelection.intMedia.stats[2];
                stat4 = charSelection.intMedia.stats[3];
                //Character image
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.intMedia.image + "'/>";
                newContent += arrows;
                break;

            //DIGITAL COMMERCE
            case "digCommerce":
                //Title and body content
                newContent += "<h2 class='animated fadeInDown delay-1s'>" + charSelection.digCommerce.concentration + "</h2>";
                newContent += "<p class='animated fadeIn delay-2s'>" + charSelection.digCommerce.body + "</p>";
                //Stats
                newContent += statsHTML;
                stat1 = charSelection.digCommerce.stats[0];
                stat2 = charSelection.digCommerce.stats[1];
                stat3 = charSelection.digCommerce.stats[2];
                stat4 = charSelection.digCommerce.stats[3];
                //Character image
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.digCommerce.image + "'/>";
                newContent += arrows;
                break;

            //MASS MEDIA
            case "massMedia":
                //Title and body content
                newContent += "<h2 class='animated fadeInDown delay-1s'>" + charSelection.massMedia.concentration + "</h2>";
                newContent += "<p class='animated fadeIn delay-2s'>" + charSelection.massMedia.body + "</p>";
                //Stats
                newContent += statsHTML;
                stat1 = charSelection.massMedia.stats[0];
                stat2 = charSelection.massMedia.stats[1];
                stat3 = charSelection.massMedia.stats[2];
                stat4 = charSelection.massMedia.stats[3];
                //Character image
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.massMedia.image + "'/>";
                newContent += arrows;
                break;
            default:
                console.error('If you see this, then that means I fucked up somewhere');
                break;
        }

        //Place content onto page
        content.innerHTML = "<div id='charDetail'>" + newContent + "</div>";
        document.querySelectorAll('.yellow')[0].style.width = stat1 + "%";
        document.querySelectorAll('.green')[0].style.width = stat2 + "%";
        document.querySelectorAll('.blue')[0].style.width = stat3 + "%";
        document.querySelectorAll('.red')[0].style.width = stat4 + "%";
    });
}

//Function to load the level 1 page
function level1(concentration) {
    //Fade out the last code
    console.log('Level 1: ' + concentration);
    const lastHTML = document.getElementById('charDetail');
    lastHTML.classList.add('animated', 'fadeOut', 'faster');
    scrollBackground();
    lastHTML.addEventListener('animationend', () => {
        //Get the content element
        const content = document.getElementById('content');
        const arrows = "<p class='arrow-back clickable animated fadeIn delay-2s' onclick='backToStart(\"yearOne\");'>&lt; Go Back</p> <p class='arrow-continue clickable animated fadeIn delay-2s' onClick='level2(\"" + concentration + "\")'>Continue &gt;</p>";

        //Build the new content element
        let newContent = "<div id='yearOne'> <h2 class='animated fadeInDown delay-1s'>Year One</h2>";

        switch(concentration) {
            //WEB APPS
            case "webApps":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.webApps.yearOne + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.webApps.image + "'/>";
                newContent += arrows;
                break;
            case "intMedia":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.intMedia.yearOne + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.intMedia.image + "'/>";
                newContent += arrows;
                break;
            case "digCommerce":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.digCommerce.yearOne + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.digCommerce.image + "'/>";
                newContent += arrows;
                break;
            case "massMedia":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.massMedia.yearOne + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.massMedia.image + "'/>";
                newContent += arrows;
                break;
            default:
                console.error('If you see this, I fucked up...');
        }

        newContent += "<p id='level' class='animated fadeInLeftBig slow'>Level 0</p>";
        newContent += "</div>";
        content.innerHTML = newContent;

        setTimeout(() => {
            let myLevel = document.getElementById('level');
            myLevel.innerHTML = 'Level <span>1</span>';
            myLevel.classList.remove('fadeInLeftBig', 'slow');
            myLevel.classList.add('tada');
        }, 3000);
    });


}

//Function to load the level 2 page
function level2(concentration) {
    //Fade out the last code
    console.log('Level 2: ' + concentration);
    const lastHTML = document.getElementById('yearOne');
    lastHTML.classList.add('animated', 'fadeOut', 'fast');
    scrollBackground();
    lastHTML.addEventListener('animationend', () => {
        //Get the content element
        const content = document.getElementById('content');
        const arrows = "<p class='arrow-back clickable animated fadeIn delay-2s' onclick='backToStart(\"yearTwo\");'>&lt; Go Back</p> <p class='arrow-continue clickable animated fadeIn delay-2s' onClick='level3(\"" + concentration + "\")'>Continue &gt;</p>";

        //Build the new content element
        let newContent = "<div id='yearTwo'> <h2 class='animated fadeInDown delay-1s'>Year Two</h2>";

        switch(concentration) {
            //WEB APPS
            case "webApps":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.webApps.yearTwo + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.webApps.image + "'/>";
                newContent += arrows;
                break;
            case "intMedia":
                newContent += "<h3 class='animated fadeIn delay-2s'>Mini Boss</h3>"
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.intMedia.yearTwo + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.intMedia.image + "'/>";
                newContent += arrows;
                newContent += '<img class="bossglow animated fadeIn delay-1s slower" src="../images/' + capstone.image + '">';
                break;
            case "digCommerce":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.digCommerce.yearTwo + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.digCommerce.image + "'/>";
                newContent += arrows;
                break;
            case "massMedia":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.massMedia.yearTwo + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.massMedia.image + "'/>";
                newContent += arrows;
                break;
            default:
                console.error('If you see this, I fucked up...');
        }
        newContent += "<p id='level' class='animated fadeInLeftBig slow'>Level 1</p>";

        newContent += "</div>";
        content.innerHTML = newContent;

        setTimeout(() => {
            let myLevel = document.getElementById('level');
            myLevel.innerHTML = 'Level <span>2</span>';
            myLevel.classList.remove('fadeInLeftBig', 'slow');
            myLevel.classList.add('tada');
        }, 3000);
    });
}

//Function to load the level 3 page
function level3(concentration) {
    //Fade out the last code
    console.log('Level 3: ' + concentration);
    const lastHTML = document.getElementById('yearTwo');
    lastHTML.classList.add('animated', 'fadeOut', 'fast');
    scrollBackground();
    lastHTML.addEventListener('animationend', () => {
        //Get the content element
        const content = document.getElementById('content');
        const arrows = "<p class='arrow-back clickable animated fadeIn delay-2s' onclick='backToStart(\"yearThree\");'>&lt; Go Back</p> <p class='arrow-continue clickable animated fadeIn delay-2s' onClick='level4(\"" + concentration + "\")'>Continue &gt;</p>";

        //Build the new content element
        let newContent = "<div id='yearThree'> <h2 class='animated fadeInDown delay-1s'>Year Three</h2>";

        switch(concentration) {
            //WEB APPS
            case "webApps":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.webApps.yearThree + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.webApps.image + "'/>";
                newContent += arrows;
                break;
            case "intMedia":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.intMedia.yearThree + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.intMedia.image + "'/>";
                newContent += arrows;
                break;
            case "digCommerce":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.digCommerce.yearThree + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.digCommerce.image + "'/>";
                newContent += arrows;
                break;
            case "massMedia":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.massMedia.yearThree + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.massMedia.image + "'/>";
                newContent += arrows;
                break;
            default:
                console.error('If you see this, I fucked up...');
        }
        newContent += "<p id='level' class='animated fadeInLeftBig slow'>Level 2</p>";

        newContent += "</div>";
        content.innerHTML = newContent;

        setTimeout(() => {
            let myLevel = document.getElementById('level');
            myLevel.innerHTML = 'Level <span>3</span>';
            myLevel.classList.remove('fadeInLeftBig', 'slow');
            myLevel.classList.add('tada');
        }, 3000);
    });
}

//Function to load the level 4 page
function level4(concentration) {
    //Fade out the last code
    console.log('Level 4: ' + concentration);
    const lastHTML = document.getElementById('yearThree');
    lastHTML.classList.add('animated', 'fadeOut', 'fast');
    scrollBackground();
    lastHTML.addEventListener('animationend', () => {
        //Get the content element
        const content = document.getElementById('content');
        const arrows = "<p class='arrow-back clickable animated fadeIn delay-2s' onclick='backToStart(\"yearFour\");'>&lt; Go Back</p> <p class='arrow-continue clickable animated fadeIn delay-2s' onClick='levelBoss(\"" + concentration + "\")'>Continue &gt;</p>";

        //Build the new content element
        let newContent = "<div id='yearFour'> <h2 class='animated fadeInDown delay-1s'>Year Four</h2>";

        switch(concentration) {
            //WEB APPS
            case "webApps":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.webApps.yearFour + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.webApps.image + "'/>";
                newContent += arrows;
                break;
            case "intMedia":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.intMedia.yearFour + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.intMedia.image + "'/>";
                newContent += arrows;
                break;
            case "digCommerce":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.digCommerce.yearFour + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.digCommerce.image + "'/>";
                newContent += arrows;
                break;
            case "massMedia":
                newContent += "<p class='animated fadeIn delay-2s'>" + pageContent.massMedia.yearFour + "</p>";
                newContent += "<p class='animated fadeIn delay-3s'>Your understanding increases... <span>level up!</span></p>";
                newContent += "<img class='animated fadeInLeftBig slow' src='../images/" + charSelection.massMedia.image + "'/>";
                newContent += arrows;
                break;
            default:
                console.error('If you see this, I fucked up...');
        }
        newContent += "<p id='level' class='animated fadeInLeftBig slow'>Level 3</p>";

        newContent += "</div>";
        content.innerHTML = newContent;

        setTimeout(() => {
            let myLevel = document.getElementById('level');
            myLevel.innerHTML = 'Level <span>4</span>';
            myLevel.classList.remove('fadeInLeftBig', 'slow');
            myLevel.classList.add('tada');
        }, 3000);
    });
}

//Function to load the capstone page
function levelBoss(concentration) {
    //Under construction
    console.log("Boss battle incoming: " + concentration);
    const lastHTML = document.getElementById('yearFour');
    lastHTML.classList.add('animated', 'fadeOut', 'fast');
    scrollBackground();
    lastHTML.addEventListener('animationend', () => {
        const content = document.getElementById('content');
        const arrows = "<p class='arrow-back clickable animated fadeIn delay-2s' onclick='backToStart(\"levelBoss\");'>&lt; Go Back</p> <p class='arrow-continue clickable animated fadeIn delay-2s' onClick='theEnd(\"" + concentration + "\")'>Bring it on! &gt;</p>";

        let newContent = '<div id="levelBoss"><h2 class="animated fadeInDown delay-1s">Capstone!</h2><h3 class="animated fadeIn delay-2s">The Final Boss</h3>';
        newContent += '<p class="animated fadeIn delay-3s">' + capstone.explanation + '</p>';

        switch(concentration) {
            case "webApps":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.webApps.image + '">';
                newContent += '<img class="support-1 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.intMedia.image + '">';
                newContent += '<img class="support-2 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.digCommerce.image + '">';
                newContent += '<img class="support-3 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.massMedia.image + '">';
                break;
            case "intMedia":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.intMedia.image + '">';
                newContent += '<img class="support-1 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.webApps.image + '">';
                newContent += '<img class="support-2 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.digCommerce.image + '">';
                newContent += '<img class="support-3 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.massMedia.image + '">';
                break;
            case "digCommerce":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.digCommerce.image + '">';
                newContent += '<img class="support-1 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.webApps.image + '">';
                newContent += '<img class="support-2 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.intMedia.image + '">';
                newContent += '<img class="support-3 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.massMedia.image + '">';
                break;
            case "massMedia":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.massMedia.image + '">';
                newContent += '<img class="support-1 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.webApps.image + '">';
                newContent += '<img class="support-2 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.intMedia.image + '">';
                newContent += '<img class="support-3 animated fadeInLeftBig delay-1s slow" src="../images/' + charSelection.digCommerce.image + '">';
                break;
            default:
                console.error('You get the point.');
                break;
        }
        newContent += "<p id='level' class='animated fadeInLeftBig slow'>Level 4</p>";
        newContent += '<img class="bossglow animated fadeIn delay-1s slower" src="../images/' + capstone.image + '">';
        newContent += arrows;
        newContent += '</div>';
        content.innerHTML = newContent;
    });
}

//Function to load the end HTML
function theEnd(concentration) {
    console.log("You win!");
    const lastHTML = document.getElementById('levelBoss');
    lastHTML.classList.add('animated', 'fadeOut', 'fast');
    scrollBackground();
    lastHTML.addEventListener('animationend', () => {
        const content = document.getElementById('content');
        const arrows = "<p class='arrow-continue-final clickable animated fadeIn delay-2s' onclick='backToStart(\"theEnd\");'>&lt; Play Again</p>";

        let newContent = '<div id="theEnd"><h2 class="animated fadeInDown delay-1s">Your Journey is Complete</h2>';
        newContent += '<p class="animated fadeIn delay-2s">' + ending.text1 + '</p>';
        newContent += '<img class="treasure animated bounceIn delay-3s" src="../images/' + ending.image +'">';
        newContent += '<p class="animated fadeIn delay-2s">' + ending.text2 + '</p>';
        newContent += '<form class="animated fadeIn delay-2s"> <input type="email" name="email" placeholder="Email"> <input id="submit" type="submit" value="Submit"> </form>';

        switch(concentration) {
            case "webApps":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.webApps.image + '">';
                break;
            case "intMedia":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.intMedia.image + '">';
                break;
            case "digCommerce":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.digCommerce.image + '">';
                break;
            case "massMedia":
                newContent += '<img class="animated fadeInLeftBig slow" src="../images/' + charSelection.massMedia.image + '">';
                break;
            default:
                console.error('You know the drill');
                break;
        }

        newContent += "<p id='level' class='animated fadeInLeftBig slow'>Level <span>5</span></p>";
        newContent += '<img class="bossglow animated fadeIn delay-1s slower" src="../images/light.png">';
        newContent += arrows;
        newContent += '</div>';
        content.innerHTML = newContent;

        document.getElementById('submit').addEventListener('click', (event) => {
            event.preventDefault();
            let newForm = '<p><span>You should hear from us soon!</span></p>';
            document.querySelectorAll('form')[0].innerHTML = newForm;
        });
    });
}
