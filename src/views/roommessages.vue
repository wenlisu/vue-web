<template>
    <!-- 编辑房间 -->
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" :buildingid="buildingsId" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose"></add>

    <section class="Hui-article-box">
        <div class="page-container bgc-f5">
            <div class="panel panel-default radius">
                <div class="panel-body">
                    <span class="f-20 fw-b">房务信息</span>
                </div>
            </div>
            <div class="panel radius mt-10 bgc-e5">
                <div class="panel-body">
                    <div class="clearfix">
                        <span class="f-18 fw-b mr-10">{{buildingName}}</span>
                        <span class="f-r btn radius full cursor-d">满房：{{currBuilding.room_info?currBuilding.room_info.full_cnt:0}}间</span>
                        <span class="f-r btn radius notfull cursor-d">未满：{{currBuilding.room_info?currBuilding.room_info.not_full_cnt:0}}间</span>
                        <span class="f-r btn radius cursor-d">空房：{{currBuilding.room_info?currBuilding.room_info.empty_cnt:0}}间</span>
                    </div>
                    <div>
                        <span class="type" v-for="item in currBuilding.type_info"><i class="Hui-iconfont">&#xe619;</i>{{item.type_name}}：{{item.cnt}}间</span>
                    </div>
                </div>
            </div>
            <div class="mt-10 clearfix radius">
                <div class="materialclasses bgc-fff f-l">
                    <ul>
                        <li class="item" v-for="item in buildings" v-bind:class="[item.index==itemIndex?'curr':'']" v-on:click="clickItem(item)">
                            <span class="text-c fw-b name">{{item.building_name}}</span>
                        </li>
                    </ul>
                    <div class="bgc-fff minh-411" v-if="buildings.length == 0"></div>
                </div>
                <div class="overf-h pl-10">
                    <div class="bgc-fff clearfix pt-1 minh-411">
                        <ul class="clearfix">
                            <li class="roomItem" v-for="item in items" v-bind:class="[item.staff_num==0?'bgc-fff':(item.is_full?'full':'notfull')]">
                                <div>
                                    <div class="text-c">{{item.room_no}}房</div>
                                    <div class="text-c">{{item.room_type_vo.type_name}}({{item.room_type_vo.content}}人)</div>
                                    <div class="text-c">已住：{{item.staff_num}}人</div>
                                </div>
                                <a class="icon-modify" href="javascript:;" v-on:click="clickModify(item)">
                                    <img v-if="item.staff_num==0" src="../assets/images/icon-modify-g.png" height="20" width="20" alt="">
                                    <img v-else src="../assets/images/icon-modify-w.png" height="20" width="20" alt="">
                                </a>
                            </li>
                        </ul>
                        <div id="J-page" class="m-page" v-show="!noData"></div>
                        <div class="m-loading" v-if="isLoading">
                            <div class="cube1"></div>
                            <div class="cube2"></div>
                        </div>
                        <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="less">
    .materialclasses{
        width: 198px;
        border: 1px solid #eee;
        overflow: auto;
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
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow:hidden;
    }
    .materialclasses .item.curr{
      background-color: #e5e5e5;
    }
    .materialclasses .item.curr .name{
        color: #206afc
    }
    .materials{
        /*padding-left: 200px; */
        overflow:hidden;
        padding-left: 10px;
    }
    .type{
        position: relative;
        padding-left: 14px;
        margin-right: 10px;
    }
    .type i{
        color: #c9d1d9;
        position: absolute;
        top: 1px;
        left: 0;
        font-size: 10px;
    }
    .roomItem{
        border: 1px solid #eee;
        float: left;
        display: block;
        width: 160px;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 1px solid #eee;
    }
    .full{
        background-color: #ff3b6a !important;
        color: #fff;
    }
    .notfull{
        background-color: #5bacfd !important;
        color: #fff;
    }
    .roomItem .icon-modify{
        position: absolute;
        top: 8px;
        right: 8px;
        display: inline-block;
        width: 20px;
        height: 20px;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/modifyRoomStaff.vue";

    let itemOps = {
        param:{
            page:1,
            page_size:10,
        }
    }

    export default{
        ready(){
            let that = this;

            this.getBuildingsList();
        },
        props: ['title','type','data'],
        data: function(){
            return{
                noData:false,
                isLoading:false,
                isShowAddDialog:false,
                isShowAddBuildingDialog:false,
                isShowModify: false,
                itemIndex: 0,
                currBuilding: {},
                items: [],
                buildings: [],
                buildingsId: '',
                buildingName: '',
                dialogType:'add',
                dialogTitle:'添加大分类',
                dialogData:{},
            }
        },
        methods: {
            addDialogClose:function(data){
                this.isShowAddDialog = false;
                this.getList(this.buildingsId);
                this.getBuildingsMessage(this.buildingsId);
            },
            clickModify:function(item){
                this.isShowAddDialog = true;
                this.dialogTitle = '配置住房人员';
                this.dialogType = 'modify';
                this.dialogData = item;
            },
            clickItem:function(item){
                this.itemIndex = item.index;
                this.buildingsId = item.id;
                this.buildingName = item.building_name;
                this.getBuildingsMessage(item.id);
                this.getList(this.buildingsId,1);
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
            queryAjax:function(id,callback=function(){}){
                //修改参数
                this.isLoading = true;

                $.ajax({
                    url: `${base.gAjaxUrl.buildings}${id}/rooms/`,
                    type: 'GET',
                    data: itemOps.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.isLoading = false;
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
                $.ajax({
                    url: base.gAjaxUrl.buildings,
                    type: 'GET',
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.isLoading = false;
                        let resultData = data.results;
                        if(resultData && resultData.length){
                            for(let i=0; i<resultData.length; i++){
                                resultData[i].index = i;
                            }
                            this.buildings = resultData;
                            this.buildingsId = resultData[0].id;
                            this.buildingName = resultData[0].building_name;
                            this.currBuilding = resultData[0];
                            this.noData = false;
                            //回调
                            //callback();
                            this.getList(this.buildingsId,1);
                            this.getBuildingsMessage(this.buildingsId);
                        }else{
                            this.noData = true;
                        }
                    });
                })
            },
            getBuildingsMessage:function(id){
                $.ajax({
                    url: `${base.gAjaxUrl.buildings}${id}/rooms_info/`,
                    type: 'GET',
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.isLoading = false;
                        let resultData = data;
                        this.currBuilding = resultData;
                    });
                })
            },
        },
        components: {
            add,
        }
    }
</script>