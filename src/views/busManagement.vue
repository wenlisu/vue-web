<template>
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
    <bindbus :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowbindbusDialog" v-on:dialog-close="bindbusDialogClose" v-on:dialog-save="bindbusDialogSave"></bindbus>
    <!-- 日期 -->
    <calendar :title="dialogTitle" :type="dialogType" :saledates="saleDates" :sourcedate="sourceDate" :busid="busId" v-if="isShowCalendarDialog" v-on:dialog-close="calendarDialogClose" v-on:dialog-save="calendarDialogSave"></calendar>
    <section class="Hui-article-box">
        <div class="page-container" id="page-container">
            <div class="text-l clearfix">
                <input v-model="searchInput" type="text"  placeholder="起点/终点/站点/班次名称" style="width:250px" class="f-l input-text">
                <button v-on:click="getList(1)" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
            </div>
            <div class="cl pd-5 bg-1 bk-gray mt-20"> 
                <span class="l">
                    <a class="btn btn-primary radius" href="javascript:;" v-on:click="clickAdd()"><i class="Hui-iconfont">&#xe600;</i> 添加线路
                </a>
                </span> 
            </div>
            <table class="table table-border table-bordered table-hover table-bg table-sort">
                <thead>
                    <tr class="text-c">
                        <th>班次名称</th>
                        <th>起点</th>
                        <th>终点</th>
                        <th width="100">去程出发时间</th>
                        <th width="100">返程出发时间</th>
                        <th width="50">座位</th>
                        <th width="50">价格</th>
                        <th width="100">班车日期</th>
                        <!-- <th width="100">绑定车辆</th> -->
                        <th width="90">操作</th>
                    </tr>
                </thead>
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
                        <td><div class="btn btn-link size-S radius" v-on:click="clickModifyDate(item.id)">编辑班车日期</div></td>
                        <!-- <td><div class="btn btn-primary size-S radius c-white" v-bind:class="{ 'class-bind': item.is_bind_vehicle == true,'class-unbind': item.is_bind_vehicle == false,}" v-on:click="">{{ item.is_bind_vehicle == false ? "绑定车辆" : "查看"}}</div></td> -->
                        <td class="f-14">
                            <a title="编辑" href="javascript:;" class="ml-5" v-on:click="clickModify(item)"><i class="Hui-iconfont">&#xe6df;</i></a>  
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
.class-bind{
    color: #fff;
    background-color: #5a98de;
    border-color: #5a98de;
    padding: 4px 12px;
    border-radius: 4px;
}
.class-unbind{
    color: #333;
    background-color: #e6e6e6;
    border-color: #e6e6e6;
    border: solid 1px #ddd;
    border-radius: 4px;
}
</style>

<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/addBus2.vue";
    import calendar from "../components/addBusDate.vue";
    // import bindbus from "../components/bindbus.vue";
    // import calendar from "../components/calendar.vue";
    import moment from "moment";
    
    let busManagementOps = {
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

            //巴士班次可售卖日期(不可删)
            this.saleableDates();

            console.log(moment().format('YYYY-MM'))
        },
        data:function(){
            return {
                noData:false,
                itemsLoading:false,        //loading
                isShowAddDialog:false,      //增加，修改
                isShowCalendarDialog:false, //日历
                items: [],
                searchInput:'',
                downloadCode:base.gAjaxUrl.shuttlebuses,
                codeToken:localStorage['token'],
                dialogTitle:'添加部门',
                dialogType:'add',
                dialogData:'',
                sourceDate:[],
                busId:'',
            }
        },
        methods: {
            getTime:function(id){

                let that = this;

                $.ajax({
                    url: base.gAjaxUrl.time,
                    type: 'GET',
                })
                .always((data)=>{
                    that.getSourceDate(id,moment(data.full).add('1','months').format('YYYY-MM'),0);
                    that.getSourceDate(id,moment(data.full).format('YYYY-MM'),1);
                })  

            },
            addDialogClose:function(data){
                this.isShowAddDialog = false; 
            },
            addDialogSave:function(data){
                this.isShowAddDialog = false;
                this.getList();
            },
            calendarDialogClose:function(data){
                this.isShowCalendarDialog = false; 
            },
            calendarDialogSave:function(data){
                this.isShowCalendarDialog = false; 
                this.getList();
            },
            clickModifyDate:function(id){
                let getDate=new Date;
                let getYear=getDate.getFullYear(); 
                let getMonth=getDate.getMonth()+1; 

                //重置
                this.sourceDate = [];
                this.getTime(id);

            },
            //获取选中日期
            getSourceDate:function(id,date,flag){

                $.ajax({
                    url: `${base.gAjaxUrl.shuttlebuses2}${id}/dates/`,
                    type: 'GET',
                    data:{
                        month:date
                    }
                })
                .always((data)=>{
                    let that = this;
                    // for(let i = 0; i < data.length; i++){
                    //     this.sourceDate.push(data[i]['departure_date'])
                    // }

                    $(data).each(function(i,e){
                        that.sourceDate.push(e['departure_date'])
                    });

                    setTimeout(function(){
                        if(flag){
                            that.busId = id; 
                            that.isShowCalendarDialog = true; 
                        }
                    }, 200)
                })  

            },
            //查询不能删的日期
            saleableDates:function(){
                $.ajax({
                    url: base.gAjaxUrl.shuttlebuses+'saleable_dates/',
                    type: 'GET',
                })
                .always((data)=>{
                    //售卖日期
                    this.saleDates=data.data;
                })
            },
            clickAdd:function(){
                this.isShowAddDialog = true;
                this.dialogTitle='添加线路';
                this.dialogType='add';
            },
            clickModify:function(data){
                this.dialogTitle='修改线路';
                this.dialogType='modify';
                this.dialogData = data;
                this.isShowAddDialog = true;
            },
            //初始化分页   
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        busManagementOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = true;
                //修改参数
                busManagementOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.shuttlebuses2,
                    type: 'GET',
                    data:busManagementOps.param
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
                    busManagementOps.param.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal,busManagementOps.param.page)
                });
            },
            //删除
            deleteBtn:function(id){
                let that = this;

                layer.confirm('删除须谨慎，确认要删除吗？',(index)=>{

                    if($('tbody tr.text-c').length == 1 && busManagementOps.param.page>1){
                        busManagementOps.param.page--; 
                    };  
                    
                    $.ajax({
                        url: `${base.gAjaxUrl.shuttlebuses}${id}/`,
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
            add,
            calendar,
            // bindvehicle,
        }
    }
</script>
