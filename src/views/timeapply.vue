<template>
    <section class="Hui-article-box">
	    <div class="page-container">
	    	<h1 class="hs">时间申请规则</h1>
	       <div class="main">

	         <div class="masks">
	             <!-- <div class="mask1" v-on:click="toggleY" v-show="can_apply"></div> -->
	             <div v-bind:class="{ bg2: can_apply }" class="mask1" v-on:click="toggleY"></div>
	             <p id="is_Enable" class="ps">是否启用公务车</p>
	         </div>
	         <div class="form">
	             <form id="signupForm" id="form1" runat="server" onsubmit="validateCode()" method="post" action="">
	            <div class="top">
	                <p class="p3">公务车用车需提前</p>
	                <input id="input1" class="input1" v-model="preset_time" type="text" name="">
	                <p class="p1">分钟发出申请</p>
	            </div>
	            <div class="top">
	                <p class="p2">可发起用车的申请时间段</p>

					<div  class="inputs1 row cl">
	                    <label class="form-label f-l col-4 "><span class="c-red"></span></label>
	                    <div class="formControls f-l col-2">
	                        <input  v-model="before_apply_time" type="text" class="input-text" id="GO-datetimepicker" />
	                    </div>  
               		 </div>
					<span class="heng">-</span>
	                <div class="inputs2 row cl">
	                    <label class="form-label f-l col-4 "><span class="c-red"></span></label>
	                    <div class="formControls f-l col-2">
	                        <input  v-model="end_apply_time" type="text" class="input-text" id="RETURN-datetimepicker" />	                        
	                    </div>                   
                	</div>

	            </div>
	            <input class="sub" type="button" v-on:click="save" name="" value = "确认提交">
	         </form>
	         </div>
	    </div>	   
	    </div>
    </section>
</template>

<style scoped>	
	.hs {
		/*width: 150px;*/
	    height: 22px;
	    font-size: 18px;
	    font-weight: 300;
	}
	.main {
	    width: 1000px;
	    height: 590px;
	    margin: 100px 60px auto;
	    border: 1px solid #E8E5E5;
	}
	.masks {
	    position: relative;
	    width: 49px;
	    height: 28px;

	}
	.mask1 {
		/*padding-left: 52px;
	    padding-top: 36px;*/
	    position: absolute;
	    width: 49px;
	    height: 28px;
	    margin-left: 170px;
	    margin-top: 35px;
	    background: url(../assets/images/close.png) no-repeat;
	    /*background-color: none;*/
	}
	.top .spans {
	    height: 200px;
	    width: 40px;
	    /* background-color: red; */
	}
	.bg1 {

	    background: url(../assets/images/close.png) no-repeat;
	}
	.bg2 {

	    background: url(../assets/images/open.png) no-repeat;
	}

	.inputs1 {
		position: absolute;
		width: 72px;
		top: 30px;
		left: 140px;
	}
	.inputs1 .input-text {
		padding-left: 45px;
		width:132px;
	}
	.inputs2 .input-text {
		padding-left: 45px;
		width:132px;
	}

	.inputs2 {
		position: absolute;
		width: 72px;
		top: 30px;
		left: 310px;
	}
	.heng {
		position: absolute;
		top: 48px;
		left: 316px;
	}
	.masks p.ps {
		padding-left: 52px;
		padding-top: 36px;
	    position: absolute;
	    width: 120px;
	    top: 3px;
	    left: 0px;
	}
	.form {
		padding-left: 0px;
	    width: 800px;
	    height: 600px;
	    margin: 100px 300px;
	    position: relative;
	}
	.input2 {
	    top: 43%;
	    margin-left: 168px;
	    margin-top: -55px;
	    width: 138px;
	    height: 38px;
	    padding-left: 45px;
	    border: 1px solid #DDDFDE;
	}
	.input3 {
	    margin-top: 56px;
	    margin-left: -1px;
	    top: 50%;
	    width: 138px;
	    height: 38px;
	    padding-left: 46px;
	    border: 1px solid #DDDFDE;
	}
	.input1 {
	    position: static;
	    left: 50%;
	    margin-left: 168px;
	    width: 72px;
	    height: 30px;
	    padding-left: 60px;
	    border: 1px solid #DDDFDE;
	}
	.top {
	    position: relative;
	}
	p {
	    position: absolute;
	}
	.p1 {
	    left: 320px;
	    top: 6px;
	}
	.p2 {
	    left: -10px;
	    top: 48px;
	}
	.p3 {
	    left: 20px;
	    top: 6px;
	}
	input {
	    position: absolute;

	}
	.sub {
	    top: 210px;
	    left: 177px;
	    height: 34px;
	    width: 118px;
	    color: white;
	    background-color: #00B4EE;
	    border-radius: 9px;
	    font-size: 18px;
	    cursor: pointer;
	}

	select {
	    border: solid 1px #000;
	    appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    padding-right: 39px;
	    padding-left: 39px;
	    font-size: 16px;
	    /*padding-top: 10px;*/

	}
	select option {
	    appearance:none;
	    -moz-appearance:none;
	    -webkit-appearance:none;
	    padding-top: 10px;
	    padding-bottom: 10px;
	    margin-top: 48px;
	}

	select::-ms-expand { display: none; };

