<template>
    <div class="layui-layer layui-anim layui-layer-page layui-modify layer-add-bus">
        <div class="layui-layer-title">{{title}}</div>
        <div class="layui-layer-content">
            <form id="J-layer-form" class="form form-horizontal layui-layer-wrap">
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>班次名称：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="shuttleNameInput" type="text" class="input-text" value="" placeholder="" name="shuttle_name">
                    </div>
                </div> 
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>出发时间：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="departureTimeInput" type="text" class="input-text" id="J-datetimepicker" value="00:00"/>
                        <!-- <input v-model="departureTimeInput" type="time" class="input-text" value="" placeholder="" name="departure_time"> -->
                    </div>
                </div> 
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>报名截止时间（距开车前）：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="applyExpiredMinutesInput" type="text" class="input-text" value="" placeholder="" name="apply_expired_minutes">
                    </div>
                    <div class="f-l form-label ml-5">分钟</div>
                </div> 
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>座位数：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="seatsInput" type="text" class="input-text" value="" placeholder="" name="seats">
                    </div>
                </div>
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>价格：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="priceInput" type="text" class="input-text" value="" placeholder="" name="price">
                    </div>
                    <div class="f-l form-label ml-5">元</div>
                </div> 
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>站点：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="busStationSetInput" type="text" class="input-text" value="" placeholder="" name="busstation_set">
                    </div>
                    <a href="javascript:;" class="ml-5 btn btn-secondary size-M radius" v-on:click="addStation()">添加站点</a>
                </div> 
                <div class="row cl" v-if="stationItem.length">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>途径站点：</label>
                    <div class="formControls f-l col-6" >
                        <a href="javascript:;" class="fl mb-5 mr-5 btn btn-success-outline radius size-S" v-for="item in stationItem">
                            <input class="J-station-item station-item" type="text" v-bind:value="item.station_name">
                            <!-- {{item.station_name}} -->
                            <i class="f-14 Hui-iconfont" v-on:click="removeStation($index)">&#xe706;</i>
                        </a>
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
<script>
    import * as base from '../assets/js/base.js';
    export default{
        ready () {
            $('#J-datetimepicker').datetimepicker({
                datepicker:false,
                format:'H:i',
                step:5
            });

            let that = this;
            let ajaxUrl = '';
            let ajaxType = '';
            let getData = this.data;

            base.verticalCenter('.layui-modify'); 
            
            //类型判断
            if(this.type == 'add'){
                ajaxUrl = base.gAjaxUrl.shuttlebuses;
                ajaxType = 'POST';

                this.departureTimeInput = '00:00',
                this.applyExpiredMinutesInput = '',
                this.seatsInput = '',
                this.priceInput = '',
                this.busStationSetInput = '',
                this.stationItem = []

            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.shuttlebuses}${getData.id}/`;
                ajaxType = 'PUT'; 
                this.departmentNameInput = getData.departure_time;

                this.shuttleNameInput = getData.shuttle_name,
                this.departureTimeInput = getData.departure_time,
                this.applyExpiredMinutesInput = getData.apply_expired_minutes,
                this.seatsInput = getData.seats,
                this.priceInput = getData.price/100,
                this.busStationSetInput = '',
                this.stationItem = getData.stations_json

            }

            //验证
            $('#J-layer-form').validate({    
                rules: {  
                    shuttle_name:{
                        required: true,
                    },         
                    departure_time: {
                        required: true,
                    },
                    apply_expired_minutes: {
                        required: true,
                        number:true
                    },
                    seats: {
                        required: true,
                        number:true
                    },
                    price: {
                        required: true,
                        digits:true
                    }

                },                 
                submitHandler:function() {
                    let ajaxStation = [];

                    $('.J-station-item').each(function(){
                        ajaxStation.push({"station_name":$(this).val()});
                    })
                    // console.log(ajaxStation)
                    let ajaxData = {
                        shuttle_name:that.shuttleNameInput,
                        departure_time: that.departureTimeInput,
                        apply_expired_minutes:that.applyExpiredMinutesInput,
                        seats: that.seatsInput,
                        price: that.priceInput*100,
                        busstation_set: ajaxStation,
                    }

                    if(!ajaxStation.length){
                        layer.msg('站点不能为',{icon:2,time:1000});
                        return false;
                    }
                    
                    $.ajax({
                        url: ajaxUrl,
                        contentType: 'application/json',
                        type:ajaxType,
                        data: JSON.stringify(ajaxData)
                    })
                    .always(function(data) {
                        base.ajaxCallback(data,function(){
                            layer.msg('保存成功',{icon:1,time:1000});
                            that.$dispatch('dialog-save');
                        });
                    });
                    
                }             
            }); 
        },
        //动态传值
        props: ['title','type','data'],
        data:function(){
            return {
                shuttleNameInput:'',
                departureTimeInput:'',
                applyExpiredMinutesInput:'',
                seatsInput:'',
                priceInput:'',
                busStationSetInput:'',
                stationItem:[]
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            save:function(){
                $('#J-layer-form').submit();
            },
            //添加站点
            addStation:function(){
                if(this.busStationSetInput){
                    if(_.includes(this.stationItem, this.busStationSetInput)){
                        layer.msg('不能添加重复站点',{icon:1,time:1000});
                        return false;
                    }else{
                        this.stationItem.push({"station_name":this.busStationSetInput});
                    }
                }
                this.busStationSetInput = '';
            },
            //删除站点
            removeStation:function(index){
                this.stationItem.splice(index, 1)
            }
        }
    }
</script>
<style lang="less">
.layer-add-bus{
    .station-item{
        width: 80px;
        display: inline-block;
        border: none;
        background: none;
        line-height: 19px;
        height: 19px;

    }
}
</style>