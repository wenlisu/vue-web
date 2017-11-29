<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content pd-10">
        <div class="panel radius bgc-e5">
            <div class="pd-10">
                <span class="mr-5">故障项目：<span v-for="item in data.fault_item_vos"><span>{{item.fault_name}}<span v-show="$index < data.fault_item_vos.length-1">/</span></span></span></span>
                <span class="mr-5">宿舍地址：{{data.room}}</span>
            </div>
        </div>
        <div class="bk-gray radius mt-10">
            <div class="pd-10">维修材料:</div>
            <table class="table table-border table-bg table-striped">
                <thead class="text-c">
                    <tr>
                        <th>序号</th>
                        <th>材料名称</th>
                        <th>规格型号</th>
                        <th>品牌</th>
                        <th>数量</th>
                        <th>单价(元)</th>
                        <th>总价</th>
                    </tr>
                </thead>
                <tbody class="text-c">
                    <tr v-for="item in data.repairordermaterial_set">
                        <td>{{$index+1}}</td>
                        <td>{{item.material_vo.name}}</td>
                        <td>{{item.material_vo.format}}</td>
                        <td>{{item.material_vo.brand}}</td>
                        <td>{{item.material_number}}</td>
                        <td>{{item.material_vo.price}}</td>
                        <td>{{item.material_number*item.material_vo.price}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-10 pd-10">额外材料: <span class="ml-5" v-if="data.repairorderextracharge_set.length==0">无</span></div>
            <table class="table table-border table-bg table-striped" v-if="data.repairorderextracharge_set.length!=0">
                <thead class="text-c">
                    <tr>
                        <th>序号</th>
                        <th>材料名称</th>
                        <th>价钱</th>
                    </tr>
                </thead>
                <tbody class="text-c">
                    <tr v-for="item in data.repairorderextracharge_set">
                        <td>{{$index+1}}</td>
                        <td>{{item.content}}</td>
                        <td>{{item.price}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="clearfix">
            <div class="layui-layer-btn place f-r" v-on:click="save"><a class="layui-layer-btn0" v-if="type!='check'">确认报价</a></div>
            <form id="J-layer-form" class="f-r mt-10">
                维修报价：
                <input v-model="payAmountInput" type="text" class="input-text w-100" value="" placeholder="" name="pay_amount">
                元(<span class="color-b">可修改</span>)
            </form>
        </div>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
</div>
<div class="layui-layer-shade"></div>
</template>

<style lang="less">
    .color-b{
        color:#206afc;
    }
    #J-layer-form{
        position: relative;
    }
    #J-layer-form label.error{
        right: 70px;
    }
</style>
<script>
import * as base from '../assets/js/base.js';

    export default{
        ready () {
            let that = this;
            let getData = this.data;
            this.payAmountInput = getData.pay_amount/100;

            base.verticalCenter('.layui-modify');

            //验证
            $('#J-layer-form').validate({
                rules: {
                    pay_amount: {
                        required: true,
                    },
                },
                submitHandler:function(callback=function(){}) {
                    let ajaxData = {
                        pay_amount: that.payAmountInput,
                    }
                    $.ajax({
                        url: `${base.gAjaxUrl.repairorders}${getData.id}/price/`,
                        contentType: 'application/json',
                        type: 'POST',
                        data: JSON.stringify(ajaxData),
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
                payAmountInput: '',
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            save:function(){
                $('#J-layer-form').submit();
            }
        },
    }
</script>
