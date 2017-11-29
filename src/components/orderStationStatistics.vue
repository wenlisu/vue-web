<template>
    <div class="layui-layer layui-anim layui-layer-page layui-modify">
        <div class="layui-layer-title">
            <div class="l m-info ml-10">
                <div class="l item">起点:
                    <input v-model="startStation" disabled>
                </div>
                <div class="l item">终点:
                    <input v-model="endStation" disabled>
                </div>
                <!--<div class="l item">开车时间:{{departureDatetime}}</div>-->
                <!-- <div class="l item">报名截止时间:{{busInfoItem.job_number}}</div> -->
                <div class="l item">座位数:{{seats}}</div>
                <div class="l item">价格:{{price}}</div>
            </div>
        </div>
        <div class="layui-layer-content">
            <table class="table table-border table-bordered table-hover table-bg">
                <thead>
                    <tr class="text-c">
                        <th>站点名称</th>
                        <th>报名人数</th>
                    </tr>
                </thead>
                <div class="result" v-if="!noData">
                <tbody>
                    <tr class="text-c" v-for="item in stationDataItems">
                        <td>{{item.station_vo.station_name}}</td>
                        <td>{{item.order_num}}</td>
                    </tr>
                </tbody>
                </div>
            </table>
            <div id="J-page" class="m-page" v-if="!noData"></div>
            <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
        </div>
        <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
        </span>
        <div class="layui-layer-btn" v-on:click="close"><a class="layui-layer-btn0">关闭</a></div>
    </div>
    <div class="layui-layer-shade"></div>
</template>
<script>
    import * as base from '../assets/js/base.js';
    let commentsOps = {
        param:{
            page:1,
            page_size:15,
        }
    }
    export default{
        ready () {

            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal)
            });
        },
        props: ['data'],
        data:function(){
            return {
                noData:false,
                stationDataItems:[],
                type:this.data['bus_time_vo']?this.data['bus_time_vo']['shuttle_type']:-10,
                startStation: '',
                endStation:'',
                departureDatetime:this.data.departure_time,
                seats:this.data.seats,
                price:this.data.price/100,
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            //初始化分页
            initPage:function(obj,tpageToal='4'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:1,
                    callback:(p)=>{
                        commentsOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = false;

                $.ajax({
                    url: `${base.gAjaxUrl.shuttlebusdates2}${this.data.id}/station_statistics/`,
                    type: 'GET',
                    data:commentsOps.param
                })
                .always((data)=> {
                    base.ajaxCallback(data,()=>{
                        let resultData = data.results;
                        this.stationDataItems = resultData;
                        this.startStation = this.type==-10?resultData[0].station_vo.station_name:resultData[resultData.length-1].station_vo.station_name;
                        this.endStation = this.type==-10?resultData[resultData.length-1].station_vo.station_name:resultData[0].station_vo.station_name;

                        if(resultData.length){
                            this.noData = false;
                            //回调
                            callback(data.num_pages);
                        }else{
                            this.noData = true;
                        }

                    });
                });
            },
            //获取列表
            getList:function(){
                //重置第一页
                commentsOps.param.page = 1

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal)
                });
            },
        }
    }
</script>
<style lang="less">
.layui-layer-title{
    .m-info{
        border: none;
        padding: 9px 0;
        margin: 0;
    }
}
</style>

