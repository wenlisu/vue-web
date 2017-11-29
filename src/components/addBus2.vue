<template>
    <div class="layui-layer layui-anim layui-layer-page layui-modify layer-add-bus">
        <div class="layui-layer-title">{{title}}</div>
        <div class="layui-layer-content">
            <form id="J-layer-form" class="form form-horizontal layui-layer-wrap">
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>班次名称：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="shuttleNameInput" type="text" class="input-text" value="" placeholder="不能为空" name="shuttle_name">
                    </div>
                </div>
                <div id="addGoDepartureTimeId" class="row cl">
                    <label  class="form-label f-l col-4 "><span class="c-red">*</span>去程出发时间：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="GoDepartureTimeInput" type="text" class="input-text" id="GO-datetimepicker" value="00:00"/>
                        <!--<input v-model="GoDepartureTimeInput" type="time" class="input-text" value="" placeholder="" name="departure_time"> -->
                    </div>
                    <a  href="javascript:;" class="ml-5 btn btn-secondary size-M radius" v-on:click="addGoDepartureTime()">添加</a>
                </div>
                <div class="row cl" v-if="GoDepartureTimeList.length">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>去程出发时间：</label>
                    <div class="formControls f-l co l-6" >
                        <a href="javascript:;" class="fl mb-5 mr-5 btn btn-success-outline radius size-S" v-for="item in GoDepartureTimeList">
                            <input class="J-go-time-item station-item" type="text" v-bind:value="item.departure_time" v-bind:id="item.id" disabled="disabled" >
                            <!-- {{item.station_name}} -->
                            <i class="f-14 Hui-iconfont" v-on:click="removeGoDepartureTime($index)">&#xe706;</i>
                        </a>
                    </div>
                </div>
                <div id="addReturnDepartureTimeId"  class="row cl">
                    <label  class="form-label f-l col-4 "><span class="c-red">*</span>返程出发时间：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="ReturnDepartureTimeInput" type="text" class="input-text" id="RETURN-datetimepicker" value="00:00"/>
                        <!-- <input v-model="departureTimeInput" type="time" class="input-text" value="" placeholder="" name="departure_time"> -->
                    </div>
                    <a  href="javascript:;" class="ml-5 btn btn-secondary size-M radius" v-on:click="addReturnDepartureTime()">添加</a>
                </div>
                <div class="row cl" v-if="ReturnDepartureTimeList.length">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>返程出发时间：</label>
                    <div class="formControls f-l col-6" >
                        <a href="javascript:;" class="fl mb-5 mr-5 btn btn-success-outline radius size-S" v-for="item in ReturnDepartureTimeList">
                            <input class="J-return-time-item station-item" type="text" v-bind:value="item.departure_time" v-bind:id="item.id" disabled="disabled" >
                            <!-- {{item.station_name}} -->
                            <i class="f-14 Hui-iconfont" v-on:click="removeReturnDepartureTime($index)">&#xe706;</i>
                        </a>
                    </div>
                </div>
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>报名截止时间（距开车前）：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="applyExpiredMinutesInput" type="text" class="input-text" value="" placeholder="不能为空或负数" name="apply_expired_minutes">
                    </div>
                    <div class="f-l form-label ml-5">分钟</div>
                </div>
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>座位数：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="seatsInput" type="text" class="input-text" value="" placeholder="不能为空或负数" name="seats">
                    </div>
                </div>
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>价格：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="priceInput" type="text" class="input-text" value="" placeholder="不能为空或负数" name="price">
                    </div>
                    <div class="f-l form-label ml-5">元</div>
                </div>
                <div class="row cl">
                    <label class="form-label f-l col-4 "><span class="c-red">*</span>站点：</label>
                    <div class="formControls f-l col-2">
                        <input v-model="busStationSetInput" v-on:focus="toggleShow()" v-on:blur="toggleHidden()" type="text" class="input-text" value="" placeholder="至少添加两个站点" name="busstation_set">
                    </div>
                    <a id="addStation" href="javascript:;" class="f-l ml-5 btn btn-secondary size-M radius" v-on:click="addStation()">添加站点</a>

                    <div v-if="is_show_Station" class="f-l col-8-width btn-secondary-outline pl-5 tips-border"><i class="f-18 c-primary Hui-iconfont">&#xe6cd;</i>
                       <i class="pt-5 lh-28" >请至少添加两个站点。</i>   
                    </div>
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
        <div  class="layui-layer-btn" v-on:click="save"><a class="layui-layer-btn0">保存</a></div>
    </div>
    <div class="layui-layer-shade"></div>
