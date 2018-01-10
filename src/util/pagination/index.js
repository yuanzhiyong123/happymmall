require('./index.css');
let templatePagination = require('./index.string');

let Pagination=function(){
    this.defaultOption={
        container:null,
        pageNum:1,
        pageRange:3,
        onSelectPage:null
    }
};
Pagination.prototype.render=function(userOption){
    this.option=$.extend({},this.defaultOption,userOption);
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    if(this.option.pages<=1){
        return;
    }
    this.option.container.html(this.getPaginationHtml());
}
Pagination.prototype.getPaginationHtml=function(){
    let html='';
    let pageArray=[];
    pageArray.push({
        name:'上一页',
        value:this.option.prePage,
        disabled:!this.option.hasPreviousPage
    });

}



module.exports=Pagination;