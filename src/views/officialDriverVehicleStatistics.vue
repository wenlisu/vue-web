<template>
    <div id="driver-vehicle-statistics">
        <driverdetaildata  :data="passData" v-if="isShowDriverDetailDialog" v-on:dialog-pass-close="cancelDriverDetailDialog"></driverdetaildata>
        <vehicledetaildata  :data="passVehicleData" v-if="isShowVehicleDetailDialog" v-on:dialog-vehicle-close="cancelVehicleDetailDialog"></vehicledetaildata>
        <!--<div id="driver_vehicle_statistics">-->
            <div id="header">
                <div class="right-section">
                    数据展示时间
                    <select id="selectId" class="selectDayRange" v-model="days" @change="setDateRange()" >
                        <option value="7"  selected = "selected">7天</option>
                        <option value="14">14天</option>
                        <option value="30">30天</option>   
                        <option value="60">60天</option>   
                        <option value="90">90天</option>   
                    </select>
                </div>

                <!--<div class="time-selection-section">-->
                    <!--<p class="p-time">选择数据展示时间</p> -->
                    <!--<select id="selectId" v-model="days" class="se-r" @change="setDateRange()">-->
                        <!--<option value="7"  selected = "selected">最近7天</option>-->
                        <!--<option value="14">最近14天</option>-->
                        <!--<option value="30">最近30天</option>   -->
                        <!--<option value="60">最近60天</option>   -->
                        <!--<option value="90">最近90天</option>   -->
                    <!--</select>-->
                <!--</div>-->

                <div id="profile" class="profile">

                    <div id="order_num" class="profileItem">
                        <div class="profileItemContentArea vc">
                            <span class="profileItemContent">{{ driver_num }}个</span>
                            <span class="profileItemTitle">司机人数</span>
                        </div>
                    </div>
                    <!-- <div class=""></div> -->
                    <div id="driving_mileage" class="profileItem">
                        <div class="profileItemContentArea vc">
                            <span class="profileItemContent">{{ order_num }}单</span>
                            <span class="profileItemTitle">跑单总数</span>
                        </div>
                    </div>
                    <!-- <div class=""></div> -->
                    <div id="driving_time" class="profileItem">
                        <div class="profileItemContentArea vc">
                            <span class="profileItemContent">{{ car_num }}辆</span>
                            <span class="profileItemTitle">车辆数量</span>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="chart-container">
                <div class=chartTitleContentSeperator></div>
                <!--司机订单统计-->
                <div id="driver_statistics" class="driver-statistics"></div>
            </div>
            <div class="chart-container">
                <div class=chartTitleContentSeperator></div>
                <!--车辆订单统计-->
                <div id="vehicle_statistics" class="vehicle-statistics"></div>
            </div>
    
        <!--</div>-->
    </div>
