$(document).ready(function() {
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    var prefix = "https://cors-anywhere.herokuapp.com/";

    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet); // quoteUrl - link to API // createTweet - function
        $.ajaxSetup({ cache: false });
    /* or use:  function getQuote() {
        $.ajax({
            dataType: "json",
            url: quoteUrl,
            data: null,
            success: createTweet
        }); } */
    }

    function createTweet(response) {
        var data = response[0];

        var quoteText = $(data.content).text().trim();
        var quoteAuthor = data.title;

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }

        var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
        if (tweetText.length > 140) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetText);
            $('.quote').text(quoteText);
            $('.author').text("Author: " + quoteAuthor);
            $('.tweet').attr('href', tweet);
        }
    }
    $(document).ready(function() {
        getQuote();
        $('.new-quote-btn').click(function() {
            getQuote();
        });
    });

});