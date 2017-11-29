<template>
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
    <section class="Hui-article-box">
        <div class="page-container">
            <div class="cl pd-5 bg-1 bk-gray"> 
                <span class="l">
                    <a class="btn btn-primary radius" href="javascript:;" v-on:click="clickAdd()"><i class="Hui-iconfont">&#xe600;</i> 添加管理员
                </a>
                </span> 
            </div>
            <table class="table table-border table-bordered table-hover table-bg">
                <thead>
                    <!-- <tr>
                        <th scope="col" colspan="10">企业管理员</th>
                    </tr> -->
                    <tr class="text-c">
                        <!-- <th width="25"><input type="checkbox" value="" name=""></th> -->
                        <th >姓名</th>
                        <th >电话（账号）</th>
                        <th width="70">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-c"  v-for="item in items">
                        <!-- <td><input type="checkbox" value="" name=""></td> -->
                        <td>{{item.user_name}}</td>
                        <td>{{item.phone}}</td>
                        <td class="f-14">
                            <a title="编辑" href="javascript:;" v-on:click="clickModify(item)"><i class="Hui-iconfont">&#xe6df;</i></a>  
                            <a title="删除" href="javascript:;" class="ml-5" v-on:click="deleteBtn(item.id)"><i class="Hui-iconfont">&#xe6e2;</i></a>
                        </td>
                    </tr>
                </tbody>
            </table> 
            <div id="J-page" class="m-page" v-if="!noData"></div>
            <div class="m-loading" v-if="itemsLoading">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
            <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
        </div>
    </section>
</template>

<style lang="less">

</style>

<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/addCompany.vue";
    let companyManageOps = { 
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
                isShowModifyDialog:false,
                items: [],
                searchInput:'',
                dialogTitle:'添加部门',
                dialogType:'add',
                dialogData:''
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
            clickAdd:function(){
                this.dialogTitle='添加管理员';
                this.dialogType='add';
                this.isShowAddDialog = true;
            },
            clickModify:function(data){
                this.dialogTitle='修改资料';
                this.dialogType='modify';
                this.dialogData=data;
                this.isShowAddDialog = true;
            },
            //初始化分页   
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        companyManageOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = true;
                //修改参数
                companyManageOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.companyadmins,
                    type: 'GET',
                    data:companyManageOps.param
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
            getList:function(){
                //重置第一页
                //companyManageOps.param.page = 1

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal,companyManageOps.param.page)
                });
            },
            //删除
            deleteBtn:function(id){

                layer.confirm('删除须谨慎，确认要删除吗？',(index)=>{

                    if($('tbody tr.text-c').length == 1 && companyManageOps.param.page>1){
                        companyManageOps.param.page--; 
                    }; 
                    
                    $.ajax({
                        url: `${base.gAjaxUrl.companyadmins}${id}/`,
                        type: 'DELETE',
                    })
                    .always((data)=>{
                        layer.msg('删除成功',{icon:1,time:1000});
                        this.getList();
                        
                    })
                });  


            }
        },
        components:{
            add
        }
    }

</script>