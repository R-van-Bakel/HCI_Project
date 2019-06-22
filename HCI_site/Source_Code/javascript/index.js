// JavaScript source code
$(document).ready(function () {
    $(".factstext").hide();

    $("body").on('submit', function (e) {
        e.preventDefault();
    });
});

function toggleHideElement(element) {
    if ($(element).is(":hidden")) {
        $(element).show();
    } else {
        $(element).hide();
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
        $("#posts").children().last().removeAttr("hidden");
        $("#comment").val("");
    }
}