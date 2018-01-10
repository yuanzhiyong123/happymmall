require('./index.css');

var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide=require('page/common/nav-side/index.js');
var templateIndex=require('./index.string');
var page={
    init:function(){
     this.onLoad();   
    },
    onLoad:function(){
        navSide.init({
            name:'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo:function(){
        var userHtml='';
        _user.getUserInfo(function(res){
            userHtml=_mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
}
$(function(){
    page.init();
});
