<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content">
        <form id="J-layer-form" class="form form-horizontal layui-layer-wrap">
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>姓名：</label>
                <div class="formControls f-l col-4">
                    <input v-model="usernameInput" type="text" class="input-text" value="" placeholder="" name="username">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>密码：</label>
                <div class="formControls f-l col-4">
                    <input id="password" v-model="passwordInput" type="password" class="input-text" value="" placeholder="" name="password">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>确认密码：</label>
                <div class="formControls f-l col-4">
                    <input type="password" class="input-text" value="" placeholder="" name="confirm_password">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>性别：</label>
                <div class="formControls f-l col-4">
                    <span class="select-box">
                <select v-model="sexSelected" name="sex" class="select">
                    <option value="" selected="">请选择</option>
                    <!-- <option value="1">男</option>
                    <option value="2">女</option> -->
                    <option v-bind:value="item.id" v-for="item in sexItem">{{item.value}}</option>
                </select>
                </span>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>部门：</label>
                <div class="formControls f-l col-4">
                    <span class="select-box">
                        <select v-model="departmentSelected" name="department" class="select">
                            <option value="" selected="">请选择</option>
                            <option v-bind:value="item.id" v-for="item in departmentItem">{{item.department_name}}</option>
                        </select>
                    </span>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>职位：</label>
                <div class="formControls f-l col-4">
                    <input v-model="positionInput" type="text" class="input-text" value="" placeholder="" name="position">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>电话：</label>
                <div class="formControls f-l col-4">
                    <input v-model="phoneInput" type="text" class="input-text" value="" placeholder="" name="phone">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>工号：</label>
                <div class="formControls f-l col-4">
                    <input v-model="jobNumberInput" type="text" class="input-text" value="" placeholder="" name="job_number">
                </div>
            </div>
        </form>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
    <div class="layui-layer-btn" v-on:click="save"><a class="layui-layer-btn0" v-if="type!='check'">保存</a></div>
</div>
<div class="layui-layer-shade"></div>
</template>

<style lang="less">

</style>
<script>
import * as base from '../assets/js/base.js';
    let departmentOps = {
        page:1,
        page_size:200,   
    }

    export default{
        ready () {
            let that = this;
            let ajaxUrl = '';
            let ajaxType = '';
            let passwrodFlag = true;
            let getData = this.data;

            base.verticalCenter('.layui-modify'); 

            //类型判断
            if(this.type == 'add'){
                ajaxUrl = base.gAjaxUrl.staffs;
                ajaxType = 'POST';
                passwrodFlag = true;
                this.department_name = '';
            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.staffs}${getData.id}/`;
                ajaxType = 'PUT'; 

                passwrodFlag = false;
                this.usernameInput = getData.real_name;
                setTimeout(function(){
                    that.sexSelected = getData.sex;
                })
                this.departmentSelected = getData.department_vo.id;
                this.positionInput = getData.position;
                this.phoneInput = getData.phone;
                this.jobNumberInput = getData.job_number;
            }else if(this.type == 'check'){
                passwrodFlag = false;
                this.usernameInput = getData.real_name;
                setTimeout(function(){
                    that.sexSelected = getData.sex;
                })
                this.departmentSelected = getData.department;
                this.positionInput = getData.position;
                this.phoneInput = getData.phone;
                this.jobNumberInput = getData.job_number;
            }
            
            $.validator.addMethod('mobile', function( value, element ){
                // /^1\d{10}$/ 来自支付宝的正则
                return this.optional( element ) || /^1\d{10}$/.test( value );
            }, '请输入正确的手机号码');
            //验证
            $('#J-layer-form').validate({    
                rules: {            
                    username: {
                        required: true,
                    },
                    password:{
                        required: passwrodFlag,
                    },
                    confirm_password: {
                        required: passwrodFlag,
                        equalTo: "#password"
                    },
                    sex:{
                        required: true,
                    },
                    department:{
                        required: true,  
                    },
                    position:{
                        required: true,    
                    },
                    phone:{
                        required: true,    
                        number:true,
                        mobile: true,
                    },
                    job_number:{
                        required: true,    
                    },
                },                 
                submitHandler:function() {
                    $.ajax({
                        url: ajaxUrl,
                        type:ajaxType,
                        data: {
                            real_name: that.usernameInput,
                            password: that.passwordInput,
                            sex: that.sexSelected,
                            department: that.departmentSelected,
                            position: that.positionInput,
                            phone: that.phoneInput,
                            job_number: that.jobNumberInput,
                        },
                    })
                    .always(function(data) {
                        base.ajaxCallback(data,function(){
                            layer.msg('提交成功',{icon:1,time:1000});
                            that.$dispatch('dialog-save');
                        });
                    });
                    
                }             
            }); 
            //获取部门列表
            $.ajax({
                url: `${base.gAjaxUrl.departments}?page=${departmentOps.page}&page_size=${departmentOps.page_size}`,

                type: 'GET',
            })
            .always((data)=>{
                this.departmentItem = data.results;
            })
        },
        props: ['title','type','data'],
        data:function(){
            return {
                // jobNumberInputItem:'',
                usernameInput:'',
                passwordInput:'',
                sexSelected:'',
                departmentSelected:'',
                positionInput:'',
                phoneInput:'',
                jobNumberInput:'',
                departmentItem:[],
                sexItem:[
                    {
                        id:'1',
                        value:'男'
                    },
                    {
                        id:'2',
                        value:'女'
                    }
                ]
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            save:function(){
                if(this.phoneInput.length == 11){
                    $('#J-layer-form').submit();
                }
                else {
                    layer.msg('手机号码数为11位数字哦',{icon:1,time:1000});
                }
                // $('#J-layer-form').submit();
            }
        }
    }
</script>
