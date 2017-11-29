<template>
<aside class="Hui-aside Hui-aside1">
	<input runat="server" id="divScrollValue" type="hidden" value="" />
	<div class="menu_dropdown bk_2">
		<dl>
			<!-- <dt class="selected"><i class="Hui-iconfont menu-item" >&#xe60d;</i>&nbsp;&nbsp;人员管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt> -->
			<dt class="selected"><img class="menu-item" src="../assets/images/employee-g.png" alt="" width="15" height="15">&nbsp;&nbsp;人员管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd style="display:block;">
				<ul>
					<li><a v-link="{ name: 'employee' }" data-title="员工管理" href="javascript:;">员工管理</a></li>
					<li><a v-link="{ name: 'department' }" data-title="部门管理" href="javascript:;">部门管理</a></li>
					<li><a v-link="{ name: 'company' }" data-title="企业管理员" href="javascript:;">企业管理员</a></li>
				</ul>
			</dd>
		</dl>
		<dl>
			<dt><img class="menu-item" src="../assets/images/bus-c-g.png" alt="" width="15" height="15">&nbsp;&nbsp;通勤大巴<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<!-- <dt><i class="Hui-iconfont">&#xe70c;</i> 通勤大巴<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt> -->
			<dd>
				<ul>
					<li><a v-link="{ name: 'busDriver' }" data-title="司机管理" href="javascript:;">司机管理</a></li>
					<li><a v-link="{ name: 'busManagement' }" data-title="巴士管理" href="javascript:;">巴士线路管理</a></li>
					<li><a v-link="{ name: 'monthlyTicket' }" data-title="巴士线路管理" href="javascript:;">月票管理</a></li>
					<li><a v-link="{ name: 'saleable' }" data-title="售票" href="javascript:;">售票</a></li>
					<li><a v-link="{ name: 'rideReport' }" data-title="搭乘统计" href="javascript:;">搭乘统计</a></li>
					<li><a v-link="{ name: 'busInfoReport' }" data-title="班车统计" href="javascript:;">班车统计</a></li>
					<li><a v-link="{ name: 'busRealTimeInfo' }" data-title="班车实时情况" href="javascript:;">班车实时情况</a></li>
					<!-- <li><a v-link="{ name: 'busDataPanel' }" data-title="通勤车数据面板" href="javascript:;">通勤车数据面板</a></li> -->
				</ul>
			</dd>
		</dl>
		<dl>
			<dt><img class="menu-item" src="../assets/images/vehicle-c-g.png" alt="">&nbsp;&nbsp;公务车<i class="Hui-iconfont menu_dropdown-arrow ">&#xe6d5;</i></dt>
			<!-- <dt><i class="Hui-iconfont">&#xe636;</i> 公务车<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt> -->
			<dd>
				<ul>
					<li><a v-link="{ name: 'approver' }" data-title="规则设置" href="javascript:;">审批人</a></li>
					<li><a v-link="{ name: 'orderManagement' }"  data-title="订单管理" href="javascript:;">订单管理</a></li>
					<li><a v-link="{ name: 'timeapply' }" data-title="申请规则" href="javascript:;">申请规则</a></li>
					<li><a v-link="{ name: 'vehicleConfiguration' }" data-title="车辆配置" href="javascript:;">车辆配置公告</a></li>
					<li><a v-link="{ name: 'vehicle' }" data-title="车辆管理" href="javascript:;">车辆管理</a></li>
					<li><a v-link="{ name: 'driver' }" data-title="司机管理" href="javascript:;">司机管理</a></li>
					<li><a v-link="{ name: 'driverReport' }" data-title="司机用车统计" href="javascript:;">司机用车统计</a></li>
					<li><a v-link="{ name: 'employeeReport' }" data-title="员工用车统计" href="javascript:;">员工用车统计</a></li>
					<li><a v-link="{ name: 'vehicleReport' }" data-title="车辆统计" href="javascript:;">车辆统计</a></li>
				</ul>
			</dd>
		</dl>
		<dl>
			<!-- <dt class="selected"><i class="Hui-iconfont menu-item" >&#xe61e;</i>&nbsp;&nbsp;数据看板<i class="Hui-iconfont menu_dropdown-arrow ">&#xe6d5;</i></dt> -->
			<dt><img class="menu-item" src="../assets/images/data-g.png" alt="">&nbsp;&nbsp;数据看板<i class="Hui-iconfont menu_dropdown-arrow ">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a v-link="{ name: 'busDataPanel' }" data-title="通勤大巴数据看板" href="javascript:;">通勤大巴数据看板</a></li>
					<li><a v-link="{ name: 'officialcarDataPanel' }" data-title="公务车数据看板" href="javascript:;">公务车数据看板</a></li>
				</ul>
			</dd>
		</dl>
		<dl>
			<dt class="notice"><a v-link="{ name: 'notice' }" data-title="公告管理" href="javascript:;"><img class="menu-item" src="../assets/images/notice-g.png" alt="">&nbsp;&nbsp;公告管理</a></dt>
		</dl>
		<dl>
			<dt class="notice"><a v-link="{ name: 'job' }" data-title="任务管理" href="javascript:;"><img class="menu-item" src="../assets/images/job-g.png" alt="">&nbsp;&nbsp;任务管理</a></dt>
		</dl>
		<dl>
			<dt><img class="menu-item" src="../assets/images/repair-g.png" alt="">&nbsp;&nbsp;报修管理<i class="Hui-iconfont menu_dropdown-arrow ">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a v-link="{ name: 'repairmen' }" data-title="维修人员管理" href="javascript:;">维修人员管理</a></li>
					<li><a v-link="{ name: 'publicRepairtypes' }" data-title="公共报修类型" href="javascript:;">公共报修类型</a></li>
					<li><a v-link="{ name: 'faultitems' }" data-title="故障项目管理" href="javascript:;">故障项目管理</a></li>
					<li><a v-link="{ name: 'pubrepairorders' }" data-title="公共区域报修订单管理" href="javascript:;">公共区域报修订单管理</a></li>
					<li><a v-link="{ name: 'repairorders' }" data-title="宿舍普通报修订单管理" href="javascript:;">宿舍普通报修订单管理</a></li>
					<li><a v-link="{ name: 'materials' }" data-title="材料管理" href="javascript:;">材料管理</a></li>
					<li><a v-link="{ name: 'infoReport' }" data-title="材料使用统计" href="javascript:;">材料使用统计</a></li>
					
				</ul>
			</dd>
		</dl>
		<dl>
			<dt><img class="menu-item" src="../assets/images/buildings-g.png" alt="">&nbsp;&nbsp;宿舍管理<i class="Hui-iconfont menu_dropdown-arrow ">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a v-link="{ name: 'buildings' }" data-title="楼-宿舍管理" href="javascript:;">楼-宿舍管理</a></li>
					<li><a v-link="{ name: 'roomtypes' }" data-title="房间类型管理" href="javascript:;">房间类型管理</a></li>
					<li><a v-link="{ name: 'roommessages' }" data-title="房务信息" href="javascript:;">房务信息</a></li>
					<li><a v-link="{ name: 'housingrecords' }" data-title="宿舍人员管理" href="javascript:;">宿舍人员管理</a></li>
				</ul>
			</dd>
		</dl>
