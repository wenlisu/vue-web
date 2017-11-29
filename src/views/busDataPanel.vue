<template>
    <!-- 以下线路统计component -->
    .vc {
    .vc {
        position: relative; /*脱离文档流*/
        top: 50%; /*偏移*/
        transform: translateY(-50%);
    }
        position: relative; /*脱离文档流*/
        top: 50%; /*偏移*/
        transform: translateY(-50%);
    }
    <passnumber  :datapass="passData" v-if="isShowPassDialog" v-on:dialog-pass-close="passDialogClose"></passnumber>
    <datacomment  :data="commentData" v-if="isShowCommentDialog" v-on:dialog-comment-close="commentDialogClose"></datacomment>
    <singlebus :data="lineSelected" v-if="isShowLineData" v-on:dialog-line-close="lineDialogClose"></singlebus>
    <!-- 以下搭乘统计component -->
    <selected :type="dialogType" v-if="isShowSelectDialog" :data="busItem" :selected="busesSelected" v-on:dialog-close="selectDialogClose" v-on:dialog-save="selectDialogSave"></selected>
    <!-- 以下票务实时情况component -->
    <comment v-if="isShowAddDialog" :data="dialogData" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></comment>
    <station v-if="isShowStationDialog" :data="stationData" v-on:dialog-close="stationDialogClose"></station>
    <ride v-if="isShowRideInfoDialog" :data="rideInfoData" v-on:dialog-close="rideInfoDialogClose"></ride>

    <section class="Hui-article-box">
            <div id="tab_demo" class="HuiTab" role="tablist">
                <div class="tabBar clearfix">
                    <span id="Line_statistics" role="tab" class="line f-18">线路统计</span>
                    <span role="tab" class="f-18">搭乘统计</span>
                    <span role="tab" class="current f-18">票务实时情况</span>
                </div>
                <!--  以下为线路总数统计 -->
               <div class="tabCon bk_gray pd-10 tabpan" role="tabpanel" style="display: none;overflow: auto">
                    <div class="clearfix tab-circle">
                        
                        <div class="circle circle-first">
                            <div class="adaptive-circle">
                                <div class="layout middle">
                                    <div>
                                        <h2>搭乘总人次</h2>
                                        <p>{{ ride_num }}</p>
                                        <a href="javascript:;" @click = "passNumber">查看详情</a>
                                        <div class="triangle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="small-line"></div>
                        <div class="circle">
                            <div class="adaptive-circle adaptive-circle2">
                                <div class="layout middle">
                                    <div>
                                        <h2>好评率</h2>
                                        <p>{{ good_comment_rate }}%</p>
                                        <a href="javascript:;" @click = "commentRate" >查看详情</a>
                                        <div class="triangle triangle2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="small-line"></div>
                        <div class="circle">
                            <div class="adaptive-circle adaptive-circle3">
                                <div class="layout middle">
                                    <div>
                                        <h2>线路总数</h2>
                                        <p>{{ shuttle_bus_cnt }}条</p>
                                        <a href="javascript:;"  v-link="{ name: 'busManagement'}">查看详情</a>
                                        <div class="triangle triangle3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="circle circle-last">
                            <p class="pselect">选择展示时间</p> 
                            <select id="selectId" v-model="selectedDay" class="se-r" @change="allchange()">
                                <option value="最近7天"  selected = "selected">最近7天</option>
                                <option value="最近14天" >最近14天</option>
                                <option value="最近30天">最近30天</option>   
                                <option value="最近60天">最近60天</option>   
                                <option value="最近90天">最近90天</option>   
                            </select>
                        </div>
                    </div>
                    <div class="top-rate">
                        <!-- <div class="search">
                            <input type="text" placeholder="搜索线路信息" class="input-text input-search radius size-M"><i class="Hui-iconfont menu_dropdown-arrow search-btn">&#xe665;</i>
                        </div> -->
                        <div id="main1" class="main1" style="width: 100%;height: 95%;"></div>
                    </div>
                    <div class="bottom-rate">
                        <!-- <div class="search search-bottom">
                            <input type="text" placeholder="搜索站点信息" class="input-text input-search radius size-M"><i class="Hui-iconfont menu_dropdown-arrow search-btn search-btn-bottom">&#xe665;</i>
                        </div> -->
                        <div id="main2" class="main2" style="width: 100%;height: 80%;"></div>
                    </div>
               </div>
               <!--  以下为搭乘统计 -->
               <div class="tabCon bk_gray pd-10 ridereport" role="tabpanel" style="display: none;">
                   <ridereport></ridereport>
                </div>
               <!--<div class="tabCon bk_gray pd-10" role="tabpanel" style="display: none;">-->
                    <!--<div class="page-container">-->
                        <!--<div class="text-l"> -->
                            <!--关键字：-->
                            <!--<input id="searchInput" type="text" class="input-text Wdate mr-5" style="width:150px;" placeholder="姓名/工号/电话/职位" v-model="searchInput">-->
                            <!--部门：-->
                            <!--<span class="select-box inline mr-5">  -->
                                <!--<select id="departmentSelected" v-model="departmentSelected" name="" class="select-small select">-->
                                    <!--<option value="">全部</option>-->
                                    <!--<option v-bind:value="item.id" v-for="item in departmentItem">{{item.department_name}}</option>-->
                                <!--</select>-->
                            <!--</span>-->
                            
                            <!--<button id="selectBus" type="button" class="btn btn-success radius" v-on:click="selectBus()">班次选择</button>-->
                            <!--开始日期：-->
                            <!--<input  v-model="startDateInput" type="text" class="input-small input-text Wdate mr-5" id="J-start-date" v-bind:value="startDateInput">-->
                            <!--结束日期：-->
                            <!--<input v-model="endDateInput" type="text" class="input-small input-text Wdate mr-5" id="J-end-date" v-bind:value="endDateInput">-->
                            <!--<button id="getList" type="submit" class="btn btn-success radius" v-on:click="getList()"><i  class="Hui-iconfont">&#xe665;</i></button>-->
                            <!--<button  id="exportData" class="btn btn-primary radius f-r" v-on:click="exportData()">导出数据</button>-->
                        <!--</div>-->
                        <!--<table class="table table-border table-hover table-bg table-sort radius  table-striped table-bg table-bordered table-bg mt-20" >-->
                            <!--<thead>-->
                                <!--<tr class="text-c">-->
                                    <!--<th>姓名/性别</th>-->
                                    <!--<th>部门/职位</th>-->
                                    <!--<th>电话</th>-->
                                    <!--<th>工号</th>-->
                                    <!--<th>搭乘次数</th>-->
                                    <!--<th>未搭乘次数</th>-->
                                    <!--<th id="check" width="70">查看</th>-->
                                <!--</tr>-->
                            <!--</thead>-->
                            <!--<div class="result" v-if="!noData">-->
                            <!--<tbody>-->
                                <!--<tr class="text-c" v-for="item in items">-->
                                    <!--<td>{{item.real_name}}/{{item.sex==1? '男': '女';}}</td>-->
                                    <!--<td>{{item.department_vo.department_name}}/{{item.position}}</td>-->
                                    <!--<td>{{item.phone}}</td>-->
                                    <!--<td>{{item.job_number}}</td>-->
                                    <!--<td>{{item.order_ride_cnt}}</td>-->
                                    <!--<td>{{item.order_unride_cnt}}</td>-->
                                    <!--<td>-->
                                        <!--<a v-if="item.order_ride_cnt || item.order_unride_cnt" v-link="{ name: 'rideDetailReport'}" data-title="搭乘详细" class="btn btn-link size-S radius" href="javascript:;" v-on:click="clickDetail(item)">搭乘详细</a>-->
                                        <!--<a v-else href="javascript:;">-</a>-->
                                    <!--</td>-->
                                <!--</tr>-->
                            <!--</tbody>-->
                            <!--</div>-->
                        <!--</table>-->
                        <!--<div id="J-page" class="m-page" v-if="!noData"></div>-->
                        <!--<div class="m-loading" v-if="itemsLoading">-->
                            <!--<div class="cube1"></div>-->
                            <!--<div class="cube2"></div>-->
                        <!--</div>-->
                        <!--<div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>-->
                    <!--</div>-->
               <!--</div>-->
               <!--  以下为票务实时情况 -->
               <div class="tabCon bk_gray pd-10" role="tabpanel" style="display: block;">
                    <div class="page-container">
                        <div class="text-l mt-5">
                            巴士班次：
                            <span class="select-box inline mr-5">
                                <select v-model="busSelected" name="" class="select">
                                    <option value="">全部</option>
                                    <option v-bind:value="item.id" v-for="item in busItems" v-on:click="RealqueryAjax()">{{item.shuttle_name}}</option>
                                </select>
                            </span>
                            开始日期：
                            <input v-model="startDateInputReal" type="text" class="input-text Wdate mr-5" style="width:120px;" id="J-start-date-Real" v-bind:value="startDateInputReal">
                            结束日期：
                            <input v-model="endDateInputReal" type="text" class="input-text Wdate mr-5" style="width:120px;" id="J-end-date-Real" v-bind:value="endDateInputReal">
                            <button type="submit" class="btn btn-success radius" v-on:click="RealgetList()"><i class="Hui-iconfont">&#xe665;</i></button>
                        </div>
                            <table class="table table-border table-hover table-bg table-sort radius  table-striped table-bg table-bordered table-bg mt-20" >
                                <thead>
                                    <tr class="text-c">
                                        <th>班次名称</th>
                                        <th>出发时间</th>
                                        <th>状态</th>
                                        <th>平均评分</th>
                                        <th>报名数</th>
                                        <th>剩余座位数</th>
                                        <th>搭乘数</th>
                                        <th>查看</th>
                                    </tr>
                                </thead>
                                <div class="result" v-if="!RealnoData">
                                <tbody>
                                    <tr class="text-c" v-for="item in Realitems">
                                        <td>{{item.shuttle_name}}</td>
                                        <td>{{item.departure_date}} {{item.bus_time_vo?item.bus_time_vo.departure_time:item.departure_time}}{{item.bus_time_vo?item.bus_time_vo.shuttle_type_name:''}}</td>
                                        <td>{{item.status_name}}</td>
                                        <td>{{item.score}}</td>
                                        <td>{{item.order_cnt}}</td>
                                        <td>{{item.seats-item.order_cnt}}</td>
                                        <td>{{item.check_order_cnt}}</td>
                                        <td>
                                            <div class="btn btn-link size-S radius" v-on:click="clickCheck(item)">{{item.status==30||item.status==40?"乘客及评价":""}}</div>
                                            <div class="btn btn-link size-S radius" v-on:click="checkStation(item)">站点统计</div>
                                            <div class="btn btn-link size-S radius" v-on:click="checkRideInfo(item)">搭乘情况</div>
                                        </td>
                                    </tr>
                                </tbody>
                                </div>
                            </table>
                            <div id="J-page-real" class="m-page" v-if="!RealnoData"></div>
                            <div class="m-loading" v-if="RealitemsLoading">
                                <div class="cube1"></div>
                                <div class="cube2"></div>
                            </div>
                        <div class="no-data text-c mt-50" v-if="RealnoData">没有相关数据</div>
                    </div>
               </div>
            </div>
    </section>
    
