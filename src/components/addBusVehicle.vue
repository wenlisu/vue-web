<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content">
        <form id="J-layer-form" class="form form-horizontal layui-layer-wrap">
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>车牌：</label>
                <div class="formControls f-l col-4">
                    <input v-model="car_no" type="text" class="input-text" value="" placeholder="" name="car_no">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>品牌：</label>
                <div class="formControls f-l col-4">
                    <input v-model="car_brand" type="text" class="input-text" value="" placeholder="" name="car_brand">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>型号：</label>
                <div class="formControls f-l col-4">
                    <input v-model="car_model" type="text" class="input-text" value="" placeholder="" name="car_model">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>颜色：</label>
                <div class="formControls f-l col-4">
                    <input v-model="car_color" type="text" class="input-text" value="" placeholder="" name="car_color">
                    <!-- <span class="select-box">
                <select v-model="sexSelected" name="sex" class="select">
                    <option value="" selected="">请选择</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
                </span> -->
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>座位数：</label>
                <div class="formControls f-l col-4">
                    <input v-model="seats" type="text" class="input-text" value="" placeholder="" name="seats">
                    <!-- <span class="select-box">
                        <select v-model="departmentSelected" name="department" class="select">
                            <option value="" selected="">请选择</option>
                            <option v-bind:value="item.id" v-for="item in departmentItem">{{item.department_name}}</option>
                        </select>
                    </span> -->
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>类型：</label>
                <div class="formControls f-l col-4">
                    <input v-model="car_type" type="text" class="input-text" value="" placeholder="" name="car_type">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>备注：</label>
                <div class="formControls f-l col-4">
                    <input v-model="remark" type="text" class="input-text" value="" placeholder="" name="remark">
                </div>
            </div>
            <!-- <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>工号：</label>
                <div class="formControls f-l col-4">
                    <input v-model="jobNumberInput" type="text" class="input-text" value="" placeholder="" name="job_number">
                </div>
            </div> -->
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
            /*let passwrodFlag = true;*/
            let getData = this.data;

            base.verticalCenter('.layui-modify');

            //类型判断
            if(this.type == 'add'){
                ajaxUrl = base.gAjaxUrl.shuttlebusvehicles;
                ajaxType = 'POST';

                /*passwrodFlag = true;*/
                /*this.department_name = '';*/
            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.shuttlebusvehicles}${getData.id}/`;
                ajaxType = 'PUT';

                /*passwrodFlag = false;*/
                this.car_no = getData.car_no;
                this.car_brand = getData.car_brand;
                this.car_model = getData.car_model;
                this.car_color = getData.car_color;
                this.seats = getData.seats;
                this.car_type = getData.car_type;
                this.remark = getData.remark;
            }

            //验证
            $('#J-layer-form').validate({
                rules: {
                    car_no: {
                        required: true,
                        maxlength:10 
                    },
                    car_brand:{
                        required: true,
                        maxlength:10    
                    },
                    car_model: {
                        required: true,
                    },
                    car_color:{
                        required: true,
                        maxlength:10     
                    },
                    seats:{
                        required: true,
                        number:true,
                        digits:true,
                        maxlength:9    
                    },
                    car_type:{
                        required: true,
                    },
                    remark:{
                        required: true,
                    },
                    /*job_number:{*/
                        /*required: true,    */
                    /*},*/
                },
                submitHandler:function() {
                    $.ajax({
                        url: ajaxUrl,
                        type:ajaxType,
                        data: {
                            /*real_name: that.usernameInput,*/
                            /*password: that.passwordInput,*/
                            /*sex: that.sexSelected,*/
                            /*department: that.departmentSelected,*/
                            /*position: that.positionInput,*/
                            /*phone: that.phoneInput,*/
                            /*job_number: that.jobNumberInput,*/
                            car_no: that.car_no,
                            car_brand: that.car_brand,
                            car_model: that.car_model,
                            car_color: that.car_color,
                            seats: that.seats,
                            car_type: that.car_type,
                            remark: that.remark,
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
            /*$.ajax({*/
                /*url: base.gAjaxUrl.departments,*/
                /*type: 'GET',*/
            /*})*/
            /*.always((data)=>{*/
                /*this.departmentItem = data.results;*/
            /*})*/
        },
        props: ['title','type','data'],
        data:function(){
            return {
                /*usernameInput:'',*/
                /*passwordInput:'',*/
                /*sexSelected:'',*/
                /*departmentSelected:'',*/
                /*positionInput:'',*/
                /*phoneInput:'',*/
                /*jobNumberInput:'',*/
                /*departmentItem:[],*/
                car_no:'',
                car_brand:'',
                car_model:'',
                car_color:'',
                seats:'',
                car_type:'',
                remark:'',
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
