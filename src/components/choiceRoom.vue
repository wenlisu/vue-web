<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify zIndex-103 w-880">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content bgc-f5">
        <div class="pd-10">
            <div class="panel radius bgc-e5">
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
            <div class="mt-10 clearfix">
                <div class="materialclasses bgc-fff f-l">
                    <ul>
                        <li class="item" v-for="item in buildings" v-bind:class="[item.index==itemIndex?'curr':'']" v-on:click="clickItem(item)">
                            <span class="text-c fw-b name">{{item.building_name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="materials">
                    <ul class="clear">
                        <li class="roomItem choiceRoom" v-for="item in items" v-bind:class="[item.staff_num==0?'bgc-fff':(item.is_full?'full':'notfull')]" v-on:click="setRoom(item)">
                            <div>
                                <div class="text-c">{{item.room_no}}</div>
                                <div class="text-c">{{item.room_type_vo.type_name}}({{item.room_type_vo.content}}人)</div>
                                <div class="text-c">已住：{{item.staff_num}}人</div>
                            </div>
                        </li>
                    </ul>
                    <div id="J-page" class="m-page" v-if="!noData"></div>
                    <div class="m-loading" v-if="isLoading">
                        <div class="cube1"></div>
                        <div class="cube2"></div>
                    </div>
                    <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
                </div>
            </div>
        </div>
        <div id="J-page" class="m-page" v-if="!noData"></div>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
</div>
<div class="layui-layer-shade zIndex-102"></div>
</template>
<style lang="less">
    .materialclasses{
        width: 198px;
        border: 1px solid #eee;
        overflow: auto;
    }
    .materialclasses ul{
        max-height: 411px;
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
    .roomItem.choiceRoom.full{
        cursor: not-allowed;
    }
    .roomItem.choiceRoom.bgc-fff,
    .roomItem.choiceRoom.notfull{
        cursor: pointer;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';

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
                itemIndex: 0,
                currBuilding: {},
                items: [],
                buildings: [],
                buildingsId: '',
                buildingName: '',
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            clickItem:function(item){
                this.itemIndex = item.index;
                this.buildingsId = item.id;
                this.getList(this.buildingsId);
                this.getBuildingsMessage(this.buildingsId);
            },
            setRoom:function(item){
                let that = this;
                if(!item.is_full){
                    layer.confirm(
                        `确定要安排：${this.data.real_name}入住${item.building_vo.building_name}${item.room_no}吗？`, 
                        {
                            title: '确认房间'
                        },
                        (index)=>{
                            let ajaxAddData = {
                                staff: this.data.id,
                            };
                            $.ajax({
                                url: `${base.gAjaxUrl.rooms}${item.id}/staffs/`,
                                type:'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(ajaxAddData),
                            })
                            .always(function(data) {
                                base.ajaxCallback(data,function(){
                                    layer.msg('提交成功',{icon:1,time:1000});
                                    that.$dispatch('dialog-save');
                                });
                            });
                        },
                        // ()=>{
                        //     that.isShowModify = false;
                        // }
                    )
                }
            },
            //获取宿舍列表
            getList:function(id=this.buildingsId){
                let that = this;
                this.queryAjax(id);
            },
            queryAjax:function(id,callback=function(){}){
                //修改参数
                this.isLoading = true;

                $.ajax({
                    url: `${base.gAjaxUrl.buildings}${id}/rooms/`,
                    type: 'GET',
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.isLoading = false;
                        let resultData = data.results;
                        this.items = resultData;
                        if(resultData && resultData.length){
                            this.noData = false;
                            //回调
                            //callback(data.num_pages);
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
                        for(let i=0; i<resultData.length; i++){
                            resultData[i].index = i;
                        }
                        this.buildings = resultData;
                        this.buildingsId = resultData[0].id;
                        this.buildingName = resultData[0].building_name;
                        this.currBuilding = resultData[0];
                        if(resultData && resultData.length){
                            this.noData = false;
                            //回调
                            //callback();
                            this.getList(this.buildingsId);
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
        }
    }
</script>