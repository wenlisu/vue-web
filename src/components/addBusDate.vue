<template>
<div class="dialog-calendar layui-layer layui-anim layui-layer-page layui-modify layer-add-bus-date">
    <div class="layui-layer-title">编辑班车日期</div>
    <div id="J-calendar" class="layui-layer-content">
        <div  class="date-color mt-20 ml-20 text-l">
            <ul>
                <li>
                    <span class="red"></span>
                    已过期
                </li>
                <li>
                    <span class="green"></span>
                    开售中
                </li>
                <li>
                    <span class="selected"></span>
                    已设置
                </li>
                <li>
                    <span class="cache"></span>
                    未保存
                </li>
            </ul>
        </div>
        <br>
        <div id="assignTime">
            <input type="radio" name="shuttle_type" value=-10  id="go" v-on:click="get_bus_time(-10)"/>
            <label id="trip" for="go">去程</label>
            <input type="radio" name="shuttle_type" value=10 id="return" v-on:click="get_bus_time(10)"/>
            <label for="return">返程</label>
        </div>
        <div id="bustimes" class="row cl" v-if="bus_times.length">
                    <!--<label class="form-label f-l col-4 "><span class="c-red">*</span>出发时间：</label>-->
                    <!--<div class="formControls f-l col-12">-->
                        <!--<div class="mb-5 mr-5 btn btn-success-outline radius time-item" v-for="item in bus_times" v-on:click="getSourceDate(item.id, $event)">-->
                            <!--&lt;!&ndash;<button type="button" class="btn btn-default">{{item.departure_time}}</button>&ndash;&gt;-->
                            <!--<input type="radio" v-bind:value="item.id" name="bus_time" v-model="bus_time" v-bind:id="item.id"/>-->
                            <!--{{item.departure_time}}-->
                        <!--</div>-->
                    <!--</div>-->
                    <div id="formControls" class="formControls f-l col-12">
                        <div  class="mb-5 mr-5 btn btn-success-outline radius time-item" v-for="item in bus_times" v-on:click="getSourceDate(item.id, $event)" >
                            <!--<button type="button" class="btn btn-default">{{item.departure_time}}</button>-->
                            <input type="radio" v-bind:value="item.id" name="bus_time" v-model="bus_time" v-bind:id="item.id"/>
                            {{item.departure_time}}
                        </div>
                    </div>
        </div>

    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
    <div class="layui-layer-btn" v-on:click="save"><a class="layui-layer-btn0">保存</a></div>
</div>
<div class="layui-layer-shade"></div>
</template>

<style lang="less">
    #app{
        .dialog-calendar{
            width: 540px;
            height: 490px; 
            margin-left:-250px;
        }
        .date-color{
            height:20px;
            line-height: 20px;
            li{
                display: inline-block;
            }
            span{
                width: 20px;
                height:20px;
                float:left;
                border-radius: 3px;
                margin:0 5px;
                &.green{
                    background: green;
                }
                &.red{
                    background: red;
                }
                &.selected{
                    background: #7EA0E2;
                }
                &.cache{
                    background: orange;
                }
            }
        }
    }
    .layer-add-bus-date{
        .formControls input[type="radio"]{
            display: none;
        }

        .selected-time{
            background: #5eb95e;
            color: white;
        }
    }

