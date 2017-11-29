<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">选择车辆</div>
    <div class="layui-layer-content pd-20">
        <div class="layui-layer-wrap">
            <div class="text-l clearfix">
                <input v-model="searchInput" type="text"  placeholder="车牌/品牌" style="width:250px" class="f-l input-text">
                <button v-on:click="getList()" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
            </div>
            <p>上次选择的车辆:{{selected_driver.vehicle?'':'无'}}</p>
            <table class="table table-border table-bordered table-hover table-bg table-sort row" v-if="selected_driver.vehicle" >
                <thead>
                    <tr class="text-c">
                        <th width="25">选择</th>
                        <th width="70">车牌</th>
                        <th width="70">品牌</th>
                        <th width="70">型号</th>
                        <th width="70">颜色</th>
                        <th width="70">座位数</th>
                        <th width="70">类型</th>
                        <th width="70">备注</th>
                        <th width="70">车辆是否锁定</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-c">
                        <td><input type="radio" class="radio-wh" :value="selected_driver.vehicle_vo" name="car" v-model="selected_vehicle" checked></td>
                        <td>{{selected_driver.vehicle_vo.car_no}}</td>
                        <td>{{selected_driver.vehicle_vo.car_brand}}</td>
                        <td>{{selected_driver.vehicle_vo.car_model}}</td>
                        <td>{{selected_driver.vehicle_vo.car_color}}</td>
                        <td>{{selected_driver.vehicle_vo.seats}}</td>
                        <td>{{selected_driver.vehicle_vo.car_type}}</td>
                        <td>{{selected_driver.vehicle_vo.remark}}</td>
                        <td>{{selected_driver.vehicle_vo.locked == true ? "是" : "否"}}</td>
                    </tr>
                </tbody>
            </table>
            <p>候选车辆:</p>
            <table class="table table-border table-bordered table-hover table-bg table-sort row">
                <thead>
                    <tr class="text-c">
                        <th width="25">选择</th>
                        <th width="70">车牌</th>
                        <th width="70">品牌</th>
                        <th width="70">型号</th>
                        <th width="70">颜色</th>
                        <th width="70">座位数</th>
                        <th width="70">类型</th>
                        <th width="70">备注</th>
                        <th width="70">车辆是否锁定</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-c {{item.vehicle_conflict_order?'busy':''}}" v-for="(index,item) in items">
                    <!-- <tr class="text-c {{item.vehicle_conflict_order?'busy':''}}" v-for="item in items"> -->
                       <!--  <td><input type="radio" :value="item" name="car" v-model="selected_vehicle" :checked="index==1?1:0"></td> -->
                      
                        <td><input type="radio" class="radio-wh" :value="item" name="car" v-model="selected_vehicle"></td>
                        <td>{{item.car_no}}</td>
                        <td>{{item.car_brand}}</td>
                        <td>{{item.car_model}}</td>
                        <td>{{item.car_color}}</td>
                        <td>{{item.seats}}</td>
                        <td>{{item.car_type}}</td>
                        <td>{{item.remark}}</td>
                        <td>{{item.locked == true ? "是" : "否"}}</td>
                    </tr>
                </tbody>
            </table>


            <div id="J-page" class="m-page row" v-if="!noData"></div>
            <div class="no-data text-c mt-50 row" v-if="noData">没有相关数据</div>
        </div>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
    <div class="layui-layer-btn" v-on:click="save"><a class="layui-layer-btn0">确定</a></div>
</div>
<div class="layui-layer-shade"></div>
</template>

<style lang="less">
.avatar{
    width: 50px;
}
.busy{
    background: orange;
}

</style>

<script>
import * as base from '../assets/js/base.js';

    let staffsOps = {
        param:{
            search:'',
            page:1,
            page_size:10,
        }
    }

    export default{
        ready () {
            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal);
                this.deleteDefaultCarFromItems();
            });


        },
        props: ['title', 'data', 'driver'],
        data:function(){
            return {
                noData:false,
                items: [],
                searchInput:'',
                selected_driver:this.driver,
                selected_vehicle:'',
                order: this.data,
                indexFirst: 0,

            }
        },
        methods: {
            //初始化分页
            initPage:function(obj,tpageToal='4'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:1,
                    callback:(p)=>{
                        staffsOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            deleteDefaultCarFromItems:function () {
                if(this.selected_driver.vehicle_vo) {
                    for (var index in this.items) {
                        if (this.items[index].id == this.selected_driver.vehicle_vo.id) {
                            this.items.splice(index, 1);
                        }
                    }
                }
            },
            queryAjax:function(callback=function(){}){
                //修改参数
                staffsOps.param.search = this.searchInput;

                $.ajax({
                    url: `${base.gAjaxUrl.officialcarorders}${this.order.id}/vehicle/`,
                    type: 'GET',
                    data:staffsOps.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        let resultData = data.results;
                        this.items = resultData;
                        if(resultData.length){
                            this.noData = false;
                            //回调
                            callback(data.num_pages);
                        }else{
                            this.noData = true;
                        }
                    });
                })
            },
            //获取列表
            getList:function(){
                //重置第一页
                staffsOps.param.page = 1;

                this.queryAjax((tpageToal='4')=>{
                    this.initPage('#J-page',tpageToal)
                });
            },
            close:function(){
                this.$dispatch('assign-dialog-close');
            },
            save:function(){
               

                /*$('#J-layer-form').submit();*/
                /*this.$dispatch('did-selected-vehicle', this.selected_vehicle);*/
                this.$dispatch('select-vehicle', this.selected_vehicle);
                this.$dispatch('dialog-save');
            }
        }
    }
</script>
