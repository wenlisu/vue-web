<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content">
        <div class="bk-gray radius mt-10">
            <div class="text-l clearfix f-l pd-15">
                <input v-model="searchInput" type="text"  placeholder="名字/工号/手机号" style="width:250px" class="f-l input-text">
                    <button v-on:click="getList(1)" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
            </div>
            <table class="table table-border table-bg table-striped table-hover table-pointer">
                <thead class="text-c">
                    <tr>
                        <th>姓名/性别</th>
                        <th>部门/职位</th>
                        <th>工号</th>
                        <th>电话</th>
                    </tr>
                </thead>
                <tbody class="text-c">
                    <tr v-for="item in items" v-on:click="clickItem(item)">
                        <td>{{item.real_name}}/{{item.sex==1? '男': '女';}}</td>
                        <td>{{item.department_vo.department_name}}/{{item.position}}</td>
                        <td>{{item.job_number}}</td>
                        <td>{{item.phone}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
            <div class="m-loading" v-if="itemsLoading">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
        </div>
        <div id="J-page" class="m-page" v-if="!noData"></div>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
</div>
<div class="layui-layer-shade"></div>

<!-- 添加 -->
<add :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
</template>

<style lang="less">
    .table-pointer tr{
        cursor: pointer;
    }
</style>
<script>
import * as base from '../assets/js/base.js';
import add from "../components/choiceRoom.vue";

    let repairOps = {
        param:{
            search:'',
            page:1,
            page_size:10,
        }
    }

    export default{
        ready () {
            let that = this;
            let ajaxUrl = '';
            let ajaxType = '';
            let getData = this.data;

            base.verticalCenter('.layui-modify');

            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal,repairOps.param.page)
            });

        },
        props: ['title','type','data'],
        data:function(){
            return {
                noData:false,
                itemsLoading:false,
                isShowAddDialog:false,
                items: [],
                searchInput: '',
                dialogTitle:'选择房间',
                dialogType:'',
                dialogData:''
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            // save:function(){
            //     let that = this;
            //     let ajaxAddData = {
            //         staffs: this.selectRepairmen,
            //     };
            //     $.ajax({
            //         url: base.gAjaxUrl.addRepairmen,
            //         type:'POST',
            //         contentType: 'application/json',
            //         data: JSON.stringify(ajaxAddData),
            //     })
            //         .always(function(data) {
            //             base.ajaxCallback(data,function(){
            //                 layer.msg('提交成功',{icon:1,time:1000});
            //                 that.$dispatch('dialog-save');
            //             });
            //         });
            // },
            addDialogClose:function(data){
                this.isShowAddDialog = false;
            },
            addDialogSave:function(data){
                this.isShowAddDialog = false;
                //this.getList();
            },
            clickItem:function(item){
                this.dialogTitle='选择房间';
                this.dialogType='choice';
                this.dialogData = item;
                this.isShowAddDialog = true;
            },
            //初始化分页
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        repairOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            //获取列表
            getList:function(reset=0){
                let that = this;
                //重置第一页
                if(reset){
                    repairOps.param.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    that.initPage('#J-page',tpageToal,repairOps.param.page)
                });
            },
            queryAjax:function(callback=function(){}){
                //修改参数
                this.itemsLoading = true;
                repairOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.staffs,
                    type: 'GET',
                    data:repairOps.param
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
        },
        components: {
            add,
        }
    }
</script>
