<template>

    <!-- 添加 -->
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
    <!-- 导入 -->
    <imoprt-data v-if="isShowImportDialog" v-on:dialog-close="importDialogClose" v-on:dialog-save="importDialogSave"></imoprt-data>
    <section class="Hui-article-box">
    <div class="page-container">
        <div class="text-l clearfix">
            <input v-model="searchInput" type="text"  placeholder="车牌" style="width:250px" class="f-l input-text">
            <button v-on:click="getList()" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
        </div>
        <div class="cl pd-5 bg-1 bk-gray mt-20">
            <span class="l">
                <a class="btn btn-primary radius mr-5" href="javascript:;" v-on:click="clickAdd()"><i class="Hui-iconfont">&#xe600;</i> 添加车辆
                <!-- <a href="javascript:;" class="btn btn-secondary radius" v-on:click="isShowImportDialog = true"><i class="Hui-iconfont">&#xe616;</i> 批量导入</a> -->
                </a>
            </span>
        </div>
        <table class="table table-border table-bordered table-hover table-bg table-sort">
            <thead>
                <tr class="text-c">
                    <!-- <th width="25"><input type="checkbox" value="" name=""></th> -->
                    <th width="70">车牌</th>
                    <th >品牌</th>
                    <th>型号</th>
                    <th width="50">颜色</th>
                    <th width="50">座位数</th>
                    <th width="100">类型</th>
                    <th width="200">备注</th>
                    <th width="70">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-c" v-for="item in items">
                    <!-- <td><input type="checkbox" value="" name="">{{item.avatar}}</td> -->
                    <td>{{item.car_no}}</td>
                    <td>{{item.car_brand}}</td>
                    <td>{{item.car_model}}</td>
                    <td>{{item.car_color}}</td>
                    <td>{{item.seats}}</td>
                    <td>{{item.car_type}}</td>
                    <td>{{item.remark}}</td>
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
import add from "../components/addBusVehicle.vue";
/*import imoprtData from "../components/batchImport.vue";*/

    let staffsOps = {
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
                this.initPage('#J-page',tpageToal,staffsOps.param.page)
            });

        },
        data:function(){
            return {
                noData:false,
                itemsLoading:false, 
                isShowAddDialog:false,
                isShowImportDialog:false,
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
            importDialogClose:function(data){
                this.isShowImportDialog = false;
            },
            importDialogSave:function(data){
                this.isShowImportDialog = false;
                this.getList();
            },
            clickAdd:function(){
                this.dialogType='add';
                this.dialogTitle='添加车辆';
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
                        staffsOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                //修改参数
                this.itemsLoading = true;
                staffsOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.shuttlebusvehicles,
                    type: 'GET',
                    data:staffsOps.param
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
                // staffsOps.param.page = 1

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal,staffsOps.param.page)
                });
            },
            //删除
            deleteBtn:function(id){
                let that = this;
                layer.confirm('删除须谨慎，确认要删除吗？',(index)=>{

                    if($('tbody tr.text-c').length == 1 && staffsOps.param.page>1){
                        staffsOps.param.page--;
                    };

                    $.ajax({
                        url: `${base.gAjaxUrl.shuttlebusvehicles}${id}/`,
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
            /*imoprtData*/
        }
    }
</script>

