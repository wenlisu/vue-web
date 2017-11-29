<template>
    <div id="officialcar-order-statistics">
	<!--<dateorderdetail></dateorderdetail>-->
        <div id="header">
            <div class="right-section">
                数据展示时间
                <select class="selectDayRange" v-model="selectedDayRange" @change="onChangeStatisticRange()" >
                    <option value="7"  selected = "selected">7天</option>
                    <option value="14">14天</option>
                    <option value="30">30天</option>   
                    <option value="60">60天</option>   
                    <option value="90">90天</option>   
                </select>
                <!--<button id="detailButton" type="button">员工用车明细</button>-->
            </div>
            <div class="profile">
                <div id="order_num" class="profileItem">
                    <div class="profileItemContentArea vc">
                        <span class="profileItemContent">{{ totalOrderNum }}个</span>
                        <span class="profileItemTitle">订单总数</span>
                    </div>
                </div>
                <div id="driving_mileage" class="profileItem">
                    <div class="profileItemContentArea vc">
                        <span class="profileItemContent">{{ totalDrivingMileage }}km</span>
                        <span class="profileItemTitle">总行驶里程</span>
                    </div>
                </div>
                <div id="driving_time" class="profileItem">
                    <div class="profileItemContentArea vc">
                        <span class="profileItemContent">{{ totalDrivingTime }}h</span>
                        <span class="profileItemTitle">总行驶时长</span>
                    </div>
                </div>
            </div>
        </div>
        <!--各部门订单总数-->
        <div class="chart-container">
            <div class=chartTitleContentSeperator></div>
            <div id="department_order_statistics"></div>
        </div>
        <!--每天订单总数-->
        <div class="chart-container">
            <div class=chartTitleContentSeperator></div>
            <div id="company_order_statistics"></div>
        </div>
        <!--订单行驶时间分布-->
		<div class="chart-container">
			<div class=chartTitleContentSeperator></div>
			<span class="chart-title">分布统计</span>
            <div id="order_driving_time_distribution"></div>
        <!--订单行驶距离分布-->
            <div id="order_driving_distance_distribution"></div>
		</div>

		<!--<div class="popup" v-if="showDepartmentOrderDetail">-->
			<!--<departmentorderdetail  id="department-order-detail" class="hide" v-on:popup-close="closePopupDetail(0)"></departmentorderdetail>-->
		<!--</div>-->
    </div>
