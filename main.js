'use strict'

let searchURL = "https://translate.googleapis.com/translate_a/single"
let apiKey = "AIzaSyC6dqpJDXX_teG-8LF5k_v8lAqgD9ICxuk"

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function watchForm() {
    listLangs()
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

function displayResults(rep) {
    $(".results").empty()
    console.log(rep[0][0][0]);
    let word = rep[0][0][0]
    $(".results").append(`<h2>${word}</h2>`)
}

function listLangs() {
    let drop = ''

    $.each(langs, (name, value) => drop += `<option value='${value}'>${name}</option>`)
    $("select").append(drop)
}

$(watchForm)

let langs = {
Afrikaans:	'af',
Albanian:	'sq',
Amharic:	'am',
Arabic	:'ar',
Armenian:	'hy',
Azerbaijani:	'az',
Basque	:'eu',
Belarusian:	'be',
Bengali	:'bn',
Bosnian:	'bs',
Bulgarian:	'bg',
Catalan	:'ca',
Cebuano	:'ceb',
'Chinese (Simplified)':	'zh-CN',
'Chinese (Traditional)': 'zh-TW',
Corsican: 'co',
Croatian: 'hr',
Czech:	'cs',
Danish:	'da',
Dutch: 'nl',
English: 'en',
Esperanto: 'eo',
Estonian: 'et',
Finnish: 'fi',
French: 'fr',
Frisian	:'fy',
Galician:	'gl',
Georgian:	'ka',
German:	'de',
Greek: 'el',
Gujarati:	'gu',
'Haitian Creole': 'ht',
Hausa	:'ha',
Hawaiian:	'haw',
Hebrew:	'he',
Hindi	:'hi',
Hmong	:'hmn', 
Hungarian:	'hu',
Icelandic:	'is',
Igbo:	'ig',
Indonesian:	'id',
Irish:	'ga',
Italian:	'it',
Japanese:	'ja',
Javanese:	'jw',
Kannada:	'kn',
Kazakh:	'kk',
Khmer	:'km',
Korean:	'ko',
Kurdish:	'ku',
Kyrgyz	:'ky',
Lao	:'lo',
Latin:	'la',
Latvian:	'lv',
Lithuanian:	'lt',
Luxembourgish:	'lb',
Macedonian:	'mk',
Malagasy	:'mg',
Malay	:'ms',
Malayalam:	'ml',
Maltese:	'mt',
Maori	:'mi',
Marathi	:'mr',
Mongolian	:'mn',
Myanmar:	'my',
Nepali:	'ne',
Norwegian:	'no',
Nyanja:	'ny',
Pashto	:'ps',
Persian:	'fa',
Polish:	'pl',
Portuguese :	'pt',
Punjabi	:'pa',
Romanian:	'ro',
Russian	:'ru',
Samoan:	'sm',
'Scots Gaelic':	'gd',
Serbian	:'sr',
Sesotho:	'st',
Shona	:'sn',
Sindhi:	'sd',
Sinhala: 'si',
Slovak:	'sk',
Slovenian:	'sl',
Somali	:'so',
Spanish	:'es',
Sundanese:	'su',
Swahili	:'sw',
Swedish	:'sv',
Tagalog:	'tl',
Tajik:	'tg',
Tamil:	'ta',
Telugu	:'te',
Thai	:'th',
Turkish	:'tr',
Ukrainian:	'uk',
Urdu:	'ur',
Uzbek	:'uz',
Vietnamese:	'vi',
Welsh	:'cy',
Xhosa	:'xh',
Yiddish:	'yi',
Yoruba	:'yo',
Zulu	:'zu'
}
