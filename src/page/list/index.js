require('./index.css');

var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var _product=require('service/product-service.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateIndex=require('./index.string');
var Pagination=require('util/pagination/index.js');
var page={
    data:{
        listParam:{
            keyword:_mm.getUrlParam('keyword')||'',
            categoryId:_mm.getUrlParam('categoryId')||'',
            orderBy:_mm.getUrlParam('orderBy')||'default',
            pageNum:_mm.getUrlParam('pageNum')||1,
            pageSize:_mm.getUrlParam('pageSize')||20
        }
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        this.loadList();
    },
    bindEvent:function(){
        let _this=this;
        $('.sort-item').click(function(){
            _this.data.listParam.pageNum=1;
            if($(this).data('type')==='default'){
                if($(this).hasClass('active')){
                    return;
                }
                $(this).addClass('active').siblings('.sort-item')
                .removeClass('active asc desc');
                _this.data.listParam.orderBy='default';
            }else if($(this).data('type')==='price'){
                $(this).addClass('active').siblings('.sort-item')
                .removeClass('active asc desc');
                if($(this).hasClass('asc')){
                    $(this).removeClass('asc').addClass('desc');
                    _this.data.listParam.orderBy='price_desc';
                }else{
                    $(this).removeClass('desc').addClass('asc');
                    _this.data.listParam.orderBy='price_asc';
                }
            }
            _this.loadList();
        });
    },
    loadList:function(){
        let listParam=this.data.listParam;
        let listHtml='';
        let _this=this;
        _product.getProductList(listParam,function(res){
            listHtml=_mm.renderHtml(templateIndex,{
                list:res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination({
                hasPreviousPage:res.hasPreviousPage,
                prePage:res.prePage,
                hasNextPage:res.hasNextPage,
                nextPage:res.nextPage,
                pageNum:res.pageNum,
                pages:res.pages
            });
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination:function(pageInfo){
        this.pagination?'':(this.pagination=new Pagination());
        this.pagination.render({

        });
    }
};
$(function(){
    page.init();
});