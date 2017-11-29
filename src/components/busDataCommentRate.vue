<template>
    <div class="layui-layer layui-layer1 layui-anim layui-layer-page layui-modify">
        <div class="layui-layer-title">
            <div class="titlecomm f-l f-20 ">通勤车评价</div> 
            <div class="select-day f-r">
                <div class="pselect f-l titlecomm">选择展示时间</div> 
                <select id="selectDayId" v-model="commentSelectedDay" class="se-r f-l" @change="allchange()">
                    <option value="最近7天" selected = "selected">最近7天</option>
                    <option value="最近14天" >最近14天</option>
                    <option value="最近30天">最近30天</option>   
                    <option value="最近60天">最近60天</option>   
                    <option value="最近90天">最近90天</option>   
                </select>
            </div>
        </div>
        <div class="layui-layer-content layui-layer-content2"> 
            <div class="all-coment f-l">
                <div class="imgs f-l">
                    <img src="../assets/images/goodcomment.jpg" alt="">
                </div>
                <div class="comments f-l">
                    <div class="f-l f-20 c-black">总体好评率: &nbsp;&nbsp;</div>
                    <div class="f-l c-red f-20"> {{ good_comment_rate + '%' }} &nbsp;</div>
                </div>
                <div class="imgs f-l">
                </div>
            </div>
            <div id="mainComment" class="main-comment"></div>
            <p class="all-p-red">全部线路的评论如下：</p>
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
                        <tr class="text-c" v-for="item in commentItems">
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
<div class="layui-layer-shade"></div>
</template>

