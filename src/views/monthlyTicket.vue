<template>
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" :fitbus="dialogFitBus" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
    <section class="Hui-article-box">
    <div class="page-container">
        <div class="text-l clearfix">
            <input v-model="searchInput" type="text"  placeholder="月票名称" style="width:250px" class="f-l input-text">
            <button v-on:click="getList(1)" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
        </div>
        <div class="cl pd-5 bg-1 bk-gray mt-20"> 
            <span class="l">
                <a class="btn btn-primary radius" href="javascript:;" v-on:click="clickAdd()"><i class="Hui-iconfont">&#xe600;</i> 新增月票
                </a>
            </span> 
        </div>
    <table class="table table-border table-bordered table-hover table-bg table-sort">
        <thead>
            <tr class="text-c">
                <th>月票名称</th>
                <th>价格</th>
                <th>说明</th>
                <th width="150">适用班次</th>
                <th width="70">操作</th>
            </tr>
        </thead>
        <tbody v-if="!noData"> 
            <tr class="text-c" v-for="item in items">
                <td>{{item.ticket_name}}</td>
                <td>{{item.price/100}}</td> 
                <td>{{item.ticket_descp}}</td>
                <td>
                    <div class="btn btn-link size-S radius" v-on:click="clickModifyDate(item)">编辑适用班次</div>
                </td>
                <td class="f-14">
                    <a title="编辑" href="javascript:;" v-on:click="clickModify(item)"><i class="Hui-iconfont">&#xe6df;</i></a>  
                    <a title="删除" href="javascript:;" class="ml-5" v-on:click="deleteBtn(item.id)"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
            </tr>
        </tbody>
    </table>
    <div id="J-page" class="m-page" v-if="!noData"></div>
    <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
    <div class="m-loading" v-if="itemsLoading">
        <div class="cube1"></div>
        <div class="cube2"></div>
    </div>
   </div>
  </section>
</template>

<style lang="less">
.avatar{
    width: 50px;
}
</style>

<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/addBusMonthlyTickets.vue";
    let busMonthlyTicketsOps = {
        param:{
            search:'',
            page:1,
            page_size:10,   
        }
    }

    export default{
        ready () {
            let that = this;

            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal)
            });                 
        },
        data:function(){
            return {
                noData:false,
                itemsLoading:false,
                isShowAddDialog:false,
                items: [],
                searchInput:'',
                dialogTitle:'添加部门',
                dialogType:'add',
                dialogData:'',
                dialogFitBus:'false'
            }
        },
        methods: {
            addDialogClose:function(data){
                this.isShowAddDialog = false;
            },
            addDialogSave:function(data){
                this.isShowAddDialog = false;
                this.getList();
            },
            clickModifyDate:function(data){
                this.dialogTitle='修改资料';
                this.dialogType='modify';
                this.dialogData=data;
                this.dialogFitBus = false;

                this.isShowAddDialog = true;
            },
            clickAdd:function(){
                this.isShowAddDialog = true;
                this.dialogTitle='新增月票';
                this.dialogType='add';
                this.dialogFitBus = true;
            },  
            clickModify:function(data){
                this.dialogTitle='修改资料';
                this.dialogType='modify';
                this.dialogData=data;
                this.isShowAddDialog = true;
                this.dialogFitBus = true;
            },
            //初始化分页   
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        busMonthlyTicketsOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = true;
                //修改参数
                busMonthlyTicketsOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.busmonthlytickets,
                    type: 'GET',
                    data:busMonthlyTicketsOps.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        let resultData = data.results;
                        this.itemsLoading = false;
                        this.items = resultData;
                        if(resultData.length){
                            this.noData = false;
                            //回调
                            callback(data.num_pages);
                        }else{
                            this.noData = true;
                        }
                    });
                })
            },
            //获取列表
            getList:function(reset=0){
                //重置第一页
                if(reset){
                    busMonthlyTicketsOps.param.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal,busMonthlyTicketsOps.param.page)
                });
            },
            //删除
            deleteBtn:function(id){
                let that = this;

                layer.confirm('删除须谨慎，确认要删除吗？',(index)=>{

                    if($('tbody tr.text-c').length == 1 && busMonthlyTicketsOps.param.page>1){
                        busMonthlyTicketsOps.param.page--; 
                    };

                    $.ajax({
                        url: `${base.gAjaxUrl.busmonthlytickets}${id}/`,
                        type: 'DELETE',
                    })
                    .always((data)=>{
                        layer.msg('删除成功',{icon:1,time:1000});
                        that.getList();
                        
                    })
                });  
            }

        },
        components:{
            add
        }
    }
</script>