</template>
<style lang="less" scoped>
    .Hui-article-box{
        // left: 160px;
        // background-color: #f7f7f7;
    }
    .page-container{
        padding:0;
    }
    // 以下为搭乘统计模块
    .search {
        position: absolute;
        margin-left: 69%;
        z-index: 10000;
        margin-top: -8px;
        .search-btn{
            margin-left: 5px;
            font-size: 24px;
            color: #909bad;
            cursor: pointer;
        }
        .input-search{
            width: 120px;
            height: 24px;
            padding-left: 12px;
        }
    }
    
    .line{
        background-color: #277bd1;
    }
    .tabpan{
        background-color: #f7f7f7;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    #check {
        top: 0;
    }
    #exportData {
        top: 0;
    }
    .input-small{
        width: 120px;
    }
    .tabCon .page-container .select-small{
        width: 258px;
    }
    // 以下为线路统计模块
    .triangle{
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 8px solid #40C6AE;
        margin-left: 45%;
    }
    .triangle2{
        border-bottom: 8px solid #FE696B;
    }
    .triangle3{
        border-bottom: 8px solid #FAB687;
    }
    .pselect{
        padding-left: 39px;
        margin-top: 35px;
        font-size: 16px;
    }
    .small-line{
        height: 146px;
        width: 2px;
        background-color: #EAEAEC;
        float: left;
        margin-top: 22px;
    }
    .all-avage{
        color: red;
        text-align: center;
        width: 100px;
        padding-top: 120px;
        margin-left: 70px;
        line-height: 50px;
        color: red;
    }
    .main1,.main2{
        width: 100%;
        height: 80%;
    }
    .main1{
        height: 96%;
    }
    .tabCon{
        width: 98.3%;
        height: 98%;
    }
    .HuiTab{
        width: 100%;
        height: 100%;
    }
    .top-rate{
        position: relative;
        margin-top: 10px;
        width: 100%;
        height: 38%;
        background-color: #fff;
        border-radius: 10px;
    }
    .bottom-rate{
        position: relative;
        width: 100%;
        height: 38%;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 10px;
    }
    .tab-circle{
        width: 100%;
        height: 21%;
        background-color: #fff;
        border-radius: 5px;
    }
    .clearfix:after{content:"\20";display:block;height:0;clear:both;visibility:hidden}.clearfix{zoom:1}
    .tabBar {background-color: #6E6E6E;height: 43px;}
    .tabBar span {color: white;cursor: pointer;display: inline-block;float: left;height: 30px;line-height: 30px;padding: 4px 16px; width: 120px;background-color: #6E6E6E; border-top: 4px solid #6E6E6E;font-size: 16px;}
    .tabBar span.current{background-color: #697E93; border-top: 4px solid #5CADFE; width: 120px;}
    .tabCon {display: none}
    .adaptive-circle {
        margin: 10px auto 0;
        width: 100%;
        height: 0;
        padding-top: 100%;
        border-radius: 100%;
        border: 3px solid #40c4af;
        box-sizing: border-box;
        position: relative;
        // margin-left: 5%;
        // margin-right: 5%;
    }
    .adaptive-circle2{
        border: 3px solid #fd6b6b;
        // margin-left: 5%;
        // margin-right: 5%;
    }
    .adaptive-circle3{
        border: 3px solid #fab685;
        // margin-left: 5%;
        // margin-right: 5%;
    }
    .adaptive-circle .layout {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;
    }
    .adaptive-circle .layout.middle a{
        color: #909bad;
        font-size: 13px;
    }
    .adaptive-circle .layout.middle h2{
        font-size: 140%;
        padding-top: 0;
        color: #611421;
    }
    .adaptive-circle p{
        font-size: 170%;
        color: #40c4af;
    }
    .adaptive-circle2 p{
        font-size: 170%;
        color: #fd6b6b;
    }
    .adaptive-circle3 p{
        font-size: 170%;
        color: #fab685;
    }
    .adaptive-circle .layout.middle:before {
        display: inline-block;
        vertical-align: middle;
        content: '';
        height: 100%;
        width: 0;
        overflow: hidden;
    }
    .adaptive-circle .layout.middle div:first-child {
        display: inline-block;
        vertical-align: middle;
    }
    .circle{
        width: 11%;
        height: 165px;
        overflow: hidden;
        float: left;
        // margin-left: 10.5%;
        margin-left: 5%;
        margin-right: 5%;
        border: 0;
    }
    .tab-circle .circle-first{
        margin-left: 18.5%;
    }
    .tab-circle .circle-last{
        margin-left: 5%;
        overflow: visible;
        width: 12%;
    }
    .se-r{
        width: 132px;
        margin-left: 25px;
        background: #5cadff;
        border-radius: 20px;
        color: #fff;
        padding-left: 33px;
        height: 26px;
        font-size: 15px;
    }
    .tabBar{
        // margin-top: 10px;
        // margin-left: 34%;
        width: 100%;
        border:0;
    }
    .tabBar span{
        // color: #615f5f;
        text-align: center;
        // background-color: #fff;
        // border-bottom: 1px solid #999;
        // border-radius: 5px;
    }
    @media screen and (max-width: 1600px) {
        .tab-circle .circle-last{
            margin-left: 0%;
        }
        .small-line{
            height: 110px;
            width: 2px;
            background-color: #EAEAEC;
            float: left;
            margin-top: 22px;
        }
        .adaptive-circle .layout.middle a{
            color: #909bad;
            font-size: 9px;
            *font-size: 9px;
        }
        .search-bottom{
            position: absolute;
            margin-left: 69%;
            z-index: 10000;
            margin-top: -288px;
            .search-btn{
                margin-left: 5px;
                font-size: 24px;
                color: #909bad;
                cursor: pointer;
            }
            .search-btn-bottom{
                width: 120px;
                height: 24px;
                padding-left: 12px;
            }
        }
        .tab-circle{
            height: 24%;
        }
        .input-small{
            width: 95px;
        }
        .tabCon .page-container .select-small{
            width: 150px;
        }
        .circle{
            height: 130px;
            // margin-left: 10.5%;
        }
        .circle{
            width: 12.5%;
            // height: 165px;
            overflow: hidden;
            float: left;
            // margin-left: 10.5%;
            margin-left: 5%;
            margin-right: 5%;
            border: 0;
        }
        .circle-first{
            margin-left: 18.5%;

        }
        .circle-last{
            margin-left: 0%;
            overflow: visible;
            width: 12%;
        }
        .main2{
            width: 100%;
            height: 74%;
        }
        .all-avage{
            color: red;
            text-align: center;
            width: 100px;
            padding-top: 60px;
            margin-left: 26px;
            line-height: 50px;
            color: red;
        }
        .adaptive-circle .layout.middle p{
            font-size: 160%;
            color: red;
            margin-bottom: 0;
        }
        .adaptive-circle .layout.middle h2{
            font-size: 112%;
            padding-top: 0;
            color: #611421;
        }
        .adaptive-circle .adaptive-circle p{
            font-size: 140%;
            color: #40c4af;
        }
        .adaptive-circle .adaptive-circle2 p{
            font-size: 140%;
            color: #fd6b6b;
        }
        .adaptive-circle .adaptive-circle3 p{
            font-size: 140%;
            color: #fab685;
        }
        .pselect{
            padding-left: 37px;
            margin-top: 30px;
            font-size: 16px;
        }
        .top-rate{
            position: relative;
            margin-top: 10px;
            width: 100%;
            height: 80%;
            background-color: #fff;
            border-radius: 10px;
        }
        .bottom-rate{
            position: relative;
            width: 100%;
            height: 80%;
            background-color: #fff;
            border-radius: 10px;
            margin-top: 10px;
        }
    }
    @media screen and (max-width: 2000px) {
      
    }
    @media screen and (min-width: 2000px) {
        
    }
</style>
<style>
    .ridereport > *:first-child {
        position: absolute;
        left: 0;
    }

</style>
<script>
    import * as base from '../assets/js/base.js';
    /*以下为线路统计*/
    import passnumber from '../components/busDataPanelPassNumber.vue';
    import datacomment from '../components/busDataCommentRate.vue';
    /*以下为搭乘统计统计*/
    import add from "../components/addDepartments.vue";
    import moment from "moment";
    import selected from "../components/selectBus.vue";
    import ridereport from "./rideReport.vue";
    /*以下为票务实时情况*/
    import comment from "../components/comment.vue";
    import station from "../components/orderStationStatistics.vue";
    import ride from "../components/rideInfo.vue";

    import singlebus from "../components/singleLineBusData.vue";

     // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入组件
    // require('echarts/lib/chart/bar');
    // require('echarts/lib/chart/line');
    let rideReportOps = {
        param:{
            search:'',
            start_date:'',
            end_date:'',
            department:'',
            shuttlebus: ''
        },
        page:1,
        page_size:10,
    }
    let vm;

    let carpoolOps = { 
        param:{
            search:'',
            approval_status:'',
            order_status:'',
            is_carpool:false,
            is_urgent:'', 
        },
        page:1,
        page_size:500,
    }

    let rideDetailReportOps = {
        param:{
            search:'',
            start_date:'',
            end_date:''
        },
        page:1,
        page_size:10,
    }

    export default{
        ready () {
            // H_UI的tab 切换
            jQuery.Huitab =function(tabBar,tabCon,class_name,tabEvent,i){
                var $tab_menu=$(tabBar);
                  // 初始化操作
                  $tab_menu.removeClass(class_name);
                  $(tabBar).eq(i).addClass(class_name);
                  $(tabCon).hide();
                  $(tabCon).eq(i).show();
                  
                  $tab_menu.bind(tabEvent,function(){
                    $tab_menu.removeClass(class_name);
                      $(this).addClass(class_name);
                      var index=$tab_menu.index(this);
                      $(tabCon).hide();
                      $(tabCon).eq(index).show()})
                  // console.log(111);
            }
                // #tab_demo 父级id #tab_demo .tabBar span 控制条 #tab_demo .tabCon 内容区
                // click 事件 点击切换，可以换成mousemove 移动鼠标切换
                // 1    默认第2个tab为当前状态（从0开始）
            $.Huitab("#tab_demo .tabBar span","#tab_demo .tabCon","current","click","0");
            // 以下为线路统计模块
            this.topStation();
            this.carryRate();
            this.averageRate();
            let that  = this;
            let Line_statistics = document.getElementById('Line_statistics');
            Line_statistics.onclick = function(){
                that.carryRate();
                that.topStation();
                that.averageRate();
            };
            window.onresize = function(){
                that.topStation();
                that.averageRate();
            }


            // 以下为搭乘统计模块
            that.init();
            // vm = this;
            that.startDateInput = moment().add('-1','months').format('YYYY-MM-DD');
            that.endDateInput = moment().format('YYYY-MM-DD');

            new Kalendae.Input('J-end-date', {
                months: 2,
            });
            new Kalendae.Input('J-start-date', {
                months: 2,
            });
            let pageParams = {
                page:1,
                page_size:100
            }
            //获取部门列表
            $.ajax({
                url: base.gAjaxUrl.departments,
                type: 'GET',
                data:pageParams
            })
            .always((data)=>{
                that.departmentItem = data.results;
            })

            that.queryAjax((tpageToal='4')=>{
                that.initPage('#J-page',tpageToal)
            });

            //获取巴士列表
            $.ajax({
                url: base.gAjaxUrl.shuttlebuses2,
                type: 'GET',
                data:pageParams
            })
            .always((data)=>{
                that.busItem = data.results;

            })
            that.queryAjax((tpageToal='4')=>{
                that.initPage('#J-page',tpageToal)
            });

            // 以下为票务实时情况
            that.startDateInputReal = moment().format('YYYY-MM-DD');
            that.endDateInputReal = moment().format('YYYY-MM-DD');

            new Kalendae.Input('J-end-date-Real', {
                months: 2,
            });
            new Kalendae.Input('J-start-date-Real', {
                months: 2,
            });
            let RealpageParams = {
                page:1,
                page_size:100
            }
            // //获取部门列表

            //获取巴士列表
            $.ajax({
                url: base.gAjaxUrl.shuttlebuses2,
                type: 'GET',
                data:RealpageParams
            })
            .always((data)=>{
                that.busItems = data.results;
            });
            that.RealqueryAjax((tpageToal='4')=>{
                that.RealinitPage('#J-page-real',tpageToal)
            });
        },
        data:function(){
            return {
                // 以下为线路统计
                selectedDay: '最近7天',
                ride_num:'0',//搭乘总数, 
                per_day_ride_rate:'0',//搭乘率
                shuttle_bus_cnt:'0',//巴士总数, 
                good_comment_rate:'0',//好评率, 
                station_cnt:'0',//站点总数
                isShowPassDialog:false,
                isShowCommentDialog:false,
                datapass: this.selectedDay,
                lineData: this.selectedDay,
                commentData: this.selectedDay,

                // 以下为搭乘统计
                isShowSelectDialog:false,
                itemsLoading:true,
                items: [],
                noData:false,
                searchInput:'',
                startDateInput:'2016-08-01',
                endDateInput:'2016-09-01',
                departmentSelected:'',
                busSelected:'',
                busesSelected:[],
                departmentItem:[],
                busItem:[],
                busesSelectedNames:[],
                downloadXls:`${base.gAjaxUrl.staffs}create_ride_report_file/`,

                // 以下为票务实时情况
                isShowAddDialog:false,
                isShowStationDialog: false,
                isShowRideInfoDialog: false,
                stationData:'',
                rideInfoData:'',
                RealitemsLoading:true,
                Realitems: [],
                RealnoData:false,
                searchInput:'',
                startDateInputReal:'2016-08-01',
                endDateInputReal:'2016-09-01',
                statusSelected:'',
                dialogData:'',
                busItems:[],
                busSelected:'',
                lineSelected: '',
                isShowLineData: false
            }
        },
        filters: {
            // 截取时间字符串
            formatDate(time) {
                return time.substring(11,16);
            }
        },
        methods: {
            // 以下为线路统计模块
            passDialogClose:function(data){
                this.isShowPassDialog = false;
            },
            commentDialogClose:function(data){
                this.isShowCommentDialog = false;
            },
            lineDialogClose: function () {
                this.isShowLineData = false;
            },
            commentRate: function(){
                localStorage.good_comment_rate = this.good_comment_rate;
                let x = document.getElementById("selectId").selectedIndex;
                localStorage.selectindex = x;
                this.isShowCommentDialog = true;
            },
            passNumber: function(){
                localStorage.ride_num = this.ride_num;
                let x = document.getElementById("selectId").selectedIndex;
                localStorage.selectindex = x;
                // localStorage.selectday = this.selectedDay;
                // console.log(this.selectedDay);

                this.isShowPassDialog = true;
            },
            // 选择日期函数
            selectDayFn: function(AddDayCount) {
                if(AddDayCount == '最近7天'){
                     AddDayCount = -7;
                }
                else if(AddDayCount == '最近14天'){
                     AddDayCount = -14;
                }
                else if(AddDayCount == '最近30天'){
                     AddDayCount = -30;
                }
                else if(AddDayCount == '最近60天'){
                     AddDayCount = -60;
                }
                else if(AddDayCount == '最近90天'){
                     AddDayCount = -90;
                }
                else {
                     AddDayCount = 0;
                } 
                let dd = new Date(); 
                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
                let y = dd.getFullYear(); 
                let m = dd.getMonth()+1;//获取当前月份的日期 
                let d = dd.getDate(); 
                return y+"-"+m+"-"+d; 
            },
            // 选择改变，重调用数据画图形
            allchange: function(){
                this.carryRate();
                this.topStation();
                this.averageRate();
            },
            // 搭乘总人数与总好评率 ，线路总数
            carryRate: function(){
                let beforeDay = this.selectDayFn(this.selectedDay);
                let today = this.selectDayFn(0);
                let that = this;
                $.ajax({
                    type: "GET",
                    url: `${base.gAjaxUrl.shuttlebusdates2}data/`,
                    contentType: 'application/json',
                    data: {
                        start_date: beforeDay, 
                        end_date: today,
                    },
                    success: function(data){
                        // console.log(data);
                        that.ride_num = data.ride_num; 
                        that.per_day_ride_rate = data.per_day_ride_rate;                        
                        that.shuttle_bus_cnt = data.shuttle_bus_cnt; 
                        that.good_comment_rate = data.good_comment_rate * 100; 
                        that.station_cnt = data.station_cnt;
                    },
                    error: function(data){
                        console.log('总数出错了');
                    }
                });
            },
            // 各线路搭载分析
            averageRate : function(){   
                let beforeDayAva = this.selectDayFn(this.selectedDay);   
                let todayAva = this.selectDayFn(0);
                let that = this;
                $.ajax({
                    type: "GET",
                    url: `${base.gAjaxUrl.shuttlebuses2}avg_busline_load_rates/`,
                    contentType: 'application/json',
                    data: {
                        start_date: beforeDayAva, 
                        end_date: todayAva,
                    },
                    success: function(data){
                        let resultDataRate = data[0];
                        let xArr = [];
                        let minrateArr = [];
                        let maxrateArr = [];
                        let avgrateArr = [];
                        let lineLen = data.length;
                        // for (let i = 0; i < lineLen; i++) {/**/
                        for (let [index, elem] of data.entries()) {
                            // console.log(index, elem);
                            // 线路的数量

                            // 线路名称
                            let shuttle_name = elem.shuttle_name;
                            xArr.push(elem.shuttle_name);

                            //最低平均载率  
                            let minrate = (elem.bus_times[0].load_rate * 100).toFixed(1)*1;
                            minrateArr.push(minrate);

                            //最高平均载率
                            let busTimesLen = elem.bus_times.length - 1;
                            let maxrate = (elem.bus_times[busTimesLen].load_rate * 100).toFixed(1)*1;
                            maxrateArr.push(maxrate);

                            // 总平均载率
                            let avgrate = ((minrate + maxrate)/2).toFixed(1)*1;
                            avgrateArr.push(avgrate);
                            // 不能return 因为终止了程序 程序在此次只执行一次而已
                            // return [xArr,minrateArr,maxrateArr,avgrateArr];  
                        }

                        let option = {
                            // backgroundColor: "#344b58",
                            "title": {
                                "text": "线路搭载率",
                                x: "0%",
                                y: "5%",
                                textStyle: {
                                    color: '#666',
                                    fontSize: '18'
                                },
                                // subtext: '线路搭载率',
                                // subtextStyle: {
                                //     color: '#333',
                                //     fontSize: '16',
                                // },
                            },
                            'toolbox': {
                                show : true,
                                orient: 'horizontal',      // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
                                x: '84%',  // 水平安放位置，默认为全图右对齐，可选为：'center' ¦ 'left' ¦ 'right'
                                            // ¦ {number}（x坐标，单位px）
                                y: '5%', // 垂直安放位置，默认为全图顶端，可选为：// 'top' ¦ 'bottom' ¦ 'center'
                                          // ¦ {number}（y坐标，单位px）
                                // 各工具盒的颜色设置
                                color : ['red','blue','blue','green','red','blue','blue','green','black'],
                                feature : {
                                    mark : {show: true},
                                    dataView : {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            "tooltip": {
                                "trigger": "axis",
                                "axisPointer": {
                                    "type": "shadow",
                                    textStyle: {
                                        color: "#fff"
                                    }
                                },
                            },
                            "grid": {
                                "borderWidth": 0,
                                "top": 110,
                                "bottom": 95,
                                textStyle: {
                                    color: "#000"
                                }
                            },
                            "legend": {
                                x: '43%',
                                top: '5%',
                                textStyle: {
                                    color: '#000',
                                },
                                "data": ['最低平均载率', '最高平均载率', '总平均载率']
                            },
                            "calculable": true,
                            "xAxis": [{
                                "type": "category",
                                "axisLine": {
                                    lineStyle: {
                                        color: '#000'
                                    }
                                },
                                "splitLine": {
                                    "show": false
                                },
                                "axisTick": {
                                    "show": false
                                },
                                "splitArea": {
                                    "show": false
                                },
                                "axisLabel": {
                                    "interval": 0,
                                    "rotate":15
                                },
                                "data": xArr,
                                "name": "线路名称"
                                
                                // "axisLabel": {
                                //     interval:0,
                                //     rotate:15
                                // },
                            }],
                            "yAxis": [{
                                "type": "value",
                                "splitLine": {
                                    "show": false
                                },
                                "axisLine": {
                                    lineStyle: {
                                        color: '#000'
                                    }
                                },
                                "axisTick": {
                                    "show": false
                                },
                                "axisLabel": {
                                    "interval": 0,

                                },
                                "splitArea": {
                                    "show": false
                                },
                                "name": "(%)   "
                                // "splitNumber":1,
                                // "min": 0,
                                // "max": 100

                            }],
                            "dataZoom": [{
                                "height": 15,
                                "show" : true,
                                "realtime" : true,
                                "start" : 0,
                                "end" : parseInt((8.0 / avgrateArr.length) * 100),
                                "bottom": 0,
                                "zoomLock": true
                                // 数据缩放锁，默认为false，当设置为true时选择区域不能伸缩，即(end - start)值保持不变，仅能做数据漫游
                            }],
                            "series": [
                            
                            {
                                    "name": "最低平均载率",
                                    "type": "bar",
                                    "stack": "总量",
                                    "barMaxWidth": 35,
                                    "barGap": "10%",
                                    "itemStyle": {
                                        "normal": {
                                            "color": "rgba(255,144,128,1)",
                                            "label": {
                                                "show": true,
                                                "textStyle": {
                                                    "color": "#fff"
                                                },
                                                "position": "insideTop",
                                                formatter: function(p) {
                                                    return (p.value > 0 ? (p.value) : '') + '%';
                                                }
                                            }
                                        }
                                    },
                                    //设置柱的宽度，要是数据太少，柱子太宽不美观~
                　　　　　　　　　　barWidth:32,
                                    "data": minrateArr,
                                },

                                {
                                    "name": "最高平均载率",
                                    "type": "bar",
                                    "stack": "总量",
                                    "itemStyle": {
                                        "normal": {
                                            "color": "rgba(0,191,183,1)",
                                            "barBorderRadius": 0,
                                            "label": {
                                                "show": true,
                                                "position": "top",
                                                formatter: function(p) {
                                                    return (p.value > 0 ? (p.value + '%') : '');
                                                }
                                            }
                                        }
                                    },
                                    //设置柱的宽度，要是数据太少，柱子太宽不美观~
        　　　　　　　　　　        barWidth:30,
                                    "data": maxrateArr
                                }, 
                                {
                                    "name": "总平均载率",
                                    "type": "line",
                                    "stack": "总量",
                                    symbolSize:8,
                                    symbol:'circle',
                                    //设置柱的宽度，要是数据太少，柱子太宽不美观~
        　　　　　　　　　　        barWidth:8,
                                    "itemStyle": {
                                        "normal": {
                                            "color": "#07A5E5",
                                            "barBorderRadius": 0,
                                            "label": {
                                                "show": true,
                                                "position": "top",
                                                formatter: function(p) {
                                                    return (p.value > 0 ? (p.value + '%') : '');
                                                }
                                            }
                                        }
                                    },
                                    "data": avgrateArr
                                },
                            ]
                        };
 
                        let myChart = echarts.init(document.getElementById('main1'));
                        myChart.setOption(option);
                        myChart.on('click', function (params) {
                            // that.isShowLineData = true;
                        });
                    },
                    error: function(data){    
                        console.log('数据列表出错了');
                    }
                });  
            },
            // 搭乘人数最少站点Top20
            topStation: function() {
                let beforeDayAva = this.selectDayFn(this.selectedDay);   
                let todayAva = this.selectDayFn(0);
                $.ajax({
                    type: "GET",
                    url: `${base.gAjaxUrl.shuttlebuses2}avg_stations_signup_nums/`,
                    contentType: 'application/json',
                    data: {
                        start_date: beforeDayAva, 
                        end_date: todayAva,
                        // limit: 20
                    },
                    success: function(data){
                        // console.log(data);
                        // console.log(data.signup_nums);
                        let resultDataStat = data.signup_nums;
                        let xArr = [];
                        let stationNumsArr = [];
                        let lineLen = data.length;
                        // for (let [index, elem] of data.entries()) {
                        for (let [index, elem] of resultDataStat.entries()) {
                            // 站点名称
                            let station_name = elem.station.station_name;
                            xArr.push(station_name);
                            // 各站点搭载人数
                            let avg_signup_num = elem.avg_signup_num;
                            stationNumsArr.push(avg_signup_num); 
                        }

                        let option = {
                            title: {
                                // text: "各站点搭乘人数分析",
                                text: "站点搭乘统计",
                                x: "0%",
                                y: "5%",
                                textStyle: {
                                    color: '#666',
                                    fontSize: '18'
                                },
                                // subtext: '搭乘人数最少站点Top20',
                                // subtextStyle: {
                                //     color: '#333',
                                //     fontSize: '16',
                                // },
                            },
                            tooltip : {
                                trigger: 'axis'
                            },
                            toolbox: {
                                show : true,
                                orient: 'horizontal',    // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
                                x: '84%',  // 水平安放位置，默认为全图右对齐，可选为： 'center' ¦ 'left' ¦ 'right'
                                            // ¦ {number}（x坐标，单位px）
                                y: '5%',   // 垂直安放位置，默认为全图顶端，可选为： 'top' ¦ 'bottom' ¦ 'center'
                                            // ¦ {number}（y坐标，单位px）
                                feature : {
                                    mark : {show: true},
                                    dataView : {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            legend: {
                                // x: '43%',
                                top: '5%',
                                data:['站点搭乘统计',],
                                color:"#d3dee5",
                                // data:['最差站点Top20','平均温度']
                            },
                            "dataZoom": [{
                                "height": 15,
                                "show" : true,
                                "realtime" : true,
                                "start" : 0,
                                "end" : parseInt((10.0 / stationNumsArr.length) * 100),
                                "bottom": 0,
                                "zoomLock": true
                                // 数据缩放锁，默认为false，当设置为true时选择区域不能伸缩，即(end - start)值保持不变，仅能做数据漫游
                            }],
                            xAxis : [
                                {
                                    type : 'category',
                                    data : xArr, //横坐标数据
                                    axisLabel: {
                                        interval:0,
                                        rotate:15
                                    },
                                    name: "站点名称",
                                    color: "#000",
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name : '',
                                    axisLabel : {
                                        formatter: '{value}人'
                                    },
                                    color: "#000",
                                },     
                            ],
                            
                            series : [

                                {
                                    name:'站点搭乘统计',
                                    type:'bar',
                                    data: stationNumsArr,//纵坐标数据
                                    itemStyle: {
                                            normal: {
                                                color: function(params) {
                                                    // build a color map as your need.
                                                    // var colorList = [
                                                    //   '#26C0C0','#F0805A',
                                                    // ];
                                                    //var colorList = [
                                                    //  '#b6a2de','#2ec7c9','#b6a2de','#2ec7c9','#b6a2de',
                                                    //   '#2ec7c9','#b6a2de','#2ec7c9','#b6a2de','#2ec7c9',
                                                    //   '#b6a2de','#2ec7c9','#b6a2de','#2ec7c9','#b6a2de',
                                                    //   '#2ec7c9','#b6a2de','#2ec7c9','#b6a2de','#2ec7c9'
                                                    //];
                                                    return params.dataIndex % 2 == 0 ? '#b6a2de' : '#2ec7c9'
                                                },
                                                label: {
                                                    show: true,
                                                    position: 'top',
                                                    textStyle: {
                                                        color: '#615a5a'
                                                    },
                                                    formatter:function(params){
                                                        if(params.value==0){
                                                            return '';
                                                        }else
                                                        {
                                                            return params.value;
                                                        }
                                                    }
                                                }
                                            }
                                    },
                                    //设置柱的宽度，要是数据太少，柱子太宽不美观~
        　　　　　　　　　　        barWidth:25,
                                },  
                            ]
                        };  
                        let myChart = echarts.init(document.getElementById('main2')); 
                        myChart.setOption(option);
                    },
                    error: function(data){    
                        console.log('数据列表出错了');
                    }
                });
            },
        /*    以下为搭乘统计模块       */ 
            init: function(){

                // //判断是否是第一次进入该新功能或页面从而弹出新功能的提示
                // if(localStorage.rideReportPromptFlag == 'true'){
                //     let arrObj = [$('#searchInput'),$('#departmentSelected'),$('#selectBus'),$('#J-start-date'),$('#J-end-date'),$('#getList'),];
                //     /*$('check'),$('exportData'),*/
                //     let arrTitle = ['内容过多时可以搜索您想要的内容哦','可以选择不同的部门哦','可以选择不同的班次哦','可以选择开始的时间哦','可以选择结束的时间哦','点击这里可以搜索出想要的订单哦，就可以点击导出按钮导出数据了',];
                //     /*'点击这里可以查看到搭乘详情哦','点击这里可以导出想要的订单详情哦',*/
                //     var promptTypes = ['rideReportPromptFlag',];
                //     $.guidance({
                //         obj:arrObj,
                //         title:arrTitle,
                //         flag:promptTypes,
                //     });
                // }
            },
            exportUrl:function(){
                return `${this.downloadXls}&start_date=${this.startDateInput}&end_date=${this.endDateInput}&search=${this.searchInput}&department=${this.departmentSelected}`;
            },
            exportData: function () {
                rideReportOps.param.search = this.searchInput;
                rideReportOps.param.start_date = this.startDateInput;
                rideReportOps.param.end_date = this.endDateInput;
                rideReportOps.param.department = this.departmentSelected;
                // rideReportOps.param.shuttlebus = this.busSelected;
                rideReportOps.param.shuttlebuses = this.busesSelected;
                rideReportOps.param.authorization = `${localStorage['token']}`;
                $.ajax({
                    url: `${this.downloadXls}`,
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(rideReportOps.param)
                })
                .always((data)=>{
                    this.$route.router.go({path: '/job', replace: true})
                })
            },
            selectDialogClose:function(data){
                this.isShowSelectDialog = false;
            },
            selectDialogSave:function(data){
                this.busesSelected = data;
                this.isShowSelectDialog = false;
                this.getList();
            },
            inArray:function(item, array){
                let in_array = false;
                let index;
                for(index in array){
                    if(item==array[index]){
                        in_array = true;
                        break;
                    }
                }
                return in_array;
            },
            //初始化分页
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        rideReportOps.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = true;
                //修改参数
                rideReportOps.param.search = this.searchInput;
                rideReportOps.param.start_date = this.startDateInput;
                rideReportOps.param.end_date = this.endDateInput;
                rideReportOps.param.department = this.departmentSelected;
                // rideReportOps.param.shuttlebus = this.busSelected;
                rideReportOps.param.shuttlebuses = this.busesSelected;


//                $.ajax({
//                    url: `${base.gAjaxUrl.rideReport}?page=${rideReportOps.page}&page_size=${rideReportOps.page_size}`,
//                    contentType: 'application/json',
//                    type: 'POST',
//                    data:JSON.stringify(rideReportOps.param)
//                })
//                .always((data)=>{
//                    base.ajaxCallback(data,()=>{
//                        let resultData = data.results;
//                        this.itemsLoading = false;
//                        this.items = resultData;
//                        if(resultData.length){
//                            this.noData = false;
//                            //回调
//                            callback(data.num_pages);
//                        }else{
//                            this.noData = true;
//                        }
//                    });
//                })
            },
            //获取列表
            getList:function(reset=0){
                let that = this;
                //重置第一页
                if(reset){
                    rideReportOps.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    that.initPage('#J-page',tpageToal,rideReportOps.page)
                });                 
            },
            clickDetail:function(data){
                localStorage.employeeInfo = JSON.stringify(data);
                localStorage.startDate = this.startDateInput;
                localStorage.endDate = this.endDateInput;
            },
            clickExport:function(){
                let ajaxData = {
                    start_date:this.startDateInput,
                    end_date:this.endDateInput
                }
                $.ajax({
                    url: `${base.gAjaxUrl.staffs}export_ride_report/`,
                    type:'get',
                    data:JSON.stringify(rideReportOps.param)
                })
                .always((data)=>{
                    var bb = new Blob([data.content], {type:'application/vnd.ms-excel'});
                    $('#link').attr({download:'a.xls',href:window.URL.createObjectURL(bb)})
                })   
            },
            selectBus: function(){
                this.isShowSelectDialog = true;
            },

            // 以下为票务实时情况
            addDialogClose:function(data){
                this.isShowAddDialog = false;
            },
            stationDialogClose:function(data){
                this.isShowStationDialog = false;
            },
            rideInfoDialogClose:function(data){
                this.isShowRideInfoDialog = false;
            },
            //初始化分页
            RealinitPage:function(obj,tpageToal='4'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:1,
                    callback:(p)=>{
                        rideDetailReportOps.page = p;
                        this.RealqueryAjax();
                    }
                });
            },
            RealqueryAjax:function(callback=function(){}){
                this.RealitemsLoading = true;
                //修改参数
                rideDetailReportOps.param.search = this.searchInput;
                rideDetailReportOps.param.start_date = this.startDateInputReal;
                rideDetailReportOps.param.end_date = this.endDateInputReal;
                rideDetailReportOps.param.shuttle_bus = this.busSelected;

                $.ajax({
                    url: `${base.gAjaxUrl.shuttlebuses2}real_time_info/?page=${rideDetailReportOps.page}&page_size=${rideDetailReportOps.page_size}`,
                    contentType: 'application/json',
                    type: 'POST',
                    data:JSON.stringify(rideDetailReportOps.param)
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        let resultData = data.results;
                        this.RealitemsLoading = false;
                        this.Realitems = resultData;
                        if(resultData.length){
                            this.RealnoData = false;
                            //回调
                            callback(data.num_pages);
                        }else{
                            this.RealnoData = true;
                        }
                    });
                })
            },
            //获取列表
            RealgetList:function(){
                //重置第一页
                rideDetailReportOps.page = 1

                this.RealqueryAjax((tpageToal='4')=>{
                    this.RealinitPage('#J-page-real',tpageToal)
                });
            },
            clickCheck:function(data){
                this.dialogData = data;
                this.isShowAddDialog = true;
            },
            checkStation: function(data){
                this.stationData = data;
                this.isShowStationDialog = true;
            },
            checkRideInfo: function(data){
                this.rideInfoData = data;
                this.isShowRideInfoDialog = true;
            }
        },
        components:{
            passnumber,
            comment,
            selected,
            datacomment,
            station,
            ride,
            singlebus,
            ridereport,
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
