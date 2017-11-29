<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">订单详情</div>
    <div class="layui-layer-content layui-layer-order-wrap">
        <form id="J-layer-form" class="form form-horizontal layui-layer-wrap ">
            <div class="row cl">
                <label class="form-label f-l col-4 ">申请人：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.staff_vo? items.staff_vo.real_name: '-'}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">审批人：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.approvalinfo_set}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">乘车人：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.passenger_name}}" readonly>
                </div>
            </div> 
            <div class="row cl">
                <label class="form-label f-l col-4 ">起点：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.source_name}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">终点：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.destination_name}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">出发时间：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.ride_time}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">结束时间：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.end_time}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">人数：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.passenger_number}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">状态：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.order_status_name}}" readonly>
                </div>
            </div> 
            <div class="row cl">
                <label class="form-label f-l col-4 ">拼车：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.is_carpool? '是': '否'}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">加急：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.is_urgent? '是': '否'}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">接送司机：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.driver_vo? items.driver_vo.staff_vo.real_name: '-'}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">接送车辆：</label>
                <div class="formControls f-l col-4">
                    <input type="text" class="input-text" value="{{items.vehicle_vo? items.vehicle_vo.car_no: '-'}}" readonly>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">原因：</label>
                <div class="formControls f-l col-4">
                    <textarea class="form-textarea" name="" readonly>{{items.reason}}</textarea>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">备注：</label>
                <div class="formControls f-l col-4">
                    <textarea class="form-textarea" name="" readonly>{{items.remark}}</textarea>
                </div>
            </div>
            <div class="row cl">
                <label class="form-label f-l col-4 ">取消原因：</label>
                <div class="formControls f-l col-4">
                    <textarea class="form-textarea" name="" readonly>{{items.cancel_reason}}</textarea>
                </div>
            </div>
        </form>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close"></a>
    </span>
    <div class="layui-layer-btn" v-on:click="close"><a class="layui-layer-btn0">关闭</a></div>
</div>
<div class="layui-layer-shade"></div>
</template>
<style lang="less">  
   div.layui-modify {
        margin-left: -25pc;
        top: 20px;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    let commentsOps = {
        param:{
            page:1,
            page_size:8,   
        }
    }
    export default{
        ready () {
                $.ajax({
                    url: `${base.gAjaxUrl.officialcarorders}${this.data.id}/`,
                    type: 'GET', 
                })
                .always((data)=> {
                        let resultData = data;
                        this.items = resultData;
                });
        },
        props: ['data'],
        data:function(){
            return {
                noData:false,
                items:[],
            }
        },
        methods: {
            close:function(){
                this.$dispatch('order-dialog-close'); 
            },
            isUrgent:function(data){
                if(data){ 
                    return '<span class="red">是</span>';
                }else{
                    return  '否';
                }
            },
        }
    }
</script>
<style lang="less">
.layui-order-detail{
    width: 1000px !important;
    margin-left:-500px !important;
}
.layui-layer-title{
    .m-info{
        border: none;
        padding: 9px 0;
        margin: 0;
    }
}
.layui-layer-order-wrap .form .row{
    margin-top:10px;
}
</style>
