<template>
    
    <!-- 添加 -->
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
    <!-- 导入 -->
    <imoprt-data v-if="isShowImportDialog" v-on:dialog-close="importDialogClose" v-on:dialog-save="importDialogSave"></imoprt-data>
    <section class="Hui-article-box">
    <div class="page-container"> 
        <div class="text-l clearfix">
            关键字：
            <input v-model="searchInput" type="text"  placeholder="姓名/工号/电话" style="width:250px" class="input-text">
            <button v-on:click="getList()" class="btn btn-success" type="button"><i class="Hui-iconfont">&#xe665;</i></button>
        </div>
        <div class="cl pd-5 bg-1 bk-gray mt-20"> 
            <span class="l">
                <a class="btn btn-primary radius mr-5" href="javascript:;" v-on:click="clickAdd()"><i class="Hui-iconfont">&#xe600;</i> 添加司机
                </a>
            </span> 
        </div>
        <table class="table table-border table-bordered table-hover table-bg table-sort">
            <thead>
                <tr class="text-c">
                    <!-- <th width="25"><input type="checkbox" value="" name=""></th> -->
                    <th width="50">头像</th>
                    <th width="100">姓名/性别</th>
                    <th >部门/职位</th>
                    <th width="70">工号</th>
                    <th width="150">电话</th>
                    <th width="50">是否上班</th>
                    <th width="50">是否锁定</th> 
                    <th width="70">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-c" v-for="item in items">
                    <!-- <td><input type="checkbox" value="" name="">{{item.avatar}}</td> -->
                    <td><img class="avatar" v-bind:src="item.staff_vo.avatar?item.avatar:'./src/assets/images/avatar-default.jpg'"/></td>
                    <td>{{item.staff_vo.real_name}}/{{item.staff_vo.sex == 1 ? '男':'女'}}</td>
                    <td>{{item.staff_vo.department_vo.department_name}}/{{item.staff_vo.position}}</td>
                    <td>{{item.staff_vo.job_number}}</td>
                    <td>{{item.staff_vo.phone}}</td>
                    <td>{{item.is_on_duty ? '是' : '否'}}</td>
                    <td><img v-bind:src="item.locked?'./src/assets/images/lock_close.png':'./src/assets/images/lock_open.png'" v-on:click="toggleLock(item)"></td> 
                    <td class="f-14">
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
import add from "../components/addDriver.vue";

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
                this.initPage('#J-page',tpageToal)
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
            clickAdd:function(){
                this.dialogType='add';
                this.dialogTitle='添加司机';
                this.isShowAddDialog = true;
            },
            clickModify:function(data){ 
                this.dialogTitle='修改资料';
                this.dialogType='modify';
                this.dialogData=data;
                this.isShowAddDialog = true;
            },
            toggleLock:function(officialcarDriver) {
                var url
                if (officialcarDriver.locked) {
                    // 解锁
                    url = base.gAjaxUrl.officialcardrivers+officialcarDriver.id+'/unlock/'
                } else {
                    // 锁定
                    url = base.gAjaxUrl.officialcardrivers+officialcarDriver.id+'/lock/'
                }
                $.ajax({
                    url: url,
                    type: 'GET'
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        officialcarDriver.locked = data.locked
                    });
                })
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
                this.itemsLoading = true; 
                //修改参数
                staffsOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.officialcardrivers,
                    type: 'GET',
                    data:staffsOps.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.itemsLoading = false; 
                        let resultData = data.results;
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
                let that = this;
                //重置第一页
                if(reset){
                    staffsOps.param.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    that.initPage('#J-page',tpageToal,staffsOps.param.page)
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
                        url: `${base.gAjaxUrl.officialcardrivers}${id}/`,
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
