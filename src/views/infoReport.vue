<template>
    <section class="Hui-article-box">
        <div class="page-container bgc-f5">
            <div class="panel panel-default radius">
				<div class="panel-body f-20 fw-b">材料使用统计</div>
			</div>
            <div class="bk-gray radius mt-10 bgc-fff">
                <div class="pd-15 clearfix">
                    开始日期：
                    <input  v-model="startDateInput" type="text" class="input-text Wdate mr-5" style="width:120px;" id="J-start-date" v-bind:value="startDateInput">
                    结束日期：
                    <input v-model="endDateInput" type="text" class="input-text Wdate mr-5" style="width:120px;" id="J-end-date" v-bind:value="endDateInput">
                    <div class="text-l clearfix f-r mr-15">
                        <input v-model="searchInput" type="text"  placeholder="材料名称" style="width:250px" class="f-l input-text">
                        <button v-on:click="getList(1)" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
                    </div>
                </div>
                <table class="table table-border table-bg table-striped">
                    <thead class="text-c">
                        <tr>
                            <th>序号</th>
                            <th>材料名称</th>
                            <th>规格型号</th>
                            <th>品牌</th>
                            <th>属性</th>
                            <th>单位</th>
                            <th>数量</th>
                            <th>单价(元)</th>
                            <th>统计费用(元)</th>
                            <th>材料来源</th>
                        </tr>
                    </thead>
                    <tbody class="text-c">
                        <tr v-for="item in items">
                            <td>{{$index+1}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.format}}</td>
                            <td>{{item.brand}}</td>
                            <td>{{item.prop}}</td>
                            <td>{{item.unit}}</td>
                            <td>{{item.used_cnt}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.total_price}}</td>
                            <td>{{item.source}}</td>
                        </tr>
                    </tbody>
                </table>
                <div id="J-page" class="m-page" v-show="!noData"></div>
                <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
                <div class="m-loading" v-if="itemsLoading">
                    <div class="cube1"></div>
                    <div class="cube2"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="less" scoped>
    .bgc-f5{
        background-color: #f5f5f5;
    }
    .fw-b{
        font-weight: bold;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    import moment from "moment";

    let repairOps = {
        param:{
            name:'',
            start_date:'',
            end_date:'',
            page:1,
            page_size:10,
        }
    };
    let vm;

    export default{
        ready(){
            let that = this;
            vm = this;

            this.startDateInput = moment().add('-1','months').format('YYYY-MM-DD');
            this.endDateInput = moment().format('YYYY-MM-DD');

            new Kalendae.Input('J-end-date', {
                months: 2,
            });
            new Kalendae.Input('J-start-date', {
                months: 2,
            });

            repairOps.param.page = 1;
            
            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal,repairOps.param.page)
            });
        },
        data: function(){
            return{
                noData:false,
                itemsLoading:false,
                isShowImportDialog:false,
                items: [],
                startDateInput:'2016-08-01',
                endDateInput:'2016-09-01',
                searchInput:'',
                dialogTitle:'添加维修工',
                dialogType:'add',
                dialogData:''
            }
        },
        methods: {
            //初始化分页
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        repairOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            //获取列表
            getList:function(reset=0){
                let that = this;
                //重置第一页
                if(reset){
                    repairOps.param.page = 1
                }

                this.queryAjax((tpageToal='4')=>{
                    that.initPage('#J-page',tpageToal,repairOps.param.page)
                });
            },
            queryAjax:function(callback=function(){}){
                //修改参数
                this.itemsLoading = true;
                repairOps.param.name = this.searchInput;
                repairOps.param.start_date = this.startDateInput;
                repairOps.param.end_date = this.endDateInput;

                $.ajax({
                    url: base.gAjaxUrl.infoReport,
                    type: 'GET',
                    data:repairOps.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.itemsLoading = false;
                        let resultData = data.results;
                        this.items = resultData;
                        if(resultData && resultData.length){
                            this.noData = false;
                            //回调
                            callback(data.num_pages);
                        }else{
                            this.noData = true;
                        }
                    });
                })
            },
        },
        components: {

        }
    }
</script>