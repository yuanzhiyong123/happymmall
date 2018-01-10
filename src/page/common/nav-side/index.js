require('./index.css');
var _mm=require('util/mm.js');
var templateIndex=require('./index.string');

var navSide={
    option:{
        name:'',
        navList:[
            {
                name:'user-center',
                desc:'个人中心',
                href:'./user-center.html'
            },
            {
                name:'order-list',
                desc:'我的订单',
                href:'./order-list.html'
            },
            {
                name:'pass-update',
                desc:'修改密码',
                href:'./pass-update.html'
            },
            {
                name:'about',
                desc:'关于MMall',
                href:'./about.html'
            }
        ]
    },
    init:function(option){
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav:function(){
        var iLength=this.option.navList.length;
        for(var i=0;  i<iLength; i++){
            if(this.option.navList[i].name===this.option.name){
                this.option.navList[i].isActive=true;
            }
        }
        var navHtml=_mm.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
};
module.exports=navSide;