<template>
    <div class="layui-layer1">
    <div class="layui-layer layui-layer1 layui-anim layui-layer-page layui-modify">
        <div class="layui-layer-title">
            <div class="titlecomm f-l f-20 ">单线时间段内统计</div>
            <div class="select-day f-r">
                <div class="pselect f-l titlecomm">选择展示时间</div>
                <select id="selectDayId" v-model="days" class="se-r f-l" @change="setDateRange()">
                    <option value="7" selected = "selected">最近7天</option>
                    <option value="14" >最近14天</option>
                    <option value="30">最近30天</option>
                    <option value="60">最近60天</option>
                    <option value="90">最近90天</option>
                </select>
            </div>
        </div>
        <div class="layui-layer-content layui-layer-content2">
            <div id="load-rates-statistics" class="chart-statistics"></div>
            <div id="load-station-statistics" class="chart-statistics"></div>
            <div id="load-score-statistics" class="chart-statistics"></div>
            <h4><strong>评价列表</strong></h4>
            <div id="mainTable" class="main-table">
                <table class="table table-border table-hover table-bg table-sort radius  table-striped table-bg">
                    <thead>
                        <tr class="text-c bg-comment">
                            <th width="40%" >评论内容</th>
                            <th width="5%">评分</th>
                            <th width="13%">时间</th>
                            <th width="12%">姓名</th>
                            <th width="12%">工号</th>
                            <th width="18%">部门</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-c" v-for="item in comments">
                            <td class="text-l">{{ item.busorercomment_vo.comment }}</td>
                            <td class="c-red-score">{{ item.busorercomment_vo.score }}</td>
                            <td>{{ item.busorercomment_vo.mtime | subTime }}</td>
                            <td>{{ item.staff_vo.real_name }}</td>
                            <td>{{ item.staff_vo.job_number }}</td>
                            <td>{{ item.staff_vo.department_vo.department_name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" @click="close()"></a>
        </span>
    </div>
    </div>
    <div class="layui-layer-shade"></div>
</template>

<style lang="less" scoped>
    .chart-statistics{
        width: 100%;
        height: 400px;
    }
    .table-bg thead th{
        background-color: #C9D2D9;
    }
    .titlecomm{
        color: #000;
    }
    .pselect{
        width: 100px;
    }
    .se-r{
         margin-top: 8px;
         width: 132px;
         margin-left: 25px;
         background: #5cadff;
         border-radius: 20px;
         color: #fff;
         padding-left: 33px;
         height: 26px;
         font-size: 15px;
     }
    .select-day{
         width: 260px;
         height: 42px;
         text-align: center;
     }
    .layui-layer1{
         width: 1200px;
        top: 60px;
        margin-left: -31%;
     }
    .layui-layer1 .layui-layer-content.layui-layer-content2{
         width: 1150px;
         max-width: 1150px;
         height: 750px;
         max-height: 1000px;
         padding-left: 25px;
         padding-top: 20px;
     }
    @media screen and (max-width: 1600px) {
         .layui-layer1{
             width: 1050px;
             max-height: 750px;
         }
         .layui-layer1 .layui-layer-content.layui-layer-content2{
             width: 1022px;
             height: 550px;
             max-height: 600px;
             padding-left: 25px;
         }
    }
    @media screen and (min-width: 3000px) {
        .driver-number ul{
            margin-left: 15%;
        }
    }
</style>
<script>
import * as base from '../assets/js/base.js';
  // 引入基本模板
    let echarts = require('echarts/lib/echarts');

    export default{
        ready () {
            this.setDateRange();
        },
        props: ['data'],
        data:function(){
            return {
                start_date: '',
                end_date: '',
                days: 60,
                line: 'eb427319-34ee-4db7-acb2-e6cfcc72fedc',
                loadRateChart: null,
                loadScoreChart: null,
                loadStationChart: null,
                comments: []
            }
        },
        methods: {
            // 选择日期
            setDateRange: function () {
                this.start_date = this.formatDate(this.days);
                this.end_date = this.formatDate(0);
                this.getLoadRate();
                this.getStationNum();
                this.getScoreRate();
                this.getComments();
            },
            formatDate: function (days) {
                let dd = new Date();
                dd.setDate(dd.getDate()-days);//获取AddDayCount天后的日期
                let y = dd.getFullYear();
                let m = dd.getMonth()+1;//获取当前月份的日期
                let d = dd.getDate();
                return y+"-"+m+"-"+d;
            },
            organizeLoadRateData: function (data) {
                let dates = [];
                let legends = [];
                let series = [];
                for(let [key, value] of data.entries()){
                    let part_time_data = {
                        name: value['departure_time'],
                        type: 'line',
                        data: []
                    };
                    legends.push(value['departure_time']);
                    let dates_ = [];
                    for(let [index, each_day_data] of value['load_rates_and_signup_nums'].entries()){
                        dates_.push(each_day_data['shuttle_bus_date__departure_date']);
                        part_time_data.data.push(each_day_data['load_rate']);
                    }
                    dates = dates_;
                    series.push(part_time_data);
                }
                return {
                    'legends': legends,
                    'dates': dates,
                    'series': series
                }
            },
            organizeStationNumData: function (data) {
                let stations = [];
                let signup_nums = [];
                for(let [key, value] of data.entries()){
                    stations.push(value['station']['station_name']);
                    signup_nums.push(value['avg_ride_num']);
                }
                return {
                    'stations': stations,
                    'signup_nums': signup_nums
                }
            },
            organizeScoreRateData: function (data) {
                let dates = [];
                let avg_scores = [];
                for(let [key, value] of data.entries()){
                    dates.push(value['date']);
                    avg_scores.push(value['avg_score']);
                }
                return {
                    'dates': dates,
                    'avg_scores': avg_scores
                }
            },
            getLoadRate: function () {
                let that = this;
                $.ajax({
                    url: base.gAjaxUrl.shuttlebuses2 + that.line + '/busline_load_rates_and_signup_nums/',
                    type: 'GET',
                    data:{
                        start_date: that.start_date,
                        end_date: that.end_date
                    }
                })
                .success((data)=>{
                    that.initLoadRateChart(that.organizeLoadRateData(data));
                });
            },
            getStationNum: function () {
                let that = this;
                $.ajax({
                    url: base.gAjaxUrl.shuttlebuses2 + that.line + '/avg_busline_stations_ride_nums/',
                    type: 'GET',
                    data:{
                        start_date: that.start_date,
                        end_date: that.end_date
                    }
                })
                .success((data)=>{
                    that.initLoadStationChart(that.organizeStationNumData(data));
                });
            },
            getScoreRate: function () {
                let that = this;
                $.ajax({
                    url: base.gAjaxUrl.shuttlebuses2 + that.line + '/avg_busline_scores/',
                    type: 'GET',
                    data:{
                        start_date: that.start_date,
                        end_date: that.end_date
                    }
                })
                .success((data)=>{
                    that.initLoadScoreChart(that.organizeScoreRateData(data));
                });
            },
            getComments: function () {
                let that = this;
                $.ajax({
                    url: base.gAjaxUrl.shuttlebuses2 + that.line + '/busline_comments/',
                    type: 'GET',
                    data:{
                        start_date: that.start_date,
                        end_date: that.end_date,
                        page_size: 30
                    }
                })
                .success((data)=>{
                    that.comments = data.results;
                });
            },
            close:function(){
                this.$dispatch('dialog-line-close');
            },
            initLoadRateChart: function (data) {
                this.loadRateChart = echarts.init(document.getElementById('load-rates-statistics'));
                let option = {
                    title: {
                        text: '座载率及报名数',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: data['legends']
                    },
                    dataZoom: [{
                                height: 15,
                                show : true,
                                realtime : true,
                                start : 0,
                                end : 15,
                                bottom: 0,
                                zoomLock: true
                            // 数据缩放锁，默认为false，当设置为true时选择区域不能伸缩，即(end - start)值保持不变，仅能做数据漫游
                    }],
                    //右上角工具条
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: data['dates']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: data['series']
                };
                this.loadRateChart.setOption(option);
            },
            initLoadStationChart: function (data) {
                this.loadStationChart = echarts.init(document.getElementById('load-station-statistics'));
                let option = {
                    title: {
                        text: '站点报名人数',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['站点报名人数']
                    },
                    dataZoom: [{
                                height: 15,
                                show: true,
                                realtime: true,
                                start: 0,
                                end: 100,
                                bottom: 0,
                                zoomLock: true
                            // 数据缩放锁，默认为false，当设置为true时选择区域不能伸缩，即(end - start)值保持不变，仅能做数据漫游
                    }],
                    //右上角工具条
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: data['stations']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '站点报名人数',
                            type: 'bar',
                            data: data['signup_nums']
                        }
                    ]
                };
                this.loadStationChart.setOption(option);
            },
            initLoadScoreChart: function (data) {
                this.loadScoreChart = echarts.init(document.getElementById('load-score-statistics'));
                let option = {
                    title: {
                        text: '平均评分',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [],
                        orient: 'vertical',
                        left: 0,
                        selectedMode: 'single'
                    },
                    dataZoom: [{
                                height: 15,
                                show: true,
                                realtime: true,
                                start: 0,
                                end: 15,
                                bottom: 0,
                                zoomLock: true
                            // 数据缩放锁，默认为false，当设置为true时选择区域不能伸缩，即(end - start)值保持不变，仅能做数据漫游
                    }],
                    //右上角工具条
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: data['dates']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '平均评分',
                            type: 'line',
                            data: data['avg_scores']
                        }
                    ]
                };
                this.loadScoreChart.setOption(option);
            },
        },
        filters:{
            subTime: function(e){
                return e.substring(0,11) ;
            }
        }
    }
</script>
