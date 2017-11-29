<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content">
        <form id="J-layer-form" class="form form-horizontal layui-layer-wrap">
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>所在楼：</label>
                <div class="formControls f-l col-4">
                    <span class="select-box">
                        <select v-model="buildingInput" class="select">
                            <option v-for="item in buildingslist" value="{{item.id}}">{{item.building_name}}</option>
                        </select>
                    </span>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>房间类型：</label>
                <div class="formControls f-l col-4">
                    <span class="select-box">
                        <select v-model="roomTypeInput" class="select">
                            <option v-for="item in roomtypeslist" value="{{item.id}}">{{item.type_name}}</option>
                        </select>
                    </span>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 "><span class="c-red">*</span>房间号：</label>
                <div class="formControls f-l col-4 floor">
                    <input v-model="roomNoInput" type="text" class="input-text" value="" placeholder="" name="room_no" maxlength="16">
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

            //this.getBuildingsList();
            //this.getRoomTypesList();
            this.buildingInput = this.buildingslist[0].id;
            this.roomTypeInput = this.roomtypeslist[0].id;

            //类型判断
            if(this.type == 'add'){
                ajaxUrl = base.gAjaxUrl.rooms;
                ajaxType = 'POST';
                this.buildingInput = this.buildingid;
            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.rooms}${getData.id}/`;
                ajaxType = 'PUT';
                this.buildingInput = this.buildingid;
                this.roomTypeInput = getData.room_type;
                this.roomNoInput = getData.room_no;
            }

            //验证
            $('#J-layer-form').validate({
                rules: {
                    // building: {
                    //     required: true,
                    // },
                    // room_type: {
                    //     required: true,
                    // },
                    room_no: {
                        required: true,
                    },
                },
                submitHandler:function() {
                    $.ajax({
                        url: ajaxUrl,
                        type:ajaxType,
                        data: {
                            building: that.buildingInput,
                            room_type: that.roomTypeInput,
                            room_no: that.roomNoInput,
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
        props: ['title','type','data','buildingid','buildingslist','roomtypeslist'],
        data:function(){
            return {
                buildingInput:'',
                roomTypeInput:'',
                roomNoInput:'',
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            save:function(){
                $('#J-layer-form').submit();
            },
        }
    }
</script>