<style lang="less" scoped>
    .table{
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .table-bg thead th{
        background-color: #C9D2D9;
    }
    .c-red-score{
        color: #FD6B6C;
    }
    .titlecomm{
        color: #000;
    }
    .all-p-red{
        color: #ff6e69;
        padding-top:5px;
    }
    .all-coment{
        position: absolute;
        top: 2%;
        left: 2%;
    }
    .pselect{
        width: 100px;
    }
    table tr.bg-comment{
        background-color: #c9d2d9;
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
        max-height: 1000px;
    }
    .layui-layer1 .layui-layer-content.layui-layer-content2{
        width: 1150px;
        max-width: 1150px;
        height: 750px;
        max-height: 1000px;
        padding-left: 25px;
        padding-top: 20px;
    }
    .main-table{
        overflow: auto;
        margin-top: 0px;
        width: 100%;
        height: 56%;
    }
    .main-comment{
        width: 100%;
        height: 38%;
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
        .main-comment{
            width: 100%;
            height: 50%;
        } 
        .main-table{
            height: 38%;
        }
    }
    @media screen and (max-width: 2000px) {
      
    }
</style>
<script>
import * as base from '../assets/js/base.js';
  // 引入基本模板
    let echarts = require('echarts/lib/echarts');

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

    export default{
        ready () {
            let that = this;
            let getData = this.data;
            base.verticalCenter('.layui-modify');
            

            let commentSelectedIndex  = that.commentSelectedIndex
            $("#selectDayId option").eq(commentSelectedIndex).attr("selected","selected").siblings("option").removeAttr("selected");
            let value = $("#selectDayId option").eq(commentSelectedIndex).val();
            that.commentSelectedDay = value;

            that.datapanel();
            that.lineCommentFn();
            window.onresize = function(){
                that.datapanel();
                that.lineCommentFn();
                base.verticalCenter('.layui-modify');
            }
        },
        props: ['commentData'],
        data:function(){
            return {
                title:'2.6万',
                commentSelectedDay: this.commentData,
                commentItems:[],
                // good_comment_rate: "",
                good_comment_rate: JSON.parse(localStorage['good_comment_rate']),
                commentSelectedIndex: JSON.parse(localStorage['selectindex']),
            }
        },
        methods: {
            // 选择日期
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
            allchange: function(){
                this.datapanel();
                this.lineCommentFn();
                this.carryRate();
            },
            carryRate: function(){
                let beforeDay = this.selectDayFn(this.commentSelectedDay);
                let today = this.selectDayFn(0);;
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
                        // that.ride_num = data.ride_num; 
                        // that.per_day_ride_rate = data.per_day_ride_rate;
                        // that.shuttle_bus_cnt = data.shuttle_bus_cnt; 
                        that.good_comment_rate = data.good_comment_rate * 100; 
                        // that.station_cnt = data.station_cnt;
                    },
                    error: function(data){
                        console.log('总数出错了');
                    }
                });
            },
            datapanel: function(){
                let beforeDayAva = this.selectDayFn(this.commentSelectedDay);   
                let todayAva = this.selectDayFn(0);

                $.ajax({
                    type: "GET",
                    url: `${base.gAjaxUrl.shuttlebuses2}avg_busline_praise_rates/`,
                    contentType: 'application/json',
                    data: {
                        start_date: beforeDayAva, 
                        end_date: todayAva,
                    },
                    success: function(data){
                        let xArr = [];
                        let avgPraiseRateArr = [];
                        let lineLen = data.length;
                        for (let [index, elem] of data.entries()) {
                            // 线路名称
                            let shuttle_name = elem.shuttle_bus.shuttle_name;
                            xArr.push(shuttle_name);

                            //好评率  
                            let avg_praise_rate = (elem.avg_praise_rate) * 100;
                            avgPraiseRateArr.push(avg_praise_rate); 
                        }
                        let option = {
                            tooltip : {
                                trigger: 'axis'
                            },
                            toolbox: {
                                show : true,
                                orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                                           // 'horizontal' ¦ 'vertical'
                                x: '1350',                // 水平安放位置，默认为全图右对齐，可选为：
                                                           // 'center' ¦ 'left' ¦ 'right'
                                                           // ¦ {number}（x坐标，单位px）
                                y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                                           // 'top' ¦ 'bottom' ¦ 'center'
                                                           // ¦ {number}（y坐标，单位px）
                                feature : {
                                    mark : {show: true},
                                    dataView : {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            calculable : true,
                            legend: {
                                data:['好评率',],
                                color:"#000",
                                // data:['最差站点Top20','平均温度']
                            },
                            dataZoom: [{
                                height: 15,
                                show : true,
                                realtime : true,
                                start : 30,
                                end : 60,
                                bottom: 0,
                                zoomLock: true
                            // 数据缩放锁，默认为false，当设置为true时选择区域不能伸缩，即(end - start)值保持不变，仅能做数据漫游
                            }],
                            xAxis : [
                                {
                                    type : 'category',
                                    data : xArr,
                                    axisLabel: {
                                        interval:0,
                                        rotate:15
                                    },
                                    name : "线路名称"
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name : '( % )',
                                    axisLabel : {
                                        formatter: '{value}%'
                                    }
                                },
                               
                            ],
                            
                            series : [

                                {
                                    name:'好评率',
                                    type:'bar',
                                    data: avgPraiseRateArr,
                                    itemStyle: {
                                            normal: {
                                                color: function(params) {
                                                    // build a color map as your need.
                                                    // var colorList = [
                                                    //   '#C1232B',
                                                    // ];
                                                    var colorList = [
                                                      '#fd6b6b','#ffb5bc','#fd6b6b','#ffb5bc','#fd6b6b',
                                                       '#ffb5bc','#fd6b6b','#ffb5bc','#fd6b6b','#ffb5bc',
                                                       '#fd6b6b','#ffb5bc','#fd6b6b','#ffb5bc','#fd6b6b',
                                                       '#ffb5bc','#fd6b6b','#ffb5bc','#fd6b6b','#ffb5bc'
                                                    ];
                                                    return params.dataIndex % 2 == 0 ? '#fd6b6b' : '#ffb5bc'
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
                       
                        let myChart = echarts.init(document.getElementById('mainComment')); 
                        myChart.setOption(option);
                    }
                });
                
            },
            lineCommentFn: function(){
                let beforeDayComment = this.selectDayFn(this.commentSelectedDay);   
                let todayComment = this.selectDayFn(0);
                let that = this;
                $.ajax({
                    type: "GET",
                    url: `${base.gAjaxUrl.shuttlebuses2}comments/?page=${carpoolOps.page}&page_size=${carpoolOps.page_size}`,
                    // url: `${base.gAjaxUrl.shuttlebuses2}${pk}/busline_comments/`,
                    contentType: 'application/json',
                    data: {
                        start_date: beforeDayComment, 
                        end_date: todayComment,
                    },
                    success: function(data){
                        // console.log("succes!!");
                        // console.log(data);
                        // console.log(data.results);
                        that.commentItems = data.results;   
                    }
                });
            },
            close:function(){
                this.$dispatch('dialog-comment-close');
            },
        },
        filters:{
            subTime: function(e){
                return e.substring(0,11) ;
            }
        }
    }
</script>
