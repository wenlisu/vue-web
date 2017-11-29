// 引入页面！
import welcome from './views/welcome';      //欢迎页
import login from './views/login';      //登录
import register from './views/register';      //注册
import modifypassword from './views/modifypassword';      //修改密码
import employee from './views/employee';      //员工管理
import department from './views/departments';  //部门管理
import company from './views/company';        //公司管理
import busManagement from './views/busManagement';        //巴士管理
import monthlyTicket from './views/monthlyTicket';        //月票
import saleable from './views/saleable';        //售票
import rideReport from './views/rideReport';        //员工搭乘统计
import rideDetailReport from './views/rideDetailReport';        //员工搭乘统计
import busInfoReport from './views//busInfoReport';  //班车统计
import busDetailReport from './views/busDetailReport';  //班车统计
import notice from './views/notice';  //公告
import publish from './views/publish';  //发公告
import orderManagement from './views/orderManagement';  //订单管理
import assignDriver from './views/assignDriver';  //司机列表
import assignCar from './views/assignCar';  //车辆列表
import driverReport from './views/driverReport';   //司机用车统计
import driverDetailReport from './views/driverDetailReport';   //司机用车统计详细
import employeeReport from './views/employeeReport';   //员工用车统计
import employeeDetailReport from './views/employeeDetailReport';   //员工用车统计详细
import vehicleReport from './views/vehicleReport';   //车辆统计
import vehicleDetailReport from './views/vehicleDetailReport';   //车辆统计详细
import vehicle from './views/vehicle';
import driver from './views/driver';
import job from './views/job';
import busVehicle from './views/busVehicle';
import busDriver from './views/busDriver';
import busRealTimeInfo from './views/busRealTimeInfo';
import timeapply from './views/timeapply'; //时间申请规则
import approver from './views/approver.vue';
import vehicleConfiguration from './views/vehicleConfiguration.vue';//公务车车辆配置
import orderLargeScreenDisplay from './views/orderLargeScreenDisplay.vue';//公务车车辆配置
import busDataPanel from './views/busDataPanel.vue';//通勤车数据面板展示
import officialcarDataPanel from './views/officialcarDataPanel.vue';//公务车数据面板展示
import repairmen from './views/repairmen.vue';//设置公共报修项目审批人
import publicRepairtypes from './views/publicRepairtypes.vue';//公共报修项目类型
import setDormitoryApprovers from './views/setDormitoryApprovers.vue';//设置公共报修项目审批人
import pubrepairorders from './views/pubrepairorders.vue';//设置公共报修项目审批人
import faultitems from './views/faultitems.vue';//设置公共报修项目审批人
import infoReport from './views/infoReport.vue';//维修材料统计列表
import longStayApply from './views/longStayApply.vue';//长住申请
import materials from './views/materials.vue';//维修材料
import repairorders from './views/repairorders.vue';//宿舍维修单
import buildings from './views/buildings.vue';//宿舍楼列表
import roomtypes from './views/roomtypes.vue';//房间类型列表
import roommessages from './views/roommessages.vue';//房间类型列表
import housingrecords from './views/housingrecords.vue';//房间类型列表

export default function(router){
    router.map({
        '/welcome':{
            name:'welcome',
            component:welcome
        },
        '/login':{
            name:'login',
            component:login
        },
        '/register':{
            name:'register',
            component:register
        },
        '/modifypassword':{
            name:'modifypassword',
            component:modifypassword
        },
        '/notice':{
            name:'notice',
            component:notice
        },
        '/employee':{
            name:'employee',
            component:employee
        },
        '/vehicle':{
            name:'vehicle',
            component:vehicle
        },
        '/driver':{
            name:'driver',
            component:driver
        },
        '/department': {
            name:'department',
            component: department
        },
        '/company': {
            name:'company',
            component: company
        },
        '/busVehicle':{
            name:'busVehicle',
            component:busVehicle
        },
        '/busDriver':{
            name:'busDriver',
            component:busDriver
        },
        '/busManagement': {
            name:'busManagement',
            component: busManagement
        },
        '/monthlyTicket': {
            name:'monthlyTicket',
            component: monthlyTicket
        },
        '/saleable': {
            name:'saleable',
            component: saleable
        },
        '/rideReport': {
            name:'rideReport',
            component: rideReport
        },
        '/rideDetailReport': {
            name:'rideDetailReport',
            component: rideDetailReport
        },
        '/busInfoReport': {
            name:'busInfoReport',
            component: busInfoReport
        },
        '/busDetailReport': {
            name:'busDetailReport',
            component: busDetailReport
        },
        '/publish': {
            name:'publish',
            component: publish
        },
        '/orderManagement': {
            name:'orderManagement',
            component: orderManagement
        },
        '/assignDriver': {
            name:'assignDriver',
            component: assignDriver
        },
        '/assignCar': {
            name:'assignCar',
            component: assignCar
        },
        '/driverReport': {
            name:'driverReport',
            component: driverReport
        },
        '/driverDetailReport': {
            name:'driverDetailReport',
            component: driverDetailReport
        },
        '/employeeReport': {
            name:'employeeReport',
            component: employeeReport
        },
        '/employeeDetailReport': {
            name:'employeeDetailReport',
            component: employeeDetailReport
        },
        '/vehicleReport': {
            name:'vehicleReport',
            component: vehicleReport
        },
        '/vehicleDetailReport': {
            name:'vehicleDetailReport',
            component: vehicleDetailReport
        },
        '/job': {
            name: 'job',
            component: job
        },
        '/busRealTimeInfo': {
            name: 'busRealTimeInfo',
            component: busRealTimeInfo
        },
        '/timeapply': {
            name:'timeapply',
            component:timeapply
        },
        '/approver': {
            name: 'approver',
            component: approver
        },
        '/vehicleConfiguration':{
            name: 'vehicleConfiguration',
            component: vehicleConfiguration
        },
        '/busDataPanel':{
            name: 'busDataPanel',
            component: busDataPanel
        },
        '/orderLargeScreenDisplay':{
            name: 'orderLargeScreenDisplay',
            component: orderLargeScreenDisplay
        },
        '/officialcarDataPanel':{
            name: 'officialcarDataPanel',
            component: officialcarDataPanel
        },
        '/repairmen':{
            name: 'repairmen',
            component: repairmen,
        },
        '/publicRepairtypes':{
            name: 'publicRepairtypes',
            component: publicRepairtypes,
        },
        '/setDormitoryApprovers':{
            name: 'setDormitoryApprovers',
            component: setDormitoryApprovers
        },
        '/pubrepairorders':{
            name: 'pubrepairorders',
            component: pubrepairorders
        },
        '/faultitems':{
            name: 'faultitems',
            component: faultitems
        },
        '/infoReport':{
            name: 'infoReport',
            component: infoReport
        },
        '/materials':{
            name: 'materials',
            component: materials
        },
        '/repairorders':{
            name: 'repairorders',
            component: repairorders
        },
        '/buildings':{
            name: 'buildings',
            component: buildings
        },
        '/roomtypes':{
            name: 'roomtypes',
            component: roomtypes
        },
        '/roommessages':{
            name: 'roommessages',
            component: roommessages
        },
        '/housingrecords':{
            name: 'housingrecords',
            component: housingrecords
        },
        '/longStayApply':{
            name: 'longStayApply',
            component: longStayApply
        },
    });
    router.redirect({
        '*':"/welcome"
    });
}