<!-- 		<dl>
			<dt><img class="menu-item" src="../assets/images/longStay-g.png" alt="" width="15" height="15">&nbsp;&nbsp;长住入住<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a v-link="{ name: 'longStayApply' }" data-title="长住申请" href="javascript:;">长住申请</a></li>
					<li><a v-link="{ name: 'longStayApply' }" data-title="安排房间" href="javascript:;">长住申请</a></li>
				</ul>
			</dd>
		</dl> -->
<!-- 		<dl>
			<dt><img class="menu-item" src="../assets/images/waterEle-g.png" alt="" width="15" height="15">&nbsp;&nbsp;水电管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a v-link="{ name: 'longStayApply' }" data-title="长住申请" href="javascript:;">长住申请</a></li>
				</ul>
			</dd>
		</dl> -->
	</div>
</aside>
</template>
<style scoped>
  .menu-item {
        width: 25px;
        height: 25px;
        font-size: 25px;
    }
	.Hui-aside{
		border-right: 0;
	}
	.Hui-aside1{
		background-color: #273238;
		/*width: 180px;*/
	}
	.Hui-aside1 .menu_dropdown.bk_2 dt {
		border-bottom: 0px;
		color: #fff;
		line-height: 46px;
	}    
	.Hui-aside .menu_dropdown dd li {
		/*padding-left: 12px;*/
	}
	.Hui-aside .menu_dropdown li a{
		color: #959DA0;
	}
	.Hui-aside .notice a {
		color: #fff;
	}
	.Hui-aside .menu_dropdown dd li a{
		padding-left: 50px;
	}
	.Hui-aside .menu_dropdown li a.v-link-active {
	    /*color: #fff;*/
	    background-color: #3D4A50;
	}
	.Hui-aside .menu_dropdown li.v-link-active {
	    color: #fff;
	    background-color: #3D4A50;
	}
	.Hui-aside .menu_dropdown dd ul{
		padding: 0;
	}
	.Hui-aside .menu_dropdown dl{
		background-color: #253238;
	}
	.Hui-aside .menu_dropdown dd{
		background-color: #323F45;
	}
</style>
<script>
    export default{
        ready () {
        	localStorage.routeName = this.$route.name;
//			this.get_permissions();
			// console.log('aside');
			/*折叠*/
			function Huifold (obj,obj_c,speed,obj_type,Event){
				if(obj_type == 2){
					$(obj+":first").find("b").html("-");
					$(obj_c+":first").show();
				}
				$('body').on(Event,obj, function(event) {
					if($(this).next().is(":visible")){
						if(obj_type == 2){
							return false;
						}else{
							$(this).next().slideUp(speed).end().removeClass("selected");
							if($(this).find("b")){
								$(this).find("b").html("+");
							}
						}
					}
					else{
						if(obj_type == 3){
							$(this).next().slideDown(speed).end().addClass("selected");
							if($(this).find("b")){
								$(this).find("b").html("-");
							}
						}else{
							$(obj_c).slideUp(speed);
							$(obj).removeClass("selected");
							if($(this).find("b")){
								$(obj).find("b").html("+");
							}
							$(this).next().slideDown(speed).end().addClass("selected");
							if($(this).find("b")){
								$(this).find("b").html("-");
							}
						}
					}
				});
			}
			/*左侧菜单*/
			Huifold(".menu_dropdown dl dt",".menu_dropdown dl dd","fast",1,"click");
        },
		methods: {
			get_permissions: function () {
				console.log('-----------------------');
                let admin = localStorage.admin;
				console.log(admin);
			}
		},
		data: function () {
			return {
				permissions: localStorage.permissions ? localStorage.permissions : []
			}
		},
		events: {
			'showMenu': function () {
				this.permissions = localStorage.permissions;
			}
		}
    }
</script>
