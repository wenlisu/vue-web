<template>
    <!-- 添加 -->
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" :buildingid="buildingsId" :buildingslist="buildings" :roomtypeslist="roomTypes" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
    <add_building :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddBuildingDialog" v-on:dialog-close="addBuildingDialogClose" v-on:dialog-save="addBuildingDialogSave"></add_building>

    <!-- 导入 -->
    <imoprt_data :urldata="importData" v-if="isShowImportDialog" v-on:dialog-close="importDialogClose" v-on:dialog-save="importDialogSave"></imoprt_data>

    <section class="Hui-article-box">
        <div class="page-container bgc-f5">
            <div class="panel panel-default radius">
                <div class="panel-body">
                    <span class="f-20 fw-b">楼-宿舍管理</span>
                    <a href="javascript:;" class="btn btn-secondary radius f-r" v-on:click="clickImport()"><i class="Hui-iconfont">&#xe616;</i> 批量导入</a>
                </div>
            </div>
            <div class="mt-10 bgc-fff clearfix">
                <div class="materialclasses bk-gray radius bgc-fff f-l">
                    <div class="materialsTop"><a class="btn btn-primary radius mr-5" href="javascript:;" v-on:click="clickAddBuilding()"><i class="Hui-iconfont">&#xe600;</i>添加楼</a></div>
                    <div class="all clearfix">
                        <span class="fw-b lh-30">全部</span>
                        <a class="btn btn-primary radius f-r" href="javascript:;" v-on:click="clickShowModify()">编辑</a>
                    </div>
                    <ul>
                        <li class="item clearfix" v-for="item in buildings" v-on:click="clickItem(item)">
                            <span class="text-l fw-b name" v-bind:class="[item.index==itemIndex?'curr':'']">{{item.building_name}}</span>
                            <span class="f-r ml-10" v-if="isShowModify">
                                <a class="mr-10" href="javascript:;" v-on:click="clickModifyBuilding(item)"><i class="Hui-iconfont">&#xe6df;</i></a>
                                <a href="javascript:;" v-on:click="deleteBuilding(item)"><i class="Hui-iconfont">&#xe6e2;</i></a>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="materials bk-gray radius bgc-fff">
                    <div class="materialsTop clearfix">
                        <a class="btn btn-primary radius mr-5 f-r" href="javascript:;" v-on:click="clickAdd()"><i class="Hui-iconfont">&#xe600;</i>添加宿舍</a>
                        <!-- <a class="btn btn-primary radius mr-5 f-r" href="javascript:;" v-link="{ name: 'roomtypes'}" data-title="编辑房间类型">编辑房间类型</a> -->
                    </div>
                    <table class="table table-border table-bg table-striped bor-l bor-r">
                        <thead class="text-c">
                            <tr>
                                <th>房间号</th>
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
                                <td>{{item.room_no}}</td>
                                <td>{{item.room_type_vo.type_name}}</td>
                                <td>{{item.room_type_vo.content}}</td>
                                <td>{{item.room_type_vo.bed_num}}</td>
                                <td>{{item.room_type_vo.has_air_conditioning?'有':'无'}}</td>
                                <td>{{item.room_type_vo.has_TV?'有':'无'}}</td>
                                <td>{{item.room_type_vo.has_computer?'有':'无'}}</td>
                                <td>
                                    <a class="mr-10" href="javascript:;" v-on:click="clickModify(item)"><i class="Hui-iconfont">&#xe6df;</i></a>
                                    <a href="javascript:;" title="删除" v-on:click="deleteItem(item)"><i class="Hui-iconfont">&#xe6e2;</i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="J-page" class="m-page" v-show="!noData"></div>
                    <div class="m-loading" v-if="itemsLoading">
                        <div class="cube1"></div>
                        <div class="cube2"></div>
                    </div>
                    <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="less">
    /*.materials{
        position: relative;
    }
    .materialclasses{
        position: absolute;
        top: 0;
        left:0;
        bottom:0;
        width: 198px;
        border: 1px solid #eee;
        overflow: auto;
    }*/
    .materialclasses{
        width: 198px;
        border: 1px solid #eee;
        overflow: auto;
    }
    .materialsTop{
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .materialclasses ul{
        max-height: 450px;
        overflow: auto;
    }
    .materialclasses .item{
        padding: 4px 10px;
        border-bottom: 1px solid #eee;
        text-align: left;
        cursor: pointer;
    }
    .materialclasses .all{
        cursor: default;
        height: 31px;
        border-bottom: 1px solid #eee;
        padding: 4px 10px;
    }
    .materialclasses .all span{
        color: #206afc;
    }
    .materialclasses .item .name{
        line-height: 28px;
    }
    .materialclasses .item .name.curr{
        color: #206afc
    }
    .materialclasses .item.all span{
        line-height: 32px;
        color: #206afc;
    }
    .materials{
        /*padding-left: 200px; */
        overflow:hidden;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/addRoom.vue";
    import add_building from "../components/addBuilding.vue";
    import imoprt_data from "../components/itemImport.vue";

   let itemOps = {
       param:{
           page:1,
           page_size:10,
       }
   }

    export default{
        ready(){
            let that = this;

            // this.queryAjax((tpageToal='4')=>{
            //    this.initPage('#J-page',tpageToal,materialsOps.param.page)
            // });
            this.getBuildingsList();
            this.getRoomTypesList();
        },
        data: function(){
            return{
                noData:false,
                itemsLoading:false,
                isShowAddDialog:false,
                isShowAddBuildingDialog:false,
                isShowImportDialog: false,
                isShowModify: false,
                itemIndex: 0,
                items: [],
                buildings: [],
                buildingsId: '',
                roomTypes: [],
                dialogType:'add',
                dialogTitle:'添加大分类',
                dialogData:{},
                importData: {},
            }
        },
        methods: {
            addDialogClose:function(data){
                this.isShowAddDialog = false;
            },
            addDialogSave:function(data){
                this.isShowAddDialog = false;
                this.isShowModify = false;
                this.getList(this.buildingsId,1);
            },
            addBuildingDialogClose:function(data){
                this.isShowAddBuildingDialog = false;
                this.isShowModify = false;
            },
            addBuildingDialogSave:function(data){
                this.isShowAddBuildingDialog = false;
                this.isShowModify = false;
                this.getBuildingsList();
                this.getRoomTypesList();
            },
            importDialogClose:function(data){
                this.isShowImportDialog = false;
            },
            importDialogSave:function(data){
                this.isShowImportDialog = false;
                this.getBuildingsList();
                this.getRoomTypesList();
                this.noData = false;
            },
            clickAdd:function(){
                if(this.buildings.length == 0){
                    layer.msg('请先添加宿舍楼',{icon:2,time:1000});
                    return;
                }
                if(this.roomTypes.length == 0){
                    layer.msg('请先添加房间类型',{icon:2,time:1000});
                    return;
                }
                this.isShowAddDialog = true;
                this.dialogTitle = '添加宿舍';
                this.dialogType='add';
            },
            clickModify:function(item){
                this.isShowAddDialog = true;
                this.dialogTitle = '修改宿舍';
                this.dialogType = 'modify';
                this.dialogData = item;
            },
            clickAddBuilding:function(){
                this.isShowAddBuildingDialog = true;
                this.dialogType='add';
                this.dialogTitle='添加宿舍楼';
            },
            clickModifyBuilding:function(data){
                this.isShowAddBuildingDialog = true;
                this.dialogType='modify';
                this.dialogTitle='修改宿舍楼';
                this.dialogData=data;
            },
            deleteBuilding:function(data){
                let that = this;
                
                layer.confirm(
                    `确定要删除宿舍楼：${data.building_name}及其包含的宿舍列表吗？`, 
                    {
                        title: '删除宿舍楼'
                    },
                    (index)=>{
                        $.ajax({
                            url: `${base.gAjaxUrl.buildings}${data.id}/`,
                            type: 'DELETE',
                        })
                        .always((data)=>{
                            if(!data){
                                layer.msg('删除成功',{icon:1,time:1000});
                                that.getBuildingsList();
                                that.isShowModify = false;
                            }else{
                                base.ajaxCallback(data,()=>{
                                    this.getList(this.buildingsId);
                                    that.isShowDelete = false;
                                });
                            }
                        });
                    },
                    ()=>{
                        that.isShowModify = false;
                    }
                );
            },
            //显示或隐藏材料类型按钮
            clickShowModify:function(){
                if(this.buildings.length == 0){
                    layer.msg('请先添加宿舍楼',{icon:2,time:1000});
                    return;
                }
                this.isShowModify = !this.isShowModify;
            },
            clickItem:function(item){
                this.itemIndex = item.index;
                this.buildingsId = item.id;
                this.getList(this.buildingsId,1);
            },
            //批量导入
            clickImport:function(){
                this.isShowImportDialog = true;
                this.importData.importUrl = base.gAjaxUrl.roomsImport;
                this.importData.templateUrl = 'http://eqixing.oss-cn-shenzhen.aliyuncs.com/rooms_import.xlsx';
            },
            //初始化分页
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        itemOps.param.page = p;
                        this.queryAjax(this.buildingsId);
                    }
                });
            },
            //获取宿舍列表
            getList:function(id=this.buildingsId,reset=0){
                let that = this;
                //重置第一页
                if(reset){
                    itemOps.param.page = 1
                }
                this.queryAjax(id,(tpageToal='4')=>{
                    that.initPage('#J-page',tpageToal,itemOps.param.page)
                });
            },
            queryAjax:function(id=this.buildingsId,callback=function(){}){
                //修改参数
                this.itemsLoading = true;

                $.ajax({
                    url: `${base.gAjaxUrl.buildings}${id}/rooms/`,
                    type: 'GET',
                    data: itemOps.param
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
            //获取宿舍楼列表
            getBuildingsList:function(callback=function(){}){
                let ajaxData = {
                    param:{
                        page:1,
                        page_size:1000,
                    }
                }
                $.ajax({
                    url: base.gAjaxUrl.buildings,
                    type: 'GET',
                    data: ajaxData.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.itemsLoading = false;
                        let resultData = data.results;
                        for(let i=0; i<resultData.length; i++){
                            resultData[i].index = i;
                        }
                        this.buildings = resultData;
                        
                        if(resultData && resultData.length){
                            this.buildingsId = resultData[0].id;
                            this.noData = false;
                            //回调
                            //callback();
                            this.getList(this.buildingsId);
                        }else{
                            this.noData = true;
                        }
                    });
                })
            },
            //获取房间类型列表
            getRoomTypesList:function(){
                $.ajax({
                    url: base.gAjaxUrl.roomtypes,
                    type: 'GET',
                    data: {
                        page_size:1000,
                    }
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.itemsLoading = false;
                        let resultData = data.results;
                        this.roomTypes = resultData;
                    });
                })
            },
            //删除
            deleteItem:function(item){
                let that = this;

                layer.confirm(
                    '删除须谨慎，确认要删除吗？',
                    (index)=>{
                        if($('tbody tr.text-c').length == 1 && itemOps.param.page>1){
                            itemOps.param.page--;
                        };
                        $.ajax({
                            url: `${base.gAjaxUrl.rooms}${item.id}/`,
                            type: 'DELETE',
                        })
                        .always((data)=>{
                            if(!data){
                                layer.msg('删除成功',{icon:1,time:1000});
                                this.getList(this.buildingsId,1);
                                that.isShowDelete = false;
                            }else{
                                base.ajaxCallback(data,()=>{
                                    this.getList(this.buildingsId,1);
                                    that.isShowDelete = false;
                                });
                            }
                        })
                    },
                    ()=>{
                        that.isShowDelete = false;
                    }
                );
            },
        },
        components: {
            add,
            add_building,
            imoprt_data
        }
    }
</script>