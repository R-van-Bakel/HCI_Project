// JavaScript source code
$(document).ready(function () {

    // This function prevents the default action of any submit button of the application from taking place.
    $("body").on('submit', function (e) {
        e.preventDefault();
    });

});

// Some of the following functions use the history API. The histoy API is supported by (almost) all modern browsers and allows developers to turn a regular web application into a single page application,
// whilst also updating the browsing context appropriately, in order to solve the broken back-button problem.

// These variables are used during the process of rendering a new page.
var container = document.querySelector('body'),
    content = document.querySelector('.content'),
    defaultTitle = "BabyBreath";

// This function is used during the process of rendering a new page.
function requestContent(file) {
    $('.content').load(file + ' .content');
}

// This functions uses the history API.
// Once the our application is opened, the first page that is loaded (the entry point) should be added to the browsing context's history, otherwise this page won't propperly load after using the back-button.
// This function works on all pages. Because of this and the fact that every page has its own propper HTML file, every page on application could be used a valid entry point for the application.
window.onload = function () {
    var filename = window.location.href.split("/")[window.location.href.split("/").length-1];
    var data = filename,
        url = data
    history.pushState(data, null, url);
}

// This functions uses the history API.
// This function allows us to override the functionality of any internal links clicked, so no page reload will occur within the application.
container.addEventListener('click', function (e) {

    // If you click on the navigation bar
    if (e.target.nodeName == "A") {
        e.preventDefault();
        if (e.target != window.location.href) {
            var data = e.target.getAttribute('href'),
                url = data
            //addCurrentClass(data);
            history.pushState(data, null, url);
            //updateText(data);
            requestContent(url);
            document.title = "BabyBreathe - " + data;
        }
    }

    // If you click on the orange button, the text (link) within it in the babydiary pages.
    if (e.target.getAttribute('class') != null) {
        if (e.target.getAttribute('class').split(" ").includes("a-btn")) {
            e.preventDefault();
            if (!window.location.href.includes(e.target.querySelector("a").getAttribute("href"))) {
                var data = e.target.querySelector("a").getAttribute('href'),
                    url = data
                history.pushState(data, null, url);
                requestContent(url);
                document.title = "BabyBreathe - " + data;
            }
        }
    }

    // If you click on an image in the navigation bar instead of on the bar.
    if (e.target.parentNode.nodeName == "A") {
        e.preventDefault();
        if (!window.location.href.includes(e.target.parentNode.getAttribute("href"))) {
            var data = e.target.parentNode.getAttribute('href'),
                url = data
            history.pushState(data, null, url);
            requestContent(url);
            document.title = "BabyBreathe - " + data;
        }
    }
    e.stopPropagation();
}, false);

// This functions uses the history API.
// Once the backbutton is pressed, the application should propperly load the previous page and update its browsing context .
window.addEventListener('popstate', function (e) {
    var character = e.state;
    
    if (character == null) {
        content.innerHTML = " ";
        document.title = defaultTitle;
    } else {
        requestContent(character);
        document.title = "BabyBreathe - " + character;
    }
})

// This function can be used in the onclick attribute of any HTML element in the application, in order to make it hide one or multiple elements, using their class, node name or id.
function toggleHideElement(element) {
    if ($(element).attr("hidden")) {
        $(element).removeAttr("hidden")
    } else {
        $(element).attr("hidden", true);
    }
}

// This function is used to post a message in a chat. Currently, these messages won't be saved, since no database is used to store such data.
function postComment() {
    // This first part of the function will replace any occurance of the carraige return character (\r), line feed character (\n) and their combination (\r\n) with an HTML line break <br />.
    // This way any new lines typed in the textarea of the chat page (only public chat has been implemented) will be preserved when the message is posted.
    var comment = $("#comment").val();
    while (comment.includes("\r\n")) {
        comment = comment.replace("\r\n", "<br />");
    }
    while (comment.includes("\r")) {
        comment = comment.replace("\r", "<br />");
    }
    while (comment.includes("\n")) {
        comment = comment.replace("\n", "<br />");
    }

    if (comment.length == 0) {
        alert("You can't post an empty message.");
    }
    else if (comment.length > 500) {
        alert("Your message may not exceed 500 characters.");
    }
    else {
        var $button = $('#comment-template').clone();
        $button.children().last().children().last().html(comment);
        $("#posts").append($button);
        $("#posts").children().last().removeAttr("id");
        $("#posts").children().last().removeAttr("hidden");
        $("#comment").val("");
    }
}