</template>
<style scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: gray;
	text-align: center;
}
.popup:first-child {
	display: inline-block;
}
#officialcar-order-statistics {
        background-color: rgb(246, 247, 248);
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
    #detailButton {
        width: 100px;
        margin-left: 99px;
        margin-top: 10px;
        background: #5cadff;
        color: #fff;
        height: 26px;
        font-size: 13px;
        border: none;
        border-radius: 4px;
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
        font-size: 28px;
    }

    #order_num {
        background: url(../assets/images/order_num_bg.png);
        background-size: 250px 121px;
    }
    #driving_mileage {
        background: url(../assets/images/driving_mileage_bg.png);
        background-size: 250px 121px;
    }
    #driving_time {
        background: url(../assets/images/driving_time_bg.png);
        background-size: 250px 121px;
    }
    #detailButton {
        display: block;
    }
    .chart-container {
        width: calc( 100% - 20px * 2);
        height: 400px;
        background-color: white;
        border-radius: 10px;
        margin-left: 20px;
        margin-right: 20px;
        margin: 20px;
    }
	.chart-title {
		margin-left: 20px;
		height: 50px;
		font-size: 20px;
		font-weight: bold;
		display: block;
		padding-top: 10px;
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
</style>
<script>
    import * as base from '../assets/js/base.js';
    import departmentorderdetail from './departmentOrderDetail.vue';
    import driverdetaildata from '../components/officialcarDriverDataDetail.vue';
    import vehicledetaildata from '../components/officialcarVehicleDataDetail.vue';
     // 引入基本模板
    let echarts = require('echarts/lib/echarts');

    let departmentOrderStatisticsChart;
    var departmentOrderStatisticsChartOption;
    let companyOrderStatistics;
    var companyOrderStatisticsOption;
    let orderDrivingTimeDistribution;
    var orderDrivingTimeDistributionOption;
    let orderDrivingDistanceDistributionChart;
    var orderDrivingDistanceDistributionOption;

    let ORDER_DISTRIBUTION_TYPE_DRIVING_TIME = 0
    let ORDER_DISTRIBUTION_TYPE_DRIVING_DISTANCE = 1

    function initChart(vm) {
        departmentOrderStatisticsChart = echarts.init(document.getElementById('department_order_statistics'))
        departmentOrderStatisticsChartOption = {
            title: {
                text: '部门订单数',
                padding: [15, 20],
            },
            toolbox: {
                show : true,
                orient: 'horizontal',      // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
                x: '88%',  // 水平安放位置，默认为全图右对齐，可选为：'center' ¦ 'left' ¦ 'right'
                            // ¦ {number}（x坐标，单位px）
                y: '10', // 垂直安放位置，默认为全图顶端，可选为：// 'top' ¦ 'bottom' ¦ 'center'
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
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                width: 20,
            },
            grid: {
                top: 100,
				bottom: 100,
            },
            dataZoom: [{
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 50,
                zoomLock: true,
			},{
				type: 'slider',
				height: 15,
				start: 0,
				end: 50,
				bottom: 10,
				zoomLock: true
			}],
            xAxis: {
                name: '部门',
                type: 'category',
                data: [],
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                }
            },
            yAxis: [{
                type: 'value',
                name: '订单数',
            }],
            series: [{
                type: 'bar',
                name: '订单数',
                data: [],
                barWidth: 50,
                barMinHeight: 1,
                itemStyle: {
                    normal: {
                        color: 'rgb(108, 175, 255)',
                    },
                },
                label: {
                    normal: {
                        position: 'top',
                        show: true
                    }
                },
            }]
        }
        departmentOrderStatisticsChart.setOption(departmentOrderStatisticsChartOption)
        departmentOrderStatisticsChart.on("click", function (params) {
			vm.showDepartmentOrderDetail = true
        })

       companyOrderStatistics  = echarts.init(document.getElementById('company_order_statistics'))
        companyOrderStatisticsOption = {
            title: {
                text: '每日订单数',
                padding: [15, 20],
            },
            toolbox: {
                show : true,
                orient: 'horizontal',      // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
                x: '88%',  // 水平安放位置，默认为全图右对齐，可选为：'center' ¦ 'left' ¦ 'right'
                            // ¦ {number}（x坐标，单位px）
                y: '10', // 垂直安放位置，默认为全图顶端，可选为：// 'top' ¦ 'bottom' ¦ 'center'
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
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                top: 100,
            },
            dataZoom: [{
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 50,
                zoomLock: true,
			},{
				type: 'slider',
				height: 15,
				start: 0,
				end: 50,
				bottom: 10,
				zoomLock: true
			}],
            xAxis: [{
                type: 'category',
                data: ["2017-04-03","2017-04-04","2017-04-05","2017-04-06","2017-04-07"],
                name: '日期',
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                },
            }],
            yAxis: [{
                type: 'value',
                name: '订单数',
            }],
            series: [{
                type: 'line',
                name: '订单数',
                data: [50,60,30,20,90],
				// 折线图拐点形状
				symbol: 'circle',
				symbolSize: 10,
				
				itemStyle: {
					normal: {
                        color: 'rgb(85, 217, 226)',
					},
				},
                lineStyle: {
                    normal: {
                        color: 'rgb(85, 217, 226)',
                    },
                },
                label: {
                    normal: {
                        position: 'top',
                        show: true
                    }
                },
            }]
        }
        companyOrderStatistics.setOption(companyOrderStatisticsOption)
        companyOrderStatistics.on("click", function (params) {
            console.log(params)
        })

        orderDrivingTimeDistribution = echarts.init(document.getElementById('order_driving_time_distribution'))
        orderDrivingTimeDistributionOption = {
            title: {
                text: '时长分布',
                x: 'center',
				y: '60%',

            },
            tooltip: {
                trigger: 'item',
				formatter : function (params) {                         
					return (params.percent - 0).toFixed(0) + '%'
				}
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: ['0-3h','3-12h','12-24h','24h以上']
            },
            series: [{
                type: 'pie',
				radius: ['50%', '70%'],
				center: ['50%', '60%'],
                itemStyle : {
                    normal : {
						label : {
                            position : 'outside',
                            formatter : function (params) {                         
								console.log('formatter')
								console.log(params)
                                return params.name + ' ' + params.percent + '%'
                            }
                        },
                        labelLine : {
                            show : true
                        }
                    },
                  // emphasis : {
                  //     label : {
                  //         show : true,
                  //         formatter : "{b}\n{d}%"
                  //     }
                  // }
                },
                label: {
                    normal: {

                    }
                },
                data: [
                    {value:20, name:'0-3h'},
                    {value:40, name:'3-12h'},
                    {value:30, name:'12-24h'},
                    {value:60, name:'24h以上'}
                ]
            }]
        }
        orderDrivingTimeDistribution.setOption(orderDrivingTimeDistributionOption)

        orderDrivingDistanceDistributionChart = echarts.init(document.getElementById('order_driving_distance_distribution'))
        orderDrivingDistanceDistributionOption = {
            title: {
                text: '里程分布',
                x: 'center',
				y: '60%',
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: ['0-10km','10-50km','50-100km','100km以上']
            },
            tooltip: {
                trigger: 'item',
				formatter : function (params) {                         
					return (params.percent - 0).toFixed(0) + '%'
				}
            },
            series: [{
                type: 'pie',
				radius: ['50%', '70%'],
				center: ['50%', '60%'],
                itemStyle : {
                    normal : {
						label : {
                            position : 'outside',
                            formatter : function (params) {                         
								console.log('formatter')
								console.log(params)
                                return params.name + ' ' + params.percent + '%'
                            }
                        },
                        labelLine : {
                            show : true
                        }
                    },
				},
                data: [
                    {value:20, name:'0-10km'},
                    {value:40, name:'10-50km'},
                    {value:30, name:'50-100km'},
                    {value:60, name:'100km以上'}
                ]
            }]
        }
        orderDrivingDistanceDistributionChart.setOption(orderDrivingDistanceDistributionOption)
    }
    function configureDepartmentOrderStatisticsChart (dayRange) {
        $.ajax({
            url: base.gAjaxUrl.departmentOrderNums,
            type: 'GET',
            data: {
                start_date: base.createDateStringFromNow(-dayRange),
                end_date: base.createDateStringFromNow(0)
            }
        })
        .always((data)=>{
            base.ajaxCallback(data,()=>{
                // let resultData = data.results;
                let departments = data.map(function (item) {
                    // return item.department
                    return item.staff__department__department_name
                })
                departmentOrderStatisticsChartOption.xAxis.data = departments
                console.log(departments)

                let orderNums = data.map(function (item) {
                    // return item.order_num
                    return item.order_num
                })
                departmentOrderStatisticsChartOption.series[0].data = orderNums
                departmentOrderStatisticsChartOption.dataZoom[0].end = (15.0 / data.length).toFixed(2) * 100
                departmentOrderStatisticsChartOption.dataZoom[1].end = (15.0 / data.length).toFixed(2) * 100
                departmentOrderStatisticsChart.setOption(departmentOrderStatisticsChartOption, true)
            });
        })
    }

    function configureOrderStatisticsChart (dayRange) {
        $.ajax({
            url: base.gAjaxUrl.orderNums,
            type: 'GET',
            data: {
                start_date: base.createDateStringFromNow(-dayRange),
                end_date: base.createDateStringFromNow(0)
            }
        })
        .always((data)=>{
            base.ajaxCallback(data,()=>{
                // let resultData = data.results;
                let dates = data.map(function (item) {
                    let dateComponents = item.date.split('-')
                    return dateComponents[1] + '/' + dateComponents[2]
                })
                companyOrderStatisticsOption.xAxis[0].data = dates

                let orderNums = data.map(function (item) {
                    return item.order_num
                })
                companyOrderStatisticsOption.series[0].data = orderNums
                companyOrderStatisticsOption.dataZoom[0].end = (16.0 / data.length).toFixed(2) * 100
                companyOrderStatisticsOption.dataZoom[1].end = (16.0 / data.length).toFixed(2) * 100
                companyOrderStatistics.setOption(companyOrderStatisticsOption, true)
            });
        })
    }

    function configureOrderDistributionWithType (distributionType, dayRange) {
        if (distributionType != ORDER_DISTRIBUTION_TYPE_DRIVING_TIME &&
            distributionType != ORDER_DISTRIBUTION_TYPE_DRIVING_DISTANCE) {
            return
        }
        let distributionCharts = [{
            chart: orderDrivingTimeDistribution,
            option: orderDrivingTimeDistributionOption,
            unit: 'h',
        },{
            chart: orderDrivingDistanceDistributionChart,
            option: orderDrivingDistanceDistributionOption,
            unit: 'km',
        }]
        console.log('requesting distributiopn')
        console.log(base.gAjaxUrl.orderDistributions)
        $.ajax({
            url: base.gAjaxUrl.orderDistributions,
            type: 'GET',
            data: {
                start_date: base.createDateStringFromNow(-dayRange),
                end_date: base.createDateStringFromNow(0),
                distribute_type: distributionType,
            }
        })
        .always((data)=>{
            console.log('result is ')
            console.log(data)

            base.ajaxCallback(data,()=>{
                let chart = distributionCharts[distributionType].chart
                let option = distributionCharts[distributionType].option
                let unit = distributionCharts[distributionType].unit

                // let ranges = data.map(function (item) {
                //     return item.range_start + '-' + item.range_end + unit
                // })

                let percentages = data.map(function (item) {
					let name
					if (item.range_end == 'max') {
						name = item.range_start + unit + '及以上'
					} else {
						name = item.range_start + '-' + item.range_end + unit
					}
                    return {value:item.order_num, name:name}
                })
                let ranges = percentages.map(function (item) {
                    return item.name
                })
                option.legend.data = ranges
                option.series[0].data = percentages
                chart.setOption(option, true)
            });
        })
    }

    function configureCharts(dayRange) {
        configureDepartmentOrderStatisticsChart(dayRange)
        configureOrderStatisticsChart(dayRange)
        configureOrderDistributionWithType(ORDER_DISTRIBUTION_TYPE_DRIVING_TIME, dayRange)
        configureOrderDistributionWithType(ORDER_DISTRIBUTION_TYPE_DRIVING_DISTANCE, dayRange)
    }
    function configureProfile(dayRange, vm) {
        $.ajax({
            url: base.gAjaxUrl.officialcarProfile,
            type: 'GET',
            data: {
                start_date: base.createDateStringFromNow(-dayRange),
                end_date: base.createDateStringFromNow(0)
            }
        })
        .always((data)=>{
            base.ajaxCallback(data,()=>{
                vm.totalOrderNum = data.order_num
                // vm.totalDrivingMileage = (data.driving_mileage / 1000.0).toFixed(2)
                // vm.totalDrivingTime = data.driving_time
                vm.totalDrivingMileage = parseInt(data.driving_mileage / 1000.0)
                vm.totalDrivingTime = parseInt(data.driving_time)
            });
        })
    }
    function configureWithSelectedDayRange(selectedDayRange, vm) {
        configureCharts(selectedDayRange)
        configureProfile(selectedDayRange, vm)
    }
    export default{
        ready () {
            let chartIds = ['department_order_statistics', 'company_order_statistics', 'order_driving_time_distribution', 'order_driving_distance_distribution']
            // base.fixEchartsWidthPercentage(chartIds)
            $('#officialcar-order-statistics').width()
            initChart(this)
            configureWithSelectedDayRange(this.selectedDayRange, this)
        },
        data:function(){
            return {
                selectedDayRange:7,
                totalOrderNum:0,
                totalDrivingMileage:0,
                totalDrivingTime:0,
				showDepartmentOrderDetail: false,
            }
        },
        methods: {
            onChangeStatisticRange: function() {
                configureWithSelectedDayRange(this.selectedDayRange, this)
                // configureDepartmentOrderStatisticsChart(this.selectedDayRange)
                // configureOrderStatisticsChart(this.selectedDayRange)
                // configureOrderDistributionWithType(ORDER_DISTRIBUTION_TYPE_DRIVING_TIME, this.selectedDayRange)
                // configureOrderDistributionWithType(ORDER_DISTRIBUTION_TYPE_DRIVING_DISTANCE, this.selectedDayRange)
            },
			closePopupDetail: function(popupType) {
				if (popupType == 0) {
					this.showDepartmentOrderDetail = false
				}
			},
        },
        events: {
            'tabshow': function() {
                console.log('tab-show')
                departmentOrderStatisticsChart.resize()
                companyOrderStatistics.resize()
                orderDrivingTimeDistribution.resize()
                orderDrivingDistanceDistributionChart.resize()
            },
        },
        components:{
			departmentorderdetail
        }
    }
</script>
