require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm=require('util/mm.js');
var _product=require('service/product-service.js');
var _cart=require('service/cart-service.js');
var templateIndex=require('./index.string');

let page={
    data:{
        productId:_mm.getUrlParam('productId')||''
    },
    init:function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad:function(){
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent:function(){
        $(document).on('mouseenter','.p-img',function(){
            let src=$(this).attr('src');
            $(document).find('.main-img').attr('src',src);
        });
        $(document).on('click','.p-count-btn',function(){
            let min=1;
            let $input=$('.p-count');
            let count=parseInt($input.val());
            // console.log(111);
            if($(this).hasClass('plus')){
                count++;
                console.log(count);
                $input.val(count);
            }else{
                if(count<=min){
                    return;
                }
                count--;
                $input.val(count);
            }
        });
    },
    loadDetail:function(){
        let html='';
        let _this=this;
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res);
            html=_mm.renderHtml(templateIndex,res);
            $('.page-wrap').html(html);
        },function(){
            $('.page-wrap').html('<p class="err-tip">此商品太淘气找不到了~</p>');
        });
    },
    filter:function(data){
        data.subImages=data.subImages.split(',');
    }
};
$(function(){
    page.init();
});