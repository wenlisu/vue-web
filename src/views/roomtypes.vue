<template>
    <!-- 添加 -->
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>

    <section class="Hui-article-box">
        <div class="page-container bgc-f5">
            <div class="panel panel-default radius">
                <div class="panel-body f-20 fw-b">房间类型管理</div>
            </div>
            <div class="bk-gray radius mt-10 bgc-fff">
                <div class="pd-15 clearfix">
                    <span class="f-r">
                        <a class="btn btn-primary radius mr-5" href="javascript:;" v-on:click="clickAdd()"><i class="Hui-iconfont">&#xe600;</i> 添加房间类型</a>
                    </span>
                    <!-- <div class="text-l clearfix f-r mr-15">
                        <input v-model="searchInput" type="text"  placeholder="名字/工号/手机号" style="width:250px" class="f-l input-text">
                        <button v-on:click="getList(1)" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
                    </div> -->
                </div>
                <table class="table table-border table-bg table-striped">
                    <thead class="text-c">
                        <tr>
                            <th>房间类型</th>
                            <th>容纳人数</th>
                            <th>几床</th>
                            <th>空调</th>
                            <th>电视</th>
                            <th>电脑</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-c" v-for="item in items">
                            <td>{{item.type_name}}</td>
                            <td>{{item.content}}</td>
                            <td>{{item.bed_num}}</td>
                            <td>{{item.has_air_conditioning? '有': '无';}}</td>
                            <td>{{item.has_TV? '有': '无';}}</td>
                            <td>{{item.has_computer? '有': '无';}}</td>
                            <td>
                                <a class="mr-10" href="javascript:;" v-on:click="clickModify(item)"><i class="Hui-iconfont">&#xe6df;</i></a>
                                <a title="删除" href="javascript:;" class="ml-5" v-on:click="deleteItem(item.id)"><i class="Hui-iconfont">&#xe6e2;</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="J-page" class="m-page" v-show="!noData"></div>
                <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
                <div class="m-loading" v-if="itemsLoading">
                    <div class="cube1"></div>
                    <div class="cube2"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="less" scoped>
    .bgc-f5{
        background-color: #f5f5f5;
    }
    .fw-b{
        font-weight: bold;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/addRoomtype.vue";

    let itemOps = {
        param:{
            //search:'',
            page:1,
            page_size:10,
        }
    }

    export default{
        ready(){
            let that = this;
            itemOps.param.page = 1;

            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal,itemOps.param.page)
            });
        },
        data: function(){
            return{
                noData:false,
                itemsLoading:false,
                isShowAddDialog:false,
                isShowImportDialog:false,
                items: [],
                searchInput:'',
                dialogTitle:'添加房间类型',
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
                this.dialogType='add';
                this.dialogTitle='添加房间类型';
                this.isShowAddDialog = true;
            },
            clickModify:function(item){
                this.dialogType='modify';
                this.dialogTitle='修改房间类型';
                this.dialogData=item;
                this.isShowAddDialog = true;
            },
            //初始化分页
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        itemOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            //获取列表
            getList:function(reset=0){
                let that = this;
                //重置第一页
                if(reset){
                    itemOps.param.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    that.initPage('#J-page',tpageToal,itemOps.param.page)
                });
            },
            queryAjax:function(callback=function(){}){
                //修改参数
                this.itemsLoading = true;
                //itemOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.roomtypes,
                    type: 'GET',
                    data:itemOps.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.itemsLoading = false;
                        let resultData = data.results;
                        this.items = resultData;
                        if(resultData && resultData.length){
                            this.noData = false;
                            //回调
                            callback(data.num_pages);
                        }else{
                            this.noData = true;
                        }
                    });
                })
            },
            //删除
            deleteItem:function(id){
                let that = this;

                layer.confirm('删除须谨慎，确认要删除吗？',(index)=>{

                    if($('tbody tr.text-c').length == 1 && itemOps.param.page>1){
                        itemOps.param.page--; 
                    }; 

                    $.ajax({
                        url: `${base.gAjaxUrl.roomtypes}${id}/`,
                        type: 'DELETE',
                    })
                    .always((data)=>{  
                            layer.msg('删除成功',{icon:1,time:1000});
                            that.getList();
                        
                    })
                });  
            },

        },
        components: {
            add,
        }
    }
</script>