</style>
<script>
	import * as base from '../assets/js/base.js';

      export default{
        ready () {
        	// console.log(this.preset_time);
        	this.get_rule();
        	$('#GO-datetimepicker').datetimepicker({
                datepicker:false,
                format:'H:i',
                step:5
            });
            $('#RETURN-datetimepicker').datetimepicker({
                datepicker:false,
                format:'H:i',
                step:5
            });
            
        },
        //动态传值
        props: [],
        data:function(){
            return {
            	rule_id: '',
            	have_set_rule: false,
            	can_apply: false,
                before_apply_time:'00:00',
                end_apply_time: '00:00', 
                preset_time: 0           
            }
        },
        methods: {

        	toggleY: function(){
	            this.can_apply = !this.can_apply;
	        },
	        get_rule: function(){
	        	let that = this;
	        	$.ajax({
                    url: base.gAjaxUrl.officialcarrules,
                    type: 'GET',
                })
                .success ((data)=>{
                    base.ajaxCallback(data,()=>{
                        // console.log('初始状态:',localStorage.timeapplyPromptFlag);
                        // console.log(localStorage);
                        //判断是否是第一次进入该新功能或页面从而弹出新功能的提示
                        if(localStorage.timeapplyPromptFlag == 'true'){
                            let arrObj = [$('#is_Enable'),$('#input1'),$('#GO-datetimepicker'),$('#RETURN-datetimepicker'),];
                            // let flag = localStorage.timeapplyPromptFlag;
                            let arrTitle = ['先在这里启用规则才可以设置','设置要乘车需要提前的小时','设置可发起用车的起始时间','设置可发起用车的结束时间',];
                            var promptTypes = ['timeapplyPromptFlag',];
		                    // console.log(promptTypes[0]);
		                    $.guidance({
		                        obj:arrObj,
		                        title:arrTitle,
		                        flag:promptTypes,
		                    });
                        }
                        console.log(data);
                        console.log(data[0]);
                    	if(data[0]){
                    		that.have_set_rule = true;
                    		that.rule_id = data[0].id;         
	                        that.can_apply = data[0].can_apply;
			                that.before_apply_time = data[0].before_apply_time;
			                that.end_apply_time = data[0].end_apply_time;
			                that.preset_time = data[0].preset_time; 
			                // console.log('have_set_rule:'); 
			                // console.log(that.have_set_rule);
                    	}
                    	else{
			                that.rule_id = "";         
	                        that.can_apply = false;
			                that.before_apply_time = "";
			                that.end_apply_time = "";
			                that.preset_time = "";
                            layer.msg('您还没设置过时间申请规则，现在可以设置!',{icon:1,time:1000});
                            
                        } 
                        
                    });
                })
	        },
          
            save: function(){
            	let params = {
	            	can_apply: this.can_apply,
	                before_apply_time:this.before_apply_time,
	                end_apply_time: this.end_apply_time, 
	                preset_time: this.preset_time,
            	}
                // $('#J-layer-form').submit();
                if(this.have_set_rule){
                	let that = this;
                	$.ajax({
	                    url: base.gAjaxUrl.officialcarrules+that.rule_id+"/",
	                    type: 'PATCH',
	                    data:params
                    })
	                .always((data)=>{
	                    base.ajaxCallback(data,()=>{
	                    	layer.msg('修改规则成功',{icon:1,time:1000});
	                    });
	                })
                }else{
                	$.ajax({
	                    url: base.gAjaxUrl.officialcarrules,
	                    type: 'POST',
	                    data:params
                    })
	                .always((data)=>{
	                    base.ajaxCallback(data,()=>{
	                    	this.have_set_rule = true;
	                    	this.rule_id = data.id;
	                    	layer.msg('新增规则成功',{icon:1,time:1000});
	                    });
	                })
                } 
            },   
        }
    }

</script>


