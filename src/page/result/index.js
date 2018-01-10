require('./index.css');
require('page/common/nav-simple/index.js');
var _mm=require('util/mm.js');

$(function(){
    var type=_mm.getUrlParam('type')||'default';
    $('.'+type+'-success').show();
})