require('./index.css');

var _mm=require('util/mm.js');
var bannerTemplate=require('./banner.string');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
$(function(){
    let bannerHtml=_mm.renderHtml(bannerTemplate);
    $('.banner-con').html(bannerHtml);
    console.log($('.banner'));
    var unslider=$('.banner').unslider({
        dots:true
    });
    $('.banner-arrow').click(function() {
        var fn = this.className.split(' ')[1];

        //  Either do unslider.data('unslider').next() or .prev() depending on the className
        unslider.data('unslider')[fn]();
    });
});


