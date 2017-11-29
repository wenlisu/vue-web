<template>
    <!-- 添加 -->
    <add_detail :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowDetailDialog" v-on:dialog-close="detailDialogClose"></add_detail>
    <add_repairman :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowRepairmanDialog" v-on:dialog-close="repairmanDialogClose" v-on:dialog-save="repairmanDialogSave"></add_repairman>
    <add_price :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowPriceDialog" v-on:dialog-close="priceDialogClose" v-on:dialog-save="priceDialogSave"></add_price>

    <section class="Hui-article-box">
        <div class="page-container bgc-f5 bgc-f5">
            <div class="panel panel-default radius">
                <div class="panel-body">
                    <span class="f-20 fw-b">宿舍普通报修订单管理</span>
                    <!-- <span class="f-r">
                        <a href="javascript:;" class="btn btn-secondary radius" v-on:click="exportData()">导出数据</a>
                    </span> -->
                </div>
            </div>
            <div class="bk-gray radius mt-10 bgc-fff">
                <div class="pd-15 clearfix">
                    <span class="f-l lh-30">订单状态：</span>
                    <span class="select-box f-l mr-10 w-100">
                        <select v-model="selectOrderStatus" class="select" @change="onSelectedOrderStatus($event, item)">
                            <option value="" selected>全部</option>
                            <option value="10">待派单</option>
                            <option value="20">待报价</option>
                            <option value="30">待确认</option>
                            <option value="40">待支付</option>
                            <option value="50">待维修</option>
                            <option value="60">已完成</option>
                            <option value="70">已评价</option>
                            <option value="-10">已取消</option>
                        </select>
                    </span>
                    <span class="f-l lh-30">支付方式：</span>
                    <span class="select-box f-l mr-10 w-100">
                        <select v-model="selectOrderPayType" class="select" @change="onSelectedOrderPayType($event, item)">
                            <option value="" selected>全部</option>
                            <option value="alipay">支付宝</option>
                            <option value="wx">微信</option>
                            <option value="cash">现金</option>
                            <option value="withholding">代缴代扣</option>
                        </select>
                    </span>
                </div>
                <table class="table table-border table-bg table-striped">
                    <thead class="text-c">
                        <tr>
                            <th>申请人</th>
                            <th>工号</th>
                            <th>电话</th>
                            <th>宿舍地址</th>
                            <th>故障项目</th>
                            <th>申请时间</th>
                            <th>完成时间</th>
                            <th>订单状态</th>
                            <th>维修工</th>
                            <th>维修金额</th>
                            <th>支付方式</th>
                            <th class="w-170">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-c" v-for="item in items">
                            <td>{{item.staff_vo.real_name}}</td>
                            <td>{{item.staff_vo.job_number}}</td>
                            <td>{{item.staff_vo.phone}}</td>
                            <td>{{item.room}}</td>
                            <td><span v-for="data in item.fault_item_vos"><span>{{data.fault_name}}<span v-show="$index < item.fault_item_vos.length-1">/</span></span></span></td>
                            <td>{{item.ctime}}</td>
                            <td>{{item.complete_time?item.complete_time:'--'}}</td>
                            <td>{{item.status_name}}</td>
                            <td>{{item.repairman_vo?item.repairman_vo.staff_vo.real_name:'--'}}</td>
                            <td>{{item.pay_amount?item.pay_amount/100:'--'}}</td>
                            <td>{{item.pay_type_name?item.pay_type_name:'--'}}</td>
                            <td>
                                <a class="btn btn-primary radius mr-5 fs-12" title="" href="javascript:;" v-if="item.status==10||item.status==30||(item.status==40&&item.pay_type=='cash')">
                                    <span v-if="item.status==10" v-on:click="clickAppointRepairman(item)">委派维修工</span>
                                    <span v-if="item.status==30" v-on:click="clickConfirmPrice(item)">确认费用</span>
                                    <span v-if="item.status==40 && item.pay_type=='cash'" v-on:click="confirmCash(item.id)">确认支付</span>
                                </a>
                                <a class="btn btn-primary radius fs-12" title="订单详情" href="javascript:;" v-on:click="clickDetail(item)">订单详情</a>
                            </td>
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
    .btn.pd-4{
        padding: 4px;
    }
    .btn.fs-12{
        font-size: 12px;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    import add_detail from '../components/repairorderDetail.vue';
    import add_repairman from '../components/appointRepairman.vue';
    import add_price from '../components/confirmPrice.vue';

    let repairOps = {
        param:{
            status: '',
            pay_type: '',
            page:1,
            page_size:10,
        }
    }

    export default{
        ready(){
            let that = this;

            repairOps.param.page = 1;

            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal,repairOps.param.page)
            });

        },
        data: function(){
            return{
                noData:false,
                itemsLoading:false,
                isShowDetailDialog:false,
                isShowRepairmanDialog:false,
                isShowPriceDialog:false,
                items: [],
                repairTypes:[],
                selectType: '',
                selectApprovalStatus: '',
                selectOrderStatus: '',
                selectOrderPayType: '',
                searchInput:'',
                dialogTitle:'添加报修类型',
                dialogType:'',
                dialogData: {}
            }
        },
        methods: {
            detailDialogClose:function(data){
                this.isShowDetailDialog = false;
            },
            repairmanDialogSave:function(data){
                this.isShowRepairmanDialog = false;
                this.getList();
            },
            repairmanDialogClose:function(data){
                this.isShowRepairmanDialog = false;
            },
            priceDialogSave:function(data){
                this.isShowPriceDialog = false;
                this.getList();
            },
            priceDialogClose:function(data){
                this.isShowPriceDialog = false;
            },
            clickDetail:function(data){
                this.dialogTitle='订单详情';
                this.dialogData=data;
                this.isShowDetailDialog=true;
            },
            clickAppointRepairman:function(data){
                this.dialogTitle='委派维修工';
                this.dialogData=data;
                this.isShowRepairmanDialog=true;
            },
            clickConfirmPrice:function(data){
                this.dialogTitle='确认报价';
                this.dialogType='confirm';
                this.dialogData=data;
                this.isShowPriceDialog = true;
            },
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
                repairOps.param.status = this.selectOrderStatus;
                repairOps.param.pay_type = this.selectOrderPayType;

                $.ajax({
                    url: base.gAjaxUrl.repairorders,
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
            onSelectedOrderStatus:function(event,item){
                this.selectOrderStatus = event.target.value;
                this.getList(1);
            },
            onSelectedOrderPayType:function(event,item){
                this.selectOrderPayType = event.target.value;
                this.getList(1);
            },
            confirmCash:function(id){
                let that = this;

                layer.confirm('该员工是否已完成现金支付？',(index)=>{

                    if($('tbody tr.text-c').length == 1 && repairOps.param.page>1){
                        repairOps.param.page--;
                    };

                    $.ajax({
                        url: `${base.gAjaxUrl.repairorders}${id}/confirm_cash/`,
                        type: 'POST',
                    })
                    .always((data)=>{
                            layer.msg('提交成功',{icon:1,time:1000});
                            that.getList();
                    })
                });
            },
            // exportData: function () {
            //     repairOps.param.search = this.searchInput;
            //     repairOps.param.status = this.selectOrderStatus;
            //     repairOps.param.approval_status = this.selectApprovalStatus;
            //     repairOps.param.repair_type = this.repairTypes;
            //     return $.ajax({
            //         url: `${base.gAjaxUrl.pubrepairorders}export_order_report/`,
            //         contentType: 'application/json',
            //         type:'post',
            //         data: JSON.stringify(repairOps.param)
            //     })
            //     .always((data)=>{
            //         this.$route.router.go({path: '/job', replace: true})
            //     })
            // },
        },
        components: {
            add_detail,
            add_repairman,
            add_price,
        }
    }
</script>