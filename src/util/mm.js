'use strict'
var Hogan=require('hogan');
var conf={
    serverHost:''
}
var _mm={
    request:function(param){
        var _this=this; //ajax内访问不到this
        
        $.ajax({
            type:param.method||'get',
            url :param.url||'',
            dataType:param.type||'json',
            data:param.data||'',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success:function(res){
                if(res.status===0){
                    typeof param.success==='function'&&param.success(res.data,res.msg);
                }else if(res.status===10){
                    _this.doLogin();
                }else if(res.status===1){
                    typeof param.error==='function'&&param.error(res.msg);
                }
            },
            error:function(err){
                // console.log(err);
                typeof param.error==='function'&&param.error(err.statusText);
            }
        });
    },
    doLogin:function(){
        window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
    },
    //
    getServerUrl:function(path){
        return conf.serverHost+path;
    },
    //happymmall.com/product/list?keyword=xxx
    getUrlParam:function(name){
        var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result=window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]):null;
    },
    renderHtml:function(htmlTemplate,data){
        var template=Hogan.compile(htmlTemplate),
            result=template.render(data);
            return result;
    },
    //成功提示
    successTips:function(mes){
        alert(mes||'操作成功')
    },
    errorTips:function(mes){
        alert(mes||'哪里错了吧~~')
    },
    //字段验证 支持是否为空，手机，邮箱
    validate:function(value,type){
        var value=$.trim(value);
        //非空验证
        if('require'===type){
            return !!value;
        }
        //
        if(type==='phone'){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if(type==='email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    goHome:function(){
        window.location.href='./index.html';
    }
}
module.exports=_mm;