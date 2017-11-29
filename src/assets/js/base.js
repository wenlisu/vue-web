/*
*	ajax返回处理
*/
export function ajaxCallback(data,callback=function(){}) {
	let statusErrorRule = /^4\d{2}$/;
	let	statusSuccessule = /^2\d{2}$/;
    let layerMessage = '';

	if (statusErrorRule.test(data.status)) {
		let dataResponseText = JSON.parse(data.responseText).detail;

		if(dataResponseText.code == 'AUTH_FAIL'){
			localStorage.removeItem("token");
			window.location.href='/#!/login'
			layerMessage = dataResponseText.msg;
		}else if(dataResponseText.msg){
			layerMessage = dataResponseText.msg;
		}else if(dataResponseText.non_field_errors){
			layerMessage = dataResponseText.non_field_errors[0];
		}else if(data.responseJSON.detail.non_field_errors){
			layerMessage = data.responseJSON.detail.non_field_errors;
		}else if(dataResponseText[0]){
			layerMessage = dataResponseText.join(',')
		}else{
			layerMessage = '请求错误'
		}
		layer.msg(layerMessage,{icon:2,time:1000});
	}else{
		callback();
	}
}

export function fixEchartsWidthPercentage (chartIds){
    chartIds.forEach(function(value, index, array) {
        let el = document.getElementById(value)
        let computedWidth = window.getComputedStyle(el, null).getPropertyValue("width")
        console.log('computed width: ' + computedWidth)
        $('#'+value).css('width', computedWidth)
        //let chartParent = $('#'+value).parent()
        //let chartWidth = $('#'+value).css('width')
        //let parentWidth = chartParent.width()
        //console.log('get real width')
        //let realWidth = getNearestValidWidthAncestorWidth(chartParent)
        //console.log('real width')
        //console.log(realWidth)
        //if (chartWidth.indexOf('%') > 0) {
            //// width为百分比,转换为具体数值
            //chartWidth = chartWidth.replace('%', '')
            //realWidth = parseInt(chartWidth) * parentWidth / 100
        //}
        //$('#'+value).css('width', realWidth)
    })
}

function getNearestValidWidthAncestorWidth(el) {
    console.log('get width from')
    console.log(el)
    if (el.width() == 0) {
        return getNearestValidWidthAncestorWidth(el.parent())
    } else {
        return el.width()
    }
}
export function dateRangeWithDay (day){

}

export function createDateStringFromNow(day){
    let now = new Date();
    let newValue = now.valueOf() + day * 24 * 60 * 60 * 1000;
    let newDate = new Date(newValue);
    return dateStringWithDate(newDate);
}

export function dateStringWithDate(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    return y + "-" + m + "-" + d;
}

export function dateZeroFill(num){
    if(num>=10){
        return num;
    }else{
        return `0${num}`;
    }
}

