<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content">
        <form id="J-layer-form" class="form form-horizontal layui-layer-wrap">
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>房间类型：</label>
                <div class="formControls f-l col-4">
                    <input v-model="typeNameInput" type="text" class="input-text" value="" placeholder="" name="type_name" maxlength="10">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>几床：</label>
                <div class="formControls f-l col-4">
                    <input v-model="bedNumInput" type="text" class="input-text" value="" placeholder="" name="bed_num">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>几人：</label>
                <div class="formControls f-l col-4">
                    <input v-model="contentInput" type="text" class="input-text" value="" placeholder="" name="content">
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">配置：</label>
                <div class="formControls f-l col-4 skin-minimal">
                    <div class="check-box mr-40">
                        <input v-model="airConditioningInput" type="checkbox" id="airConditioning" name="has_air_conditioning">
                        <label for="airConditioning">空调</label>
                    </div>
                    <div class="check-box mr-40">
                        <input v-model="tvInput" type="checkbox" id="tv" name="has_TV">
                        <label for="tv">电视</label>
                    </div>
                    <div class="check-box">
                        <input v-model="computerInput" type="checkbox" id="computer" name="has_computer">
                        <label for="computer">电脑</label>
                    </div>
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

    export default{
        ready () {
            let that = this;
            let ajaxUrl = '';
            let ajaxType = '';
            let getData = this.data;

            base.verticalCenter('.layui-modify');

            //类型判断
            if(this.type == 'add'){
                ajaxUrl = base.gAjaxUrl.roomtypes;
                ajaxType = 'POST';
            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.roomtypes}${getData.id}/`;
                ajaxType = 'PUT';
                this.typeNameInput = getData.type_name;
                this.bedNumInput = getData.bed_num;
                this.contentInput = getData.content;
                this.airConditioningInput = getData.has_air_conditioning;
                this.tvInput = getData.has_TV;
                this.computerInput = getData.has_computer;
            }

            $.validator.addMethod('signlessInteger',function(value, element){
                var length = value.length;  
                var reg = /^[1-9]\d*$/; 
                return this.optional(element) || reg.test( value );
            },'请输入正整数');

            //验证
            $('#J-layer-form').validate({
                rules: {
                    type_name: {
                        required: true,
                    },
                    bed_num: {
                        required: true,
                        signlessInteger: true,
                    },
                    content: {
                        required: true,
                        signlessInteger: true,
                    },
                },
                submitHandler:function() {
                    $.ajax({
                        url: ajaxUrl,
                        type:ajaxType,
                        data: {
                            type_name: that.typeNameInput,
                            bed_num: that.bedNumInput,
                            content: that.contentInput,
                            has_air_conditioning: that.airConditioningInput,
                            has_TV: that.tvInput,
                            has_computer: that.computerInput,
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
                typeNameInput:'',
                bedNumInput:'',
                contentInput:'',
                airConditioningInput: false,
                tvInput: false,
                computerInput: false,
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