</template>
<style lang="less">
    .tips-border {
        height: 30px;
        line-height: 22px;
        border: 1px solid #3bb4f2;
    }
    .tips-content{
       height: 60px; 
    }
    .col-8-width{
        width: 11pc;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    export default{
        ready () {
            
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
            let that = this;
            let ajaxUrl = '';
            let ajaxType = '';
            let getData = this.data;
            console.log('getData');
            console.log(getData);

            base.verticalCenter('.layui-modify');
            

            //类型判断
            if(this.type == 'add'){
                ajaxUrl = base.gAjaxUrl.shuttlebuses2;
                ajaxType = 'POST';

                this.GoDepartureTimeInput = '00:00',
                this.ReturnDepartureTimeInput = '00:00',
                this.applyExpiredMinutesInput = '',
                this.seatsInput = '',
                this.priceInput = '',
                this.busStationSetInput = '',
                this.stationItem = [],
                this.GoDepartureTimeList = [],
                this.ReturnDepartureTimeList = [],
                this.DepartureTimeList = []

            }else if(this.type == 'modify'){
                ajaxUrl = `${base.gAjaxUrl.shuttlebuses2}${getData.id}/`;
                ajaxType = 'PUT';
                this.departmentNameInput = getData.departure_time;
                let i;
                let go_times  = [];
                let return_times = [];
                let bus_times = getData.bus_times
                for (i in bus_times){
                    if(bus_times[i]['shuttle_type']==-10){
                        go_times.push(bus_times[i]);
                    }else if(bus_times[i]['shuttle_type']==10){
                        return_times.push(bus_times[i]);
                    }
                };

                this.shuttleNameInput = getData.shuttle_name,
                this.departureTimeInput = getData.departure_time,
                this.applyExpiredMinutesInput = getData.apply_expired_minutes,
                this.seatsInput = getData.seats,
                this.priceInput = getData.price/100,
                this.busStationSetInput = '',
                this.stationItem = getData.stations_json


                this.GoDepartureTimeList = go_times,
                this.ReturnDepartureTimeList = return_times
                console.log(this.ReturnDepartureTimeList)


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
                        digits:true
                    },
                    seats: {
                        required: true,
                        digits:true
                    },
                    price: {
                        required: true,
                        digits:true
                    }

                },
                submitHandler:function() {
                    let ajaxStation = [];
                    let ajaxBusTime = [];

                    $('.J-station-item').each(function(){
                        ajaxStation.push({"station_name":$(this).val()});
                    })
                    $('.J-go-time-item').each(function(){
                        ajaxBusTime.push({"departure_time": $(this).val(), "shuttle_type": -10});
                    })
                    $('.J-return-time-item').each(function(){
                        ajaxBusTime.push({"departure_time": $(this).val(), "shuttle_type": 10});
                    })

                    // console.log(ajaxStation)
                    let ajaxData = {
                        shuttle_name:that.shuttleNameInput,
                        apply_expired_minutes:that.applyExpiredMinutesInput,
                        seats: that.seatsInput,
                        price: that.priceInput*100,
                        busstation_set: ajaxStation,
                        shuttletime_set: ajaxBusTime,
                        departure_time: '00:00'
                    }

                    if(!ajaxStation.length){
                        layer.msg('站点不能为空',{icon:2,time:1000});
                        return false;
                    }
                    if(!ajaxBusTime.length){
                        layer.msg('时间不能为空',{icon:2,time:1000});
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
            /*新功能引导提示*/
            setTimeout(function(){
                that.init();
            },200);
        },
        //动态传值
        props: ['title','type','data'],
        data:function(){
            return {
                shuttleNameInput:'',
                GoDepartureTimeInput:'00:00',
                ReturnDepartureTimeInput: '00:00',
                applyExpiredMinutesInput:'',
                seatsInput:'',
                priceInput:'',
                busStationSetInput:'',
                stationItem:[],
                GoDepartureTimeList:[],
                ReturnDepartureTimeList:[],
                is_show_Station: false
            }
        },
        methods: {
            toggleShow: function(obj,flag){
                this.is_show_Station = true;
            },
            toggleHidden: function(obj,flag){
                this.is_show_Station = false;
            },
            init: function(){

                //判断是否是第一次进入该新功能或页面从而弹出新功能的提示
                if(localStorage.addBus2PromptFlag == 'true'){
                    let arrObj = [$('#addGoDepartureTimeId'),$('#addReturnDepartureTimeId'),$('#addStation'),];
                    let arrTitle = ['记得点击这里添加去程时间','可以点击这里添加返程时间','添加的途径站点至少要两个',];
                    var promptTypes = ['addBus2PromptFlag',];
                    $.guidance({
                        obj:arrObj,
                        title:arrTitle,
                        flag:promptTypes,
                    });
                }
            },
            close:function(){
                this.$dispatch('dialog-close');
            },
            save:function(){
                // if((this.GoDepartureTimeList.length > 0) && (this.ReturnDepartureTimeList.length > 0) && (this.stationItem.length > 1)) {
                if(((this.GoDepartureTimeList.length > 0) && (this.stationItem.length > 1)) || ((this.ReturnDepartureTimeList.length > 0) && (this.stationItem.length > 1))) {
                    $('#J-layer-form').submit();
                }
                else if(this.GoDepartureTimeList.length == 0 && this.ReturnDepartureTimeList.length == 0){
                    layer.msg('请至少添加去程出发时间或返程出发时间',{icon:1,time:2000});
                }
                // else if(this.ReturnDepartureTimeList.length == 0 && this.GoDepartureTimeList.length > 0){
                //     layer.msg('请添加返程出发时间',{icon:1,time:2000});
                // }
                else if(this.stationItem.length >= 0 && this.stationItem.length < 2) {       
                    layer.msg('请至少添加两个站点。',{icon:1,time:1000}); 
                 }
                else {
                    layer.msg('请先填写完整信息',{icon:1,time:2000});
                }
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
                // if(this.stationItem.length > 0 && this.stationItem.length < 2) {
                //     layer.msg('请至少添加两个站点',{icon:1,time:1000});
                // }
            },
            //删除站点
            removeStation:function(index){
                this.stationItem.splice(index, 1)
            },
            // add go departure time
            addGoDepartureTime:function(){
                if(this.GoDepartureTimeInput){
                    if(_.includes(this.GoDepartureTimeList, this.GoDepartureTimeInput)){
                        layer.msg('不能添加重复时间',{icon:1,time:1000});
                        return false;
                    }else{
                        this.GoDepartureTimeList.push({"departure_time":this.GoDepartureTimeInput, "shuttle_type": -10});
                    }
                }
                //  this.busStationSetInput = '';
            },
            // delete go time
            removeGoDepartureTime:function(index){
                this.GoDepartureTimeList.splice(index, 1)
            },
            // add return departure time
            addReturnDepartureTime:function(){
                if(this.ReturnDepartureTimeInput){
                    if(_.includes(this.ReturnDepartureTimeList, this.ReturnDepartureTimeInput)){
                        layer.msg('不能添加重复时间',{icon:1,time:1000});
                        return false;
                    }else{
                        this.ReturnDepartureTimeList.push({"departure_time":this.ReturnDepartureTimeInput, "shuttle_type": 10});
                    }
                }
                //  this.busStationSetInput = '';
            },
            // delete return time
            removeReturnDepartureTime:function(index){
                this.ReturnDepartureTimeList.splice(index, 1)
            },
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