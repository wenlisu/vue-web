<template>
    <section class="Hui-article-box">
    <div class="page-container">
        <div class="cl pd-5 bg-1 bk-gray"> 
            <span class="l">
                <a class="l btn btn-primary radius" href="javascript:;" v-on:click="clickgoBack()">返回</a>
                <div class="l m-info ml-10">
                    <div class="l item">{{employeeInfoItem.real_name}}/{{employeeInfoItem.sex==1? '男': '女';}}</div>
                    <div class="l item">{{employeeInfoItem.department_vo.department_name}}/{{employeeInfoItem.position}}</div>
                    <div class="l item">电话:{{employeeInfoItem.phone}}</div>
                    <div class="l item">工号:{{employeeInfoItem.job_number}}</div>
                    <div class="l item">搭乘次数:{{employeeInfoItem.order_ride_cnt}}</div>
                    <div class="l item">未搭乘次数:{{employeeInfoItem.order_unride_cnt}}</div>
                </div>
            </span> 
        </div>
        <div class="text-l mt-20"> 
            关键字：
            <input type="text" class="input-text Wdate mr-5" style="width:150px;" placeholder="班次名称/价格/站点" v-model="searchInput">
            <!-- 部门：
            <span class="select-box inline mr-5">  
                <select v-model="departmentSelected" name="" class="select">
                    <option value="">全部</option>
                    <option v-bind:value="item.id" v-for="item in departmentItem">{{item.department_name}}</option>
                </select>
            </span>  -->
            开始日期：
            <input v-model="startDateInput" type="text" class="input-text Wdate mr-5" style="width:120px;" id="J-start-date" v-bind:value="startDateInput">
            结束日期：
            <input v-model="endDateInput" type="text" class="input-text Wdate mr-5" style="width:120px;" id="J-end-date" v-bind:value="endDateInput">
            <button type="submit" class="btn btn-success radius" v-on:click="getList()"><i class="Hui-iconfont">&#xe665;</i></button>
            <a class="btn btn-primary radius f-r" v-bind:href="exportUrl()">导出数据</a>
        </div>
        
            <table class="table table-border table-bordered table-hover table-bg mt-20" >
                <thead>
                    <tr class="text-c">
                        <th>班次名称</th>
                        <th>座位</th>
                        <th>价格</th>
                        <th>去返程</th>
                        <th>出发时间</th>
                        <th>出发日期</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <div class="result" v-if="!noData">
                <tbody>
                    <tr class="text-c" v-for="item in items">
                        <td>{{item.shuttle_bus_date_vo.shuttle_bus_vo.shuttle_name}}</td>
                        <td>{{item.shuttle_bus_date_vo.seats}}</td>
                        <td>{{item.shuttle_bus_date_vo.shuttle_bus_vo.price/100}}</td>
                        <td>{{item.shuttle_bus_date_vo.bus_time_vo?item.shuttle_bus_date_vo.bus_time_vo.shuttle_type_name:''}}</td>
                        <td>{{item.shuttle_bus_date_vo.bus_time_vo?item.shuttle_bus_date_vo.bus_time_vo.departure_time:item.shuttle_bus_date_vo.shuttle_bus_vo.departure_time}}</td>
                        <td>{{item.shuttle_bus_date_vo.departure_date}}</td>
                        <td>{{item.status_name}}</td>
                    </tr>
                </tbody>
                </div>
            </table>
            <div id="J-page" class="m-page"  v-if="!noData"></div>
            <div class="m-loading" v-if="!noData && itemsLoading">
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
    let rideDetailReportOps = {
        param:{
            search:'',
            start_date:'',
            end_date:''
        },
        page:1,
        page_size:10
    }

    export default{
        ready () {
            let that = this;

            this.startDateInput = localStorage['startDate'];
            this.endDateInput = localStorage['endDate'];


            new Kalendae.Input('J-end-date', {
                format:'YYYY-MM-DD',
                months: 2,
            });
            new Kalendae.Input('J-start-date', {
                format:'YYYY-MM-DD',
                months: 2,
            });

            //获取部门列表
            $.ajax({
                url: base.gAjaxUrl.departments,
                type: 'GET',
            })
            .always((data)=>{
                this.departmentItem = data.results;
            })

            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal)
            });           
        },
        data:function(){
            return {
                employeeInfoItem:JSON.parse(localStorage['employeeInfo']),
                itemsLoading:true,
                items: [],
                noData:false,
                searchInput:'',
                startDateInput:'2016-08-01',
                endDateInput:'2016-09-01',
                departmentSelected:'',
                departmentItem:[],
                downloadXls:`${base.gAjaxUrl.staffs}${JSON.parse(localStorage['employeeInfo']).id}/export_ride_detail_report?authorization=${localStorage['token']}`
            }
        },
        methods: {
            exportUrl:function(){
                return `${this.downloadXls}&start_date=${this.startDateInput}&end_date=${this.endDateInput}&search=${this.searchInput}`;
            },
            //初始化分页   
            initPage:function(obj,tpageToal='4'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:1,
                    callback:(p)=>{
                        rideDetailReportOps.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = true;
                //修改参数
                rideDetailReportOps.param.search = this.searchInput;
                rideDetailReportOps.param.start_date = this.startDateInput;
                rideDetailReportOps.param.end_date = this.endDateInput;
                // rideDetailReportOps.param.department = this.departmentSelected;

                $.ajax({
                    url: `${base.gAjaxUrl.staffs}${this.employeeInfoItem.id}/ride_detail_report/?page=${rideDetailReportOps.page}&page_size=${rideDetailReportOps.page_size}`,
                    contentType: 'application/json',
                    type: 'POST',
                    data:JSON.stringify(rideDetailReportOps.param)
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
                    this.itemsLoading = false;
                })
            },
            //获取列表
            getList:function(){
                //重置第一页
                rideDetailReportOps.page = 1

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal)
                });
            },
            //返回
            clickgoBack:function(){
                this.$route.router.go({path: '/busDataPanel', replace: true})
            }

        },
        components:{
            
        }
    }
</script>