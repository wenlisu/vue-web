<template>
    <section class="Hui-article-box">
    <div class="page-container">
        <div class="text-l clearfix ">
            <input v-model="searchInput" type="text"  placeholder="起点/终点/站点" style="width:250px" class="f-l input-text">
            <button v-on:click="getList(1)" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
        </div>
        <table class="table table-border table-bordered table-hover table-bg mt-20">
            <thead>
                <tr class="text-c">
                    <th>班次名称</th>
                    <th>起点</th>
                    <th>终点</th>
                    <th width="100">去程出发时间</th>
                    <th width="100">返程出发时间</th>
                    <th>座位</th>
                    <th>价格</th>
                    <!-- <th>平均载率</th> -->
                    <th>平均评分</th>
                    <th width="70">查看</th>
                </tr>
            </thead>
            <div class="result" v-if="!noData">
            <tbody>
                <tr class="text-c" v-for="item in items">
                    <td>{{item['shuttle_name']}}</td>
                    <td>{{item['stations_json']['0']?item['stations_json']['0']['station_name']:''}}</td>
                        <td>{{item['stations_json'][item['stations_json'].length-1]?item['stations_json'][item['stations_json'].length-1]['station_name']:''}}</td>
                    <td>
                        <select><option v-for="time in item.bus_times" v-if="time.shuttle_type==-10">{{time.departure_time}}</option></select>
                    </td>
                    <td>
                        <select><option v-for="time in item.bus_times" v-if="time.shuttle_type==10">{{time.departure_time}}</option></select>
                    </td>
                    <td>{{item.seats}}</td>
                    <td>{{item.price/100}}</td>
                    <!-- <td>{{item.seats}}</td> -->
                    <td>{{item.score}}</td>
                    <td>
                        <a v-link="{ name: 'busDetailReport'}" data-title="查看班次计划详情" class="btn btn-link size-S radius" href="javascript:;" v-on:click="clickDetail(item)">查看班次计划详情</a>
                    </td>
                </tr>
            </tbody>
            </div>
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
    import add from "../components/addDepartments.vue";
    let busInfoReportOps = {
        param:{
            search:'',
        },
        page:1,
        page_size:10,
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
            //初始化分页   
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        busInfoReportOps.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = true;
                //修改参数
                busInfoReportOps.param.search = this.searchInput;

                $.ajax({
                    url: `${base.gAjaxUrl.busInfoReport}?page=${busInfoReportOps.page}&page_size=${busInfoReportOps.page_size}`,
                    type: 'POST', 
                    data:busInfoReportOps.param
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
                    busInfoReportOps.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal,busInfoReportOps.page)
                });
            },
            clickDetail:function(data){
                localStorage.busInfo = JSON.stringify(data);
            }
        },
        components:{
            
        }
    }
</script>