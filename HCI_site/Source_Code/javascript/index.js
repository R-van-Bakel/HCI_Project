// JavaScript source code
$(document).ready(function () {
    $("body").on('submit', function (e) {
        e.preventDefault();
    });

    //$('a').on('click', function (e) {
    //    e.preventDefault();
    //    var pageRef = $(this).attr('href');

    //    callPage(pageRef)

    //});

    //$('#login-btn').on('click', function (e) {
    //    callPage("Homepage.html")
    //});

    //function callPage(pageRefInput) {
    //    $.ajax({
    //        url: pageRefInput,
    //        type: "GET",
    //        success: function (res, status) {
    //            console.log("the request is complete!");
    //            $(".content").html(res);

    //        }
    //    })
    //}

});

var container = document.querySelector('body'),
    //imgs = document.querySelectorAll('img'),
    //textWrapper = document.querySelector('.highlight'),
    content = document.querySelector('.content'),
    defaultTitle = "BabyBreath";

//function updateText(content) {
//    textWrapper.innerHTML = content;
//}

function requestContent(file) {
    $('.content').load(file + ' .content');
}

//function removeCurrentClass() {
//    for (var i = 0; i < imgs.length; i++) {
//        imgs[i].classList.remove('current');
//    }
//}

//function addCurrentClass(elem) {
//    removeCurrentClass();
//    var element = document.querySelector("." + elem);
//    element.classList.add('current');
//}

container.addEventListener('click', function (e) {
    //alert(e.target.nodeName);
    //alert(e.target.getAttribute('class'));
    //alert(e.target.parentNode.nodeName);

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

    // If you click on the button, but not the text of the orange buttons in babydiary
    if (e.target.getAttribute('class') != null) {
        if (e.target.getAttribute('class').split(" ").includes("a-btn")) {
            e.preventDefault();
            if (!window.location.href.includes(e.target.querySelector("a").getAttribute("href"))) {
                var data = e.target.querySelector("a").getAttribute('href'),
                    url = data
                //addCurrentClass(data);
                history.pushState(data, null, url);
                //updateText(data);
                requestContent(url);
                document.title = "BabyBreathe - " + data;
            }
        }
    }

    // If you click on the image in the navigation bar instead of on the bar
    if (e.target.parentNode.nodeName == "A") {
        e.preventDefault();
        if (!window.location.href.includes(e.target.parentNode.getAttribute("href"))) {
            //alert("No reload");
            //alert(e.target);
            var data = e.target.parentNode.getAttribute('href'),
                url = data
            //addCurrentClass(data);
            history.pushState(data, null, url);
            //updateText(data);
            requestContent(url);
            document.title = "BabyBreathe - " + data;
        }
    }
    e.stopPropagation();
}, false);


window.addEventListener('popstate', function (e) {
    var character = e.state;
    
    if (character == null) {
        alert("test");
        //removeCurrentClass();
        //textWrapper.innerHTML = " ";
        content.innerHTML = " ";
        document.title = defaultTitle;
    } else {
        //updateText(character);
        requestContent(character);
        //addCurrentClass(character);
        document.title = "BabyBreathe - " + character;
    }
})




//var app = angular.module("myApp", ["ngRoute"]);
//app.config(function ($routeProvider, $locationProvider) {
//    $routeProvider
//        .when("/Homepage.html", {
//            templateUrl: "/Hompage.html"
//        })
//        .when("/Facts.html", {
//            templateUrl: "/Facts.html"
//        })
//    $locationProvider.html5Mode(true);
//});

function toggleHideElement(element) {
    if ($(element).attr("hidden")) {
        $(element).removeAttr("hidden")
    } else {
        $(element).attr("hidden", true);
    }
}

function postComment() {
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