<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content">
        <form id="J-layer-form" class="form form-horizontal layui-layer-wrap">
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>楼名称：</label>
                <div class="formControls f-l col-4">
                    <input v-model="buildingNameInput" type="text" class="input-text" value="" placeholder="" name="building_name">
                </div>
            </div>
            <!-- <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>拥有楼层：</label>
                <div class="formControls f-l col-4 floor">
                    <input v-model="floorNumInput" type="text" class="input-text" value="" placeholder="" name="floor_num">
                    <span>层</span>
                </div>
            </div> -->
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
    .floor{
        position: relative;
    }
    .floor span{
        position: absolute;
        top: 4px;
        right: -22px;
    }
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
                ajaxUrl = base.gAjaxUrl.buildings;
                ajaxType = 'POST';
            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.buildings}${getData.id}/`;
                ajaxType = 'PUT';
                this.buildingNameInput = getData.building_name;
                //this.floorNumInput = getData.floor_num;
            }

            //验证
            $('#J-layer-form').validate({
                rules: {
                    building_name: {
                        required: true,
                    },
                    //floor_num: {
                    //    required: true,
                    //},
                },
                submitHandler:function() {
                    $.ajax({
                        url: ajaxUrl,
                        type:ajaxType,
                        data: {
                            building_name: that.buildingNameInput,
                            //floor_num: that.floorNumInput,
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
                buildingNameInput:'',
                //floorNumInput:'',
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
