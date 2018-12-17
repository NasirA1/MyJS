//setup
requirejs.config({
    baseUrl: './lib',
    paths: {
        main: 'main',
        util: 'helpers/util',
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min'
    }
});


//call my utility function
require(['util'], (util)=> {
    console.log('calling util.add(1,5) => ', util.add(1,5));
});


//call jquery via CDN
require(['jquery'], ($) => {
    setInterval(() => $('h1').toggle(1000), 1000);
});


//run main
requirejs(['main']);
