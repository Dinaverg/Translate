'use strict'

let searchURL = "https://translate.googleapis.com/translate_a/single"

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const text = $("#translateThis").val()
        const target = $("#target").val()
        translate(text, target)
    })
}

function translate(text, target) {
    const params = {
        client: 'gtx',
        q: text,
        tl: target,
        sl: 'auto',
        dt: 't'
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(rep) {
    $(".results").empty()
    $(".video").empty()
    $("#wikiInfo").empty()
    let word = rep[0][0][0]
    $(".results").append(`<h1>${word.toLowerCase()}</h1>`)
    $(".video").append(`<div class="videoWrapper"><iframe id="ytplayer" type="text/html" width="640" height="360"
    src="https://www.youtube.com/embed?listType=search&list=pronunciation%20of%20${encodeURIComponent(word)}%20"
    frameborder="0"></iframe></div>`)
    definition(word.toLowerCase())
}
//wiktionary
function definition(page) {
    let t = $("#target").val()
    $('#wikiInfo').html('...please wait...');
    $.getJSON(`https://${t}.wiktionary.org/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page=`+ encodeURIComponent(page),
        function(json) {
            showPage(json.parse.text['*'])
        }
    )
}

function showPage(text) {
    let t = $("#target").val()
    //wiktionary uses the same ISO standard to indicate the language of the wiktionary
    let baseURL = `https://${t}.wiktionary.org`
    $('.definition').css('display', 'block')
    $('#wikiInfo').html(text);
    $('#wikiInfo').find('a:not(.references a):not(.extiw):not([href^="#"])').attr('href',
    function() {
        return baseURL + $(this).attr('href');
    })
    //some languages wiktionaries have broken images
    $("img").error(function() {
        $(this).hide();
    })
    .attr("src", "noimage.png");
    //removing undesired parser content
    $('.mw-parser-output').children().not("p, h2, h3, ul, ol, table, dl").css("display", "none")
    //removing other languages after the first
    $('.mw-parser-output hr').nextAll().css("display", "none") 
    $('.mw-parser-output h2:nth-of-type(2)').nextAll().css("display", "none")
    $('.mw-parser-output h2:nth-of-type(2)').css("display", "none")
}


$(watchForm)