</template>
<style lang="less" scoped>
    #driver-vehicle-statistics {
        background-color: rgb(246, 247, 248);
    }
    .time-selection-section {
        width: 20%;
        position: relative;
        left: 80%;
    }
    .big-box{
        width:100%;
        height:94%;
        overflow: auto;
        background-color: #F7F7F7;
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
    .p-time{
        padding-top: 120px;
        padding-left: 30px;
    }
    #header {
        height: 200px;
    }
    .right-section {
        width: 20%;
        position: relative;
        left: 80%;
        top: 20px;
    }
    .selectDayRange {
        width: 100px;
        margin-left: 10px;
        background: #5cadff;
        color: #fff;
        height: 26px;
        font-size: 15px;
        border: none;
        text-align: center;
    }
    .vc {
        position: relative; /*脱离文档流*/
        top: 50%; /*偏移*/
        transform: translateY(-50%);
    }
    .profile {
        text-align: center;
        height: inherit;
        margin-top: 38px;
    }
    .profile span {
        display: block;
    }
    .profileItem {
        width:250px;
        height:121px;
        display: inline-block;
        margin: 0 10px;
    }
    .profileItemContentArea {
        text-align: left;
        padding-left: 15px;
    }
    .profileItemTitle {
        color: white;
        font-size: 15px;
    }
    .profileItemContent {
        color: white;
        font-size: 30px;
    }
    #order_num {
        background: url(../assets/images/vehicle_data_driver.png);
        background-size: 250px 121px;
    }
    #driving_mileage {
        background: url(../assets/images/vehicle_data_order.png);
        background-size: 250px 121px;
    }
    #driving_time {
        background: url(../assets/images/vehicle_data_distance.png);
        background-size: 250px 121px;
    }
    #detailButton {
        display: block;
    }
    .chart-container {
        height: 400px;
        background-color: white;
        border-radius: 10px;
        margin-left: 20px;
        margin-right: 20px;
        margin: 20px;
    }
    .chartTitleContentSeperator {
        position: relative;
        top: 50px;
        width: 100%;
        height: 1px;
        background-color: rgb(225, 234, 242);
    }
    #department_order_statistics {
        width: 100%;
        height: 400px;
    }
    #company_order_statistics {
        width: 100%;
        height: 400px;
    }
    #order_driving_time_distribution {
        width: 45%;
        height: 300px;
        float: left;
    }
    #order_driving_distance_distribution {
        width: 45%;
        height: 300px;
        float: right;
    }

    #profile span {
        display: block;
    }
    #driver_statistics {
        width: 100%;
        height: 400px;
    }
    .driver-statistics{
        border-radius: 5px;
        background-color: #fff;
    }
    .driver-statistics-box{
        border-radius: 8px;
        background-color: #fff;
        margin: 0 12px;
        width: 100%;
    }
    .vehicle-statistics-box{
        border-radius: 8px;
        margin-top: 10px;
        background-color: #fff;
        margin: 0 12px;
        width: 100%;
    }
    #vehicle_statistics {
        width: 100%;
        height: 400px;
    }
    .vehicle-statistics{
        border-radius: 5px;
        background-color: #F7F7F7;
    }
    .circle{
        width: 11%;
        height: 165px;
        overflow: hidden;
        float: right;
        // margin-left: 10.5%;
        margin-left: 5%;
        margin-right: 5%;
        border: 0;
    }
    .circle-last{
        margin-left: 0%;
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
        border: none;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    import echarts from 'echarts';
    import driverdetaildata from '../components/officialcarDriverDataDetail.vue';
    import vehicledetaildata from '../components/officialcarVehicleDataDetail.vue';

function arrayCorresponAdd(a, b) {
    if(a.length != b.length) {
        alert('数组长度不相等');
        return;
    }
    var newArray = []
    for(var i=0;i<a.length;i++){
        newArray.push(a[i]+b[i])
    }
    return newArray;
}
    export default{
        ready () {
            let chartIds = ['driver_statistics', 'vehicle_statistics'];
            // base.fixEchartsWidthPercentage(chartIds);
            this.driverChart = echarts.init(document.getElementById('driver_statistics'));
            this.vehicleChart = echarts.init(document.getElementById('vehicle_statistics'));
            this.setDateRange();
            window.onresize = function(){
                this.setDateRange();
            }
        },
        data: function(){
            return {
                driverChart: null,
                vehicleChart: null,
                driverData: '',
                vehicleData: '',
                days: 7,
                start_date: '',
                end_date: '',
                isShowDriverDetailDialog: false,
                isShowVehicleDetailDialog: false,
                driverIdsArr: [],
                passData: '',
                vehicleIdsArr: [],
                passVehicleData: '',
                //车辆总数
                car_num: 0,
                //订单总数
                order_num: 0,
                //司机总数
                driver_num: 0
            }
        },
        methods: {
            cancelDriverDetailDialog:function(){
                this.isShowDriverDetailDialog = false;
            },
            cancelVehicleDetailDialog:function(){
                this.isShowVehicleDetailDialog = false;
            },
            getBaseData: function () {
                let that = this;
                $.ajax({
                    url: base.gAjaxUrl.officialcarorders + 'driver_vehicle_profile/',
                    type: 'GET',
                    data:{
                        start_date: that.start_date,
                        end_date: that.end_date
                    }
                })
                .success((data)=>{
                    that.car_num = data.car_num;
                    that.order_num = data.order_num;
                    that.driver_num = data.driver_num;
                });
            },
            setDateRange: function () {
                this.start_date = this.formatDate(this.days);
                this.end_date = this.formatDate(0);
                this.queryAjax();
                this.getBaseData();
                localStorage.officialCarData = this.days;
                let x = document.getElementById("selectId").selectedIndex;
                localStorage.selectindex = x;
            },
            formatDate: function (days) {
                let dd = new Date();
                dd.setDate(dd.getDate()-days);//获取AddDayCount天后的日期
                let y = dd.getFullYear();
                let m = dd.getMonth()+1;//获取当前月份的日期
                let d = dd.getDate();
                return y+"-"+m+"-"+d;
            },
            organizationDriverData: function (data) {
                let driver = [];
                let order_num = [];
                let driver_time = [];
                let driving_mileage = [];
                let driverIds = [];
                for(let [index, elem] of data.entries()){
                    driver.push(elem.driver.staff_vo.real_name);
                    order_num.push(elem['order_num']);
                    driver_time.push(elem['driver_time']);
                    driving_mileage.push(elem['driving_mileage']);
                    driverIds.push(elem.driver.id)
                }
                let result = {
                    'driver': driver,
                    'order_num': order_num,
                    'driver_time': driver_time,
                    'driving_mileage': driving_mileage,
                    'driverIds': driverIds
                };
                return result;
            },
            organizationVehicleData: function (data) {
                let vehicle = [];
                let driving_outside_mileage = [];
                let driver_time = [];
                let driver_mileage = [];
                let driverIds = [];
                for(let [index, elem] of data.entries()){
                    vehicle.push(elem.vehicle.car_no);
                    driving_outside_mileage.push(elem['driving_outside_mileage']);
                    driver_time.push(elem['driver_time']);
                    driver_mileage.push(elem['driving_order_mileage']);
                    driverIds.push(elem.vehicle.id)
                }
                let result = {
                    'vehicle': vehicle,
                    'driving_outside_mileage': driving_outside_mileage,
                    'driver_time': driver_time,
                    'driving_order_mileage': driver_mileage,
                    'driverIds': driverIds
                };
                return result;
            },
            queryAjax:function(){
                let that = this;
                $.ajax({
                    url: base.gAjaxUrl.officialcardrivers + 'driver_statistics/',
                    type: 'GET',
                    data:{
                        start_date: that.start_date,
                        end_date: that.end_date
                    }
                })
                .success((data)=>{
                    let driver_data = that.organizationDriverData(data);
                    that.initDriverChart(driver_data)
                });

               $.ajax({
                   url: base.gAjaxUrl.officialcarvehicles + 'vehicle_statistics/',
                   type: 'GET',
                   data:{
                       start_date: that.start_date,
                       end_date: that.end_date
                   }
               })
               .success((data)=>{
                   let driver_data = that.organizationVehicleData(data);
                   that.initVehicleChart(driver_data)
               })
            },
            initDriverChart: function (driver_data) {
                this.driverChart = echarts.init(document.getElementById('driver_statistics'));
                this.driverChart.setOption({
                    "title": {
                        "text": "司机跑单统计",
                        padding: [15, 20],
                        // textStyle: {
                        //     color: '#666',
                        //     fontSize: '18'
                        // },
                    },
                    color: ['#445e75', '#45a7ca', '#98d5ef'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['订单数', '行驶时长(h)', '行驶里程(km)'],
                        top: '15',
                        textStyle: {
                            // color: '#000',
                            fontSize: 15
                        },
                    },
                    grid: {
                        // left: '3%',
                        // right: '4%',
                        // bottom: '11%',
                        top: 100,
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: driver_data.driver,
                        axisLabel: {
                                    interval: 0,
                                    rotate: 15
                                },
                        name: "司机"
                    }],
                    yAxis: [{
                        show : false,
                        type: 'value',
                        name: '订单数',
                    }],
                    dataZoom: [{
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 0,
                        end: (10.0 / driver_data.driver.length).toFixed(2) * 100,
                        zoomLock: true,
                    },{
                        type: 'slider',
                        xAxisIndex: [0],
                        start: 0,
                        end: (10.0 / driver_data.driver.length).toFixed(2) * 100,
                        height: 15,
                        bottom: 10,
                        zoomLock: true,
                    }],
                    series: [{
                        name: '订单数',
                        type: 'bar',
                        data: driver_data.order_num,
                        //设置柱的宽度，要是数据太少，柱子太宽不美观~
                　　　　barWidth:20,
                        barMinHeight: 1,
                    }, {
                        name: '行驶时长(h)',
                        type: 'bar',
                        data: driver_data.driver_time,
                        barWidth:20,
                        barMinHeight: 1,
                    }, {
                        name: '行驶里程(km)',
                        type: 'bar',
                        data: driver_data.driving_mileage,
                        barWidth:20,
                        barMinHeight: 1,
                    }]
                });
                let driverIdsArr = driver_data.driverIds;
                let that = this;
                that.driverChart.on('click', function (params) {
                    that.isShowDriverDetailDialog = true;
                    that.passData = driverIdsArr[params.dataIndex];
                });
            },
            initVehicleChart: function (driver_data) {
                console.log(driver_data)
                console.log(arrayCorresponAdd(driver_data.driving_outside_mileage,driver_data.driving_order_mileage))
                this.vehicleChart = echarts.init(document.getElementById('vehicle_statistics'));
                this.vehicleChart.setOption({
                    "title": {
                        "text": "车辆跑单情况",
                        // x: "5%",
                        // y: "5%",
                        padding: [15, 20],
                        // textStyle: {
                        //     color: '#666',
                        //     fontSize: '18'
                        // },
                    },
                    color: ['#445e75', '#45a7ca', '#98d5ef'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['订单里程(km)', '行驶时长(h)', '行驶里程(km)'],
                        top: '15',
                        textStyle: {
                            fontSize: 15
                        },
                    },
                    grid: [{
                        // left: '3%',
                        // right: '4%',
                        // bottom: '11%',
                        top: 100,
                        containLabel: true
                    }],
                    calculable: true,
                    xAxis: [{

                        type: 'category',
                        data: driver_data.vehicle,
                        gridIndex: 0,
                        name: "车辆",
                        axisLabel: {
                            interval: 0,
                            rotate: 30,
                        },
                    }],
                    yAxis: [{
                        show : false,
                        type: 'value',
                        name: '订单数',
                        gridIndex: 0,
                        nameGap: 30,
                        nameTextStyle: {
                            fontWeight: 'bold',
                            fontSize: '14',
                        }
                    }],
                    dataZoom: [{
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 0,
                        end: (10.0 / driver_data.vehicle.length).toFixed(2) * 100,
                        zoomLock: true,
                    },{
                        type: 'slider',
                        xAxisIndex: [0],
                        start: 0,
                        end: (10.0 / driver_data.vehicle.length).toFixed(2) * 100,
                        bottom: 10,
                        height: 15,
                        zoomLock: true,
                    }],
                    series: [{
                        name: '订单里程(km)',
                        type: 'bar',
                        data: driver_data.driving_order_mileage,
                        barWidth:20,
                    }, {
                        name: '行驶时长(h)',
                        type: 'bar',
                        data: driver_data.driver_time,
                        barWidth:20,
                    }, {
                        name: '行驶里程(km)',
                        type: 'bar',
                        data: arrayCorresponAdd(driver_data.driving_outside_mileage,driver_data.driving_order_mileage),
                        barWidth:20,
                    }]
                });
                
                let vehicleIdsArr = driver_data.driverIds;
                let that = this;
                that.vehicleChart.on('click', function (params) {
                    that.isShowVehicleDetailDialog = true;
                    that.passVehicleData = vehicleIdsArr[params.dataIndex];
                });
            }
        },
        events: {
            'tabshow': function() {
                console.log('tab-show')
                this.driverChart.resize();
                this.vehicleChart.resize()
            },
        },
        components:{
            driverdetaildata,
            vehicledetaildata
        }
    }
</script>
