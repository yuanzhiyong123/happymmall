require('./index.css');
var _mm=require('util/mm.js');
var header={
    //初始化事件
    init:function(){
        this.bindEvent();
        this.onLoad();
    },
    //加载页面搜索关键字回填
    onLoad:function(){
        var keyword=_mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    //绑定事件
    bindEvent:function(){
        var _this=this;
        //搜索按钮点击搜索
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //回车键搜索
        $('#search-input').keyup(function(e){
            if(e.keyCode===13){
                _this.searchSubmit();
            }
           
        });
    },
    searchSubmit:function(){
        var keyword=$.trim($('#search-input').val());
        if(keyword){
            window.location.href='./list.html?keyword='+keyword;
        }else{
            _mm.goHome();
        }
    }
};
header.init();