export function verticalCenter(obj){
    $(obj).css({
        position:'absolute',
        left: ($(window).width() - $(obj).outerWidth())/2,
        // top: ($(window).height() - $(obj).outerHeight())/2 + $(document).scrollTop(),
        top: '20px',
        margin:0
    });
}
export function cutString(str, len) {
    if(str.length*2 <= len) {
        return str;
    }
    var strlen = 0;
    var s = "";
    for(var i = 0;i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if(strlen >= len){
                return s.substring(0,s.length-1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if(strlen >= len){
                return s.substring(0,s.length-2) + "...";
            }
        }
    }
    return s;
}

export function isUrgent(data){
    if(data){
        return '<span class="red">是</span>';
    }else{
        return  '否';
    }
}

export function compareDate(strDate1, strDate2) {
    var date1 = strDate1.replace(/\-/g, "")
    var date2 = strDate2.replace(/\-/g, "")
    return date1-date2
}

function LoadJS(fileUrl){

    var oHead = document.getElementsByTagName('HEAD').item(0),
        oScript = document.createElement("script");

    oScript.src = fileUrl;
    oHead.appendChild(oScript);

}

const globalPB = {
    domian:wpSiteUrl
}
export const gAjaxUrl = {
    'time':globalPB.domian+'/api/v1/util/time/',          //时间
    'adminLogin':globalPB.domian+'/api/v1/admin/auths/login/',          //登录
    'adminLogout':globalPB.domian+'/api/v1/admin/auths/logout/',   //注销
    'staffs':globalPB.domian+'/api/v1/admin/staffs/',          //员工
    'staffsIpmort':globalPB.domian+'/api/v1/admin/staffs/imports/',//员工导入
    'rideReport':globalPB.domian+'/api/v2/admin/staffs/ride_report/',//员工搭乘统计列表
    'departments':globalPB.domian+'/api/v1/admin/departments/',//部门
    'companyadmins':globalPB.domian+'/api/v1/admin/companyadmins/',//管理员
    'shuttlebusvehicles':globalPB.domian+'/api/v2/admin/shuttlebusvehicles/',          //车辆
    'shuttlebusdrivers':globalPB.domian+'/api/v2/admin/shuttlebusdrivers/',          //司机
    'shuttlebuses2':globalPB.domian+'/api/v2/admin/shuttlebuses/',//巴士2.0
    'shuttlebusdates2':globalPB.domian+'/api/v2/admin/shuttlebusdates/', //巴士班次2.0
    'shuttlebuses':globalPB.domian+'/api/v1/admin/shuttlebuses/',//巴士
    'saleable':globalPB.domian+'/api/v2/admin/shuttlebuses/saleable/',//可销售班次日期
    'createOrder':globalPB.domian+'/api/v1/admin/shuttlebuses/create_order/',//创建订单
    'busInfoReport':globalPB.domian+'/api/v2/admin/shuttlebuses/info_report/',//创建订单
    'busmonthlytickets':globalPB.domian+'/api/v1/admin/busmonthlytickets/',//月票
    'orderComments':globalPB.domian+'/api/v2/admin/shuttlebusdates/',//订单评价列表
    'notices':globalPB.domian+'/api/v1/admin/notices/',//公告
    'officialcarorders':globalPB.domian+'/api/v1/admin/officialcarorders/',//订单
    'carpool':globalPB.domian+'/api/v1/admin/officialcarorders/carpool/',//订单管理
    'officialcarvehicles':globalPB.domian+'/api/v1/admin/officialcarvehicles/',          //车辆
    'officialcardrivers':globalPB.domian+'/api/v1/admin/officialcardrivers/',          //司机
    'officialcardriversLock':globalPB.domian+'/api/v1/admin/officialcardrivers/lock/',          //锁定
    'officialcardriversUnlock':globalPB.domian+'/api/v1/admin/officialcardrivers/unlock/',          //解锁
    'officialcarstaffs':globalPB.domian+'/api/v1/admin/officialcarstaffs/',          //员工用车
    'orderStatus':globalPB.domian+'/api/v1/admin/officialcarorders/order_status/', //订单状态
    'approvalStatus':globalPB.domian+'/api/v1/admin/officialcarorders/approval_status/', //审批状态
    'orderSeparate':globalPB.domian+'/api/v1/admin/officialcarorders/separate/',  //取消拼单
    'jobs': globalPB.domian+'/api/v1/admin/jobs/',  //下载任务
    'officialcarrules': globalPB.domian+'/api/v1/admin/officialcarrules/',//公务车申请规则
    'approvers': globalPB.domian+'/api/v1/admin/approvers/', //审批人
    'vehicleConfiguration': globalPB.domian+'/api/v1/admin/modulenotice/', //公务车模块公告模块

    // 数据面板
    'departmentOrderNums': globalPB.domian+'/api/v1/admin/officialcarorders/department_order_nums/', //公务车模块公告模块
    'orderNums': globalPB.domian+'/api/v1/admin/officialcarorders/order_nums/', //公务车模块公告模块
    'orderDistributions': globalPB.domian+'/api/v1/admin/officialcarorders/order_distributions/', //公务车模块公告模块
    'officialcarProfile': globalPB.domian+'/api/v1/admin/officialcarorders/officialcar_profile/', //公务车模块公告模块
    'repairtypes': globalPB.domian+'/api/v1/admin/repairtypes/', //公共区域维修类型
    'dormitoryApprovers': globalPB.domian+'/api/v1/admin/dormitory_approvers/', //公共区域审批人
    'dormitoryApproversCreate': globalPB.domian+'/api/v1/admin/dormitory_approvers/bulk_create/', //公共区域审批人批量新增
    'pubrepairorders': globalPB.domian+'/api/v1/admin/pubrepairorders/', //公共区域审批人批量新增
    'repairmen': globalPB.domian+'/api/v1/admin/repairmen/', //维修工列表
    'addRepairmen': globalPB.domian+'/api/v1/admin/repairmen/bulk_create/', //添加维修工列表
    'infoReport': globalPB.domian+'/api/v1/admin/materials/info_report/', //维修材料统计列表
    'faultitems': globalPB.domian+'/api/v1/admin/faultitems/', //故障项目
    'repairorders': globalPB.domian+'/api/v1/admin/repairorders/', //宿舍维修单
    'materialclasses': globalPB.domian+'/api/v1/admin/materialclasses/', //维修材料类型
    'materials': globalPB.domian+'/api/v1/admin/materials/', //维修材料
    'materialsImport': globalPB.domian+'/api/v1/admin/materials/materials_import/', //维修材料批量导入
    'buildings': globalPB.domian+'/api/v1/admin/buildings/', //宿舍楼
    'roomtypes': globalPB.domian+'/api/v1/admin/roomtypes/', //房间类型
    'rooms': globalPB.domian+'/api/v1/admin/rooms/', //房间类型
    'housingrecords': globalPB.domian+'/api/v1/admin/housingrecords/', //房间类型
    'roomsImport': globalPB.domian+'/api/v1/admin/rooms/rooms_import/', //宿舍批量导入
    'roomsStaffsImport': globalPB.domian+'/api/v1/admin/rooms/staffs_import/', //宿舍员工批量导入
    'applysettleorders': globalPB.domian+'/api/v1/admin/applysettleorders/', //长住申请单列表
}

//替换公司名
$(function(){
	$('#J-company').text(localStorage.companyName);
})

// if(isHttps){
//     LoadJS('https://api.map.baidu.com/api?v=2.0&ak=BMvPNolfzSZK2FTuPPk0i9Lp&s=1')
// }else{
//     LoadJS('http://api.map.baidu.com/api?v=2.0&ak=BMvPNolfzSZK2FTuPPk0i9Lp')
// }

/*判断localstorage是否存在某个标志位，从而判断用户是不是第一次使用某个功能*/
var promptTypes = ['approverPromptFlag','approverSelectPromptFlag','orderManagementPromptFlag','timeapplyPromptFlag',
'vehicleConfigurationPromptFlag','locaaddBusdatePromptFlag','rideReportPromptFlag','addBusMonthlyTicketsPromptFlag',
'addBusdatePromptFlag','addBus2PromptFlag'];

for (var i = 0; i < promptTypes.length; i++) {
    var promptType = localStorage.getItem(promptTypes[i])
    if (promptType == undefined) {
        localStorage.setItem(promptTypes[i], true)
    }
}

var countlogin = localStorage.getItem('countlogin')
if (countlogin == undefined) {
    localStorage.setItem('countlogin', 1);
}


  