<template>
    <!-- 添加 -->
    <detail :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowDetailDialog" v-on:dialog-close="detailDialogClose"></detail>

    <section class="Hui-article-box">
        <div class="page-container bgc-f5 bgc-f5">
            <div class="panel panel-default radius">
				<div class="panel-body">
                    <span class="f-20 fw-b">公共区域报修订单管理</span>
                    <!-- <span class="f-r">
                        <a href="javascript:;" class="btn btn-secondary radius" v-on:click="exportData()">导出数据</a>
                    </span> -->
                </div>
			</div>
            <div class="bk-gray radius mt-10 bgc-fff">
                <div class="pd-15 clearfix">
                    <span class="f-l lh-30">报修类型：</span>
                    <span class="select-box f-l mr-10 w-100">
                        <select v-model="selectType" class="select" @change="onSelectedType($event, item)">
                            <option value="" selected>全部</option>
                            <option v-for="item in repairTypes" value="{{item.id}}">{{item.type_name}}</option>
                        </select>
                    </span>
                    <span class="f-l lh-30">审批状态：</span>
                    <span class="select-box f-l mr-10 w-100">
                        <select v-model="selectApprovalStatus" class="select" @change="onSelectedApprovalStatus($event, item)">
                            <option value="" selected>全部</option>
                            <option value="20">正在审批中</option>
                            <option value="10">审批通过</option>
                            <option value="-10">驳回</option>
                        </select>
                    </span>
                    <span class="f-l lh-30">订单状态：</span>
                    <span class="select-box f-l mr-10 w-100">
                        <select v-model="selectOrderStatus" class="select" @change="onSelectedOrderStatus($event, item)">
                            <option value="" selected>全部</option>
                            <option value="10">审批中</option>
                            <option value="20">待维修</option>
                            <option value="30">已完成</option>
                            <option value="40">已评价</option>
                            <option value="-10">已取消</option>
                        </select>
                    </span>
                    <div class="text-l clearfix f-r mr-15">
                        <input v-model="searchInput" type="text"  placeholder="姓名/工号/手机号" style="width:250px" class="f-l input-text">
                        <button v-on:click="getList(1)" class="btn btn-success" type="button"><i class="f-r Hui-iconfont">&#xe665;</i></button>
                    </div>
                </div>
                <table class="table table-border table-bg table-striped">
                    <thead class="text-c">
                        <tr>
                            <th>申请人</th>
                            <th>工号</th>
                            <th>电话</th>
                            <th>报修类型</th>
                            <th>故障地址</th>
                            <th>故障项目</th>
                            <th>申请时间</th>
                            <th>审批状态</th>
                            <th>订单状态</th>
                            <th>审批人</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-c" v-for="item in items">
                            <td>{{item.staff_vo.real_name}}</td>
                            <td>{{item.staff_vo.job_number}}</td>
                            <td>{{item.staff_vo.phone}}</td>
                            <td>{{item.repair_type_name}}</td>
                            <td>{{item.location}}</td>
                            <td><span v-for="data in item.fault_item_vos"><span>{{data.fault_name}}<span v-show="$index < item.fault_item_vos.length-1">/</span></span></span></td>
                            <td>{{item.ctime}}</td>
                            <td>{{item.approval_status_name}}</td>
                            <td>{{item.status_name}}</td>
                            <td><span v-for="list in item.approvalinfo_set"><span>{{list.approver_vo.real_name}}<span v-show="$index < item.approvalinfo_set.length-1">/</span></span></span></td>
                            <td>
                                <a class="btn btn-primary radius mr-5 fs-12" title="订单详情" href="javascript:;" class="ml-5" v-on:click="clickDetail(item)">订单详情</a>
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
    import detail from '../components/pubrepairorderDetail.vue';

    let repairOps = {
        param:{
            status: '',
            approval_status: '',
            repair_type: '',
            search:'',
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
            this.getRepairTypeList();
        },
        data: function(){
            return{
                noData:false,
                itemsLoading:false,
                isShowDetailDialog:false,
                items: [],
                repairTypes:[],
                selectType: '',
                selectApprovalStatus: '',
                selectOrderStatus: '',
                searchInput:'',
                dialogTitle:'添加报修类型',
                dialogType:'add',
                dialogData: {}
            }
        },
        methods: {
            detailDialogClose:function(data){
                this.isShowDetailDialog = false;
            },
            clickDetail:function(data){
                this.dialogTitle='订单详情';
                this.dialogData = data;
                this.isShowDetailDialog = true;
            },
            clickModify:function(data){
                this.dialogTitle='修改报修类型';
                this.dialogType='modify';
                this.dialogData=data;
                this.isShowDetailDialog = true;
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
            //获取公共区域报修订单列表
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
                repairOps.param.search = this.searchInput;
                repairOps.param.status = this.selectOrderStatus;
                repairOps.param.approval_status = this.selectApprovalStatus;
                repairOps.param.repair_type = this.selectType;

                $.ajax({
                    url: base.gAjaxUrl.pubrepairorders,
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
            //获取报修类型列表
            getRepairTypeList:function(){
                let ajaxData = {
                    param: {
                        search:'',
                        page:1,
                        page_size:1000,
                    }
                };
                $.ajax({
                    url: base.gAjaxUrl.repairtypes,
                    type: 'GET',
                    data: ajaxData.param,
                })
                .always((data)=>{
                    let resultData = data.results;
                    this.repairTypes = resultData;
                });
            },
            onSelectedType:function(event,item){
                this.selectType = event.target.value;
                this.getList(1);
            },
            onSelectedApprovalStatus:function(event,item){
                this.selectApprovalStatus = event.target.value;
                this.getList(1);
            },
            onSelectedOrderStatus:function(event,item){
                this.selectOrderStatus = event.target.value;
                this.getList(1);
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
            detail,
        }
    }
</script>