</style>
<script>
import * as base from '../assets/js/base.js';
    //添加数据
    let newAddArr = [];
    //删除数据
    let newDeleteArr = [];


    export default{
        ready () {
            let that = this;
            
            // 售票日期
            this.saleableDates();
            // 已选中日期
            // let sourceDate = this.sourcedate;
            // 不能删日期
            // let notDeleteArr = _.intersection(this.saleDates,this.sourceDate);

            // console.log('售卖日期')
            // console.log(saleDates)
            // console.log('选中日期')
            // console.log(sourceDate)
            // console.log('售卖+选中=不能删')
            // console.log(notDeleteArr)

            newAddArr = [];
            newDeleteArr = [];

            $('#go').click();

            /*使用方式：
            new Kalendae(指定容器,配置);
            配置属性注解：
            months属性表示日历显示几个月，值：1、2、3.....；默认值：1
            mode属性表示显示的是单选还是多选还是范围，值：'single'、'multiple'、'range'；默认值：'single'
            subscribe属性表示绑定kalendea指定的事件，支持的事件有change、date-clicked、view-changed
            date-clicked——点击日期,但在选择改变。 作为一个时刻对象接收日期点击第一个参数。 返回false将防止选择改变。
            */
            this.calendar = new Kalendae({
                attachTo:document.getElementById('J-calendar'),
                months: 2,
                mode: 'multiple',
                direction:'today-future',
                subscribe: {
                    'date-clicked': function (date) {
                        let todayTimeStamp = new Date($('.k-today').attr('data-date')).getTime();
                        let currentDate = date._i;
                        let currentTimeStamp = new Date(currentDate).getTime();

                        // 先选择时间才可以点击去程或返程的时间
                        if(that.bus_time == ""){
                            layer.msg('请先选择时间！',{icon:2,time:1000});
                            return false;
                        };
                        //不能删除过去的日期 或 删除已售日期
                        if(currentTimeStamp < todayTimeStamp || that.notDeleteArr.indexOf(date._i)>=0){
                            layer.msg('操作失败',{icon:2,time:1000});
                            return false;
                        }else{
                            //是否已选日期
                            if(_.includes(this.sourceDate,currentDate)){
                                //删除日期
                                let deleteArrOf = newDeleteArr.indexOf(currentDate);
                                if(deleteArrOf<0){
                                    newDeleteArr.push(currentDate);
                                    console.log(1);
                                }else{
                                    newDeleteArr.splice(deleteArrOf, 1);
                                    console.log(2);
                                }
                            }else{
                                //添加日期
                                //缓存(2.0)
                                // 如果刚选择的日期不在已经缓存里面，就清空。
                                let selected_bus_time = that.bus_time;
                                if(!(selected_bus_time in that.selected_cache)){
                                    // console.log(3);
                                    that.selected_cache[selected_bus_time] = [];
                                    console.log(3.1);
                                }
                                //如果之前没添加的就添加日期
                                let addArrIndexOf = that.selected_cache[selected_bus_time].indexOf(currentDate);
                                if(addArrIndexOf<0){
                                    that.selected_cache[selected_bus_time].push(currentDate);
                                    console.log(4);
                                }
                                else{
                                    //如果之前添加缓存就删除该缓存
                                    that.selected_cache[selected_bus_time].splice(addArrIndexOf, 1);
                                    console.log('length:'+that.selected_cache[selected_bus_time].length);
                                    if(that.selected_cache[selected_bus_time].length==0){
                                        delete that.selected_cache[selected_bus_time];
                                        console.log(5);
                                    }
                                }
                            }
                        }
                    },
                }
            });
            // $("#return").on('click',function(){
            //     // let selected_bus_time = that.bus_time;
            //     // delete that.selected_cache[selected_bus_time]; 
            //     this.sourceDate = [];
            //     console.log('清空');               
            //     // $('.k-in-month, .k-out-of-month').each(function(){
            //     //     let thisDate = $(this).attr('data-date');
            //     //     let thisTimeStamp = new Date(thisDate).getTime();
            //     //     //已设置的状态颜色
            //     //     $(this).removeClass('cache');
            //     //     $(this).removeClass('sales');
            //     //     $(this).removeClass('expire');
            //     // });                     
            // });


            // $('.k-in-month').on('click',function(){          
            //         that.dateColor();            
            // });
            // 点击添加显示黄色，表示选中
            $('.k-in-month').on('mousedown',function(){
                $('.k-in-month').on('mouseup',function(){
                    that.dateColor();
                });               
            });
            $('.k-in-month').on('mousemove',function(){          
                that.dateColor();            
            });
            
            base.verticalCenter('.layui-modify');
            this.dateColor();

            setTimeout(function(){
                   that.init();
                },200);
            },
        //动态传值
        props: ['title','type','busid'],
        data: function(){
            return {
                bus_times: [],
                bus_time: "",
                sourceDate: [],
                calendar: "",
                notDeleteArr: [],
                saleDates: [],
                selected_cache: {}
            }
        },
        methods: {
            
            init: function(){

                //判断是否是第一次进入该新功能或页面从而弹出新功能的提示
                if(localStorage.addBusdatePromptFlag == 'true'){
                    let arrObj = [$('#assignTime'),$('#bustimes'),$('.k-disable-previous-year-btn'),];
                    /*$('check'),$('exportData'),*/
                    let arrTitle = ['先选择去程还是返程','再选择相应时间','再选择相应的日期',];
                    /*'点击这里可以查看到搭乘详情哦','点击这里可以导出想要的订单详情哦',*/
                    var promptTypes = ['addBusdatePromptFlag',];
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
            dateColor:function(){
                let todayTimeStamp = new Date($('.k-today').attr('data-date')).getTime();
                let that = this;

                $('.k-in-month, .k-out-of-month').each(function(){
                    let thisDate = $(this).attr('data-date');
                    let thisTimeStamp = new Date(thisDate).getTime();
                    //过期的状态颜色
                    if(thisTimeStamp<todayTimeStamp){
                        $(this).addClass('expire');
                    } else if(_.includes(that.notDeleteArr, thisDate)){
                    //已售的状态颜色
                        $(this).addClass('sales');
                    } else if(_.includes(that.selected_cache[that.bus_time], thisDate)){
                    //已设置的状态颜色
                        $(this).addClass('cache');
                    } else {

                    }

                })
            },
            get_bus_time: function(shuttle_type){
                let that = this;
                let busIdData = this.busid;

                $.ajax({
                    url: `${base.gAjaxUrl.shuttlebuses2}${busIdData}/bus_time/?shuttle_type=${shuttle_type}`,
                    type: 'get',
                    contentType: 'application/json',
                })
                .always((data)=>{
                    this.bus_times = data;
                });
            },
            saleableDates:function(){
                $.ajax({
                    url: base.gAjaxUrl.shuttlebuses+'saleable_dates/',
                    type: 'GET',
                })
                .always((data)=>{
                    //售卖日期
                    this.saleDates=data.data;
                })
            },
            //获取已选中日期
            getSourceDate:function(bus_time, event){
                this.bus_time = bus_time;

                $(event.target).siblings().removeClass('selected-time');
                $(event.target).addClass('selected-time');
                let busIdData = this.busid;
                $.ajax({
                    url: `${base.gAjaxUrl.shuttlebuses2}${busIdData}/dates/?bus_time=${bus_time}`,
                    type: 'GET',
                })
                .always((data)=>{

                    console.log(bus_time);
                    let that = this;

                    // for(let i = 0; i < data.length; i++){
                    //     this.sourceDate.push(data[i]['departure_date'])
                    // }
                    this.sourceDate = [];
                    console.log(1.1);
                    $(data).each(function(i,e){
                        that.sourceDate.push(e['departure_date'])
                    });
                    console.log(2.2);
                    this.notDeleteArr = _.intersection(this.saleDates,this.sourceDate);
                    //var selected_date = []
                    var selected_date = this.sourceDate.concat(this.selected_cache[this.bus_time]);
                    that.calendar.setSelected(selected_date);
                    that.calendar.subscribe('view-changed', function () {
                       that.dateColor();
                    });
                    that.dateColor();
                })

            },
            save:function(){
                let that = this;
                let busIdData = this.busid;
                let bus_time_id = this.bus_time;
                let DateData = this.selected_cache;
                console.log(bus_time_id);

                //添加
                let ajaxAddData = {
                    // departure_date:newAddArr,
                    // bus_time: bus_time_id
                    data: DateData
                }
                $.ajax({
                    url: `${base.gAjaxUrl.shuttlebuses2}${busIdData}/bulk_create_date2/`,
                    contentType: 'application/json',
                    data:JSON.stringify(ajaxAddData)
                })
                .always((data)=>{
                    base.ajaxCallback(data,function(){
                        //删除
                        let ajaxDeleteData = {
                            departure_date:newDeleteArr
                        }
                        $.ajax({
                            type:'DELETE',
                            url: `${base.gAjaxUrl.shuttlebuses2}${busIdData}/bulk_delete_date/`,
                            contentType: 'application/json',
                            data:JSON.stringify(ajaxDeleteData)
                        })
                        .always((data)=>{
                            layer.msg('保存成功',{icon:1,time:1000});
                            that.$dispatch('dialog-save');
                        })
                    });
                })

            }
        }
    }

    //数组功能扩展
Array.prototype.each = function(fn){
    fn = fn || Function.K;
     var a = [];
     var args = Array.prototype.slice.call(arguments, 1);
     for(var i = 0; i < this.length; i++){
         var res = fn.apply(this,[this[i],i].concat(args));
         if(res != null) a.push(res);
     }
     return a;
};
//数组是否包含指定元素
Array.prototype.contains = function(suArr){
    for(var i = 0; i < this.length; i ++){
        if(this[i] == suArr){
            return true;
        }
     }
     return false;
}
//不重复元素构成的数组
Array.prototype.uniquelize = function(){
     var ra = new Array();
     for(var i = 0; i < this.length; i ++){
        if(!ra.contains(this[i])){
            ra.push(this[i]);
        }
     }
     return ra;
};
//两个数组的补集
Array.complement = function(a, b){
     return Array.minus(Array.union(a, b),Array.intersect(a, b));
};
//两个数组的交集
Array.intersect = function(a, b){
     return a.uniquelize().each(function(o){return b.contains(o) ? o : null});
};
//两个数组的差集
Array.minus = function(a, b){
     return a.uniquelize().each(function(o){return b.contains(o) ? null : o});
};
//两个数组并集
Array.union = function(a, b){
     return a.concat(b).uniquelize();
};
</script>

