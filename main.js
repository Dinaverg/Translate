'use strict'

let url = "https://translation.googleapis.com/language/translate/v2"

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
    })
}