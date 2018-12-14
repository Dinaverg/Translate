'use strict'

let searchURL = "https://translation.googleapis.com/language/translate/v2"
let apiKey = "AIzaSyC6dqpJDXX_teG-8LF5k_v8lAqgD9ICxuk"

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

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
        q: text,
        target: target,
        key: apiKey,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    fetch(url, {
        method: 'POST',
        body: {
            q: text
        },
        headers: new Headers()
    })
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




$(watchForm)