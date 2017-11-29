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
                <label class="form-label f-l col-4 "><span class="c-red">*</span>电话：</label>
                <div class="formControls f-l col-4">
                    <input v-model="phoneInput" type="text" class="input-text" value="" placeholder="" name="phone">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>密码：</label>
                <div class="formControls f-l col-4">
                    <input id="password" v-model="passwordInput" type="password" class="input-text" value="" placeholder="请添加6位或以上的密码" name="password">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>确认密码：</label>
                <div class="formControls f-l col-4">
                    <input type="password" class="input-text" value="" placeholder="" name="confirm_password">
                </div>
            </div> 
        </form>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
    <div class="layui-layer-btn" v-on:click="save"><a class="layui-layer-btn0">保存</a></div>
</div>
<div class="layui-layer-shade"></div>
</template>

<style lang="less">

</style>
<script>
import * as base from '../assets/js/base.js';
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
                ajaxUrl = base.gAjaxUrl.companyadmins;
                ajaxType = 'POST';

                passwrodFlag = true;
                this.usernameInput = '';
                this.phoneInput = '';
                this.passwordInput = '';
            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.companyadmins}${getData.id}/`;
                ajaxType = 'PUT'; 

                passwrodFlag = false;
                this.usernameInput = getData.user_name;
                this.phoneInput = getData.phone;
                this.passwordInput = '';
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
                    phone:{
                        required: true,  
                        number:true,
                        mobile: true,
                    },
                    password:{
                        required: passwrodFlag,  
                    },
                    confirm_password:{
                        required: passwrodFlag,  
                        equalTo: "#password"
                    }
                },                 
                submitHandler:function() {
                    $.ajax({
                        url: ajaxUrl,
                        type:ajaxType,
                        data: {
                            user_name: that.usernameInput,
                            phone: that.phoneInput,
                            password: that.passwordInput,
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
        },
        props: ['title','type','data'],
        data:function(){
            return {
                usernameInput:'',
                phoneInput:'',
                passwordInput:'',
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            save:function(){
                $('#J-layer-form').submit();
            }
        }
    }
</script>
