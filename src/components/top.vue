<template>
<header class="navbar-wrapper navbar-wrapper1">
	<div class="navbar navbar1 navbar-fixed-top">
		<div class="container-fluid cl"> 
			<a class="logo navbar-logo f-l mr-10" v-link="{ name: 'employee' }" data-title="员工管理">
				<img src="../assets/images/logo.png"/>
				智慧后勤管理系统
			</a> 
			<span id="J-company" class="logo navbar-slogan f-l"></span>
			<nav class="navbar-userbar f-r"> <!-- &#xe726; -->
				<a href="javascript:void(0);" class="btn btn-primary radius" v-on:click="logout">注销</a>
				<!-- <i class="Hui-iconfont">&#xe726;</i> -->
				<!-- <i class="Hui-iconfont Hui-iconfont-power">&#xe726;</i> -->
			</nav>
		</div>
	</div>
</header>
</template>

<style lang="less">
	// .Hui-article-box{
 //        left: 160px;
 //    }
	.navbar-wrapper1{
		background-color: #34474E;
	}
	.navbar-wrapper1 .navbar1{
		background-color: #36474f;
	}
	.navbar-userbar{
		padding-top:8px;
	}
	.logo{
		img{
			height: 30px;
			vertical-align:-9px;
		}
	}
</style>

<script>
import * as base from '../assets/js/base.js';
    export default{
        methods: {
		    logout: function () {
	            //注销
	            // 显示加载的loading
	            layer.load();
	            $.ajax({
	                url: base.gAjaxUrl.adminLogout,
	                type: 'POST',
	            })
	            .always((data)=>{
	            	layer.closeAll('loading');
	            	localStorage.removeItem('token');
	                this.$route.router.go({path: '/login', replace: true})
	            })		        
		    }
        }
    }
</script>


