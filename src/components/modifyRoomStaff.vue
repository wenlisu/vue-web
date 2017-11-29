<template>
<div class="layui-layer layui-anim layui-layer-page layui-modify">
    <div class="layui-layer-title">{{title}}</div>
    <div class="layui-layer-content pd-10">
        <div class="">
            <div class="roomTitle">
                <img src="../assets/images/icon-room.png" height="atuo" width="32" alt="" class="mr-10 roomIcon">
                <span class="mr-10 f-20 roomNo">{{data.room_no}}房</span>
                <span class="mr-10">{{data.building_vo.building_name}}</span>
            </div>
            <div class="mt-5 fc-999">
                <span class="mr-10">{{data.room_type_vo.type_name}}({{data.room_type_vo.content}}人)</span>
                <span class="mr-10">已入住：{{data.staff_num}}人</span>
                <span class="mr-10">空调：{{data.room_type_vo.has_TV?'有':'无'}}</span>
                <span class="mr-10">电视：{{data.room_type_vo.has_air_conditioning?'有':'无'}}</span>
                <span class="mr-10">电脑：{{data.room_type_vo.has_computer?'有':'无'}}</span>
            </div>
        </div>
        <table class="table table-border table-bg table-striped mt-10 bor-l bor-r">
            <thead class="text-c">
                <tr>
                    <th>床号</th>
                    <th>姓名/性别</th>
                    <th>部门/职位</th>
                    <th>工号</th>
                    <th>电话</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody class="text-c">
                <tr v-for="item in items">
                    <td>{{$index+1}}</td>
                    <td>{{item.real_name}}/{{item.sex==1?'男':'女'}}</td>
                    <td>{{item.department_vo.department_name}}/{{item.position}}</td>
                    <td>{{item.job_number}}</td>
                    <td>{{item.phone}}</td>
                    <td>
                        <a href="javascript:;" title="退房" v-on:click="clickCheckout(item)"><img src="../assets/images/icon-tui.png" height="20" width="20" alt=""></a>
                    </td>
                </tr>
                <tr v-for="item in notfullItemsLength" v-if="this.data.room_type_vo.content != this.data.staff_num">
                    <td>{{$index+1+data.staff_num}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <a href="javascript:;" title="添加" v-on:click="clickAdd(item)"><img src="../assets/images/icon-add.png" height="20" width="20" alt=""></a>
                    </td>
                </tr>
            </tbody>
            <div class="m-loading" v-if="isLoading">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
        </table>
    </div>
    <span class="layui-layer-setwin">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" v-on:click="close()"></a>
    </span>
    <!-- <div class="layui-layer-btn" v-on:click="save"><a class="layui-layer-btn0" v-if="type!='check'">保存</a></div> -->
</div>
<div class="layui-layer-shade"></div>

    <!-- 添加 -->
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" :roomid="data.id" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
</template>

<style lang="less">
    .roomTitle{
        position: relative;
        padding-left: 36px;
    }
    .roomIcon{
        position: absolute;
        top: 0px;
        left: 0;
    }
    .roomNo{
        color:#206afc;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/setRoomStaff.vue";

    export default{
        ready () {
            let that = this;
            let ajaxUrl = '';
            let ajaxType = '';
            let getData = this.data;

            base.verticalCenter('.layui-modify');

            this.getList(getData.id);
            this.notfullItemsLength = this.data.room_type_vo.content - this.data.staff_num;
        },
        props: ['title','type','data','buildingid'],
        data:function(){
            return {
                isLoading: false,
                isShowAddDialog: false,
                items: [],
                notfullItemsLength: 0,
                dialogType:'add',
                dialogTitle:'选择入住员工',
                dialogData:{},
            }
        },
        methods: {
            close:function(){
                this.$dispatch('dialog-close');
            },
            addDialogClose:function(data){
                this.isShowAddDialog = false;
            },
            addDialogSave:function(){
                this.isShowAddDialog = false;
                this.getList(this.data.id);
                this.getRoomsMessage(this.data.id);
            },
            clickAdd:function(){
                this.dialogType='add';
                this.dialogTitle='添加宿舍人员';
                this.isShowAddDialog = true;
            },
            clickCheckout:function(item){
                let that = this;

                layer.confirm(
                    `确认安排员工:${item.real_name},退出房间：${this.data.location}房吗？`, 
                    {
                        title: '宿舍人员退房'
                    },
                    (index)=>{
                        let ajaxData = {
                            staff: item.id
                        }
                        $.ajax({
                            url: `${base.gAjaxUrl.rooms}${that.data.id}/checkout/`,
                            contentType: 'application/json',
                            type: 'POST',
                            data: JSON.stringify(ajaxData)
                        })
                        .always((data)=>{
                            layer.msg('退房成功',{icon:1,time:1000});
                            that.getList(that.data.id);
                            that.getRoomsMessage(that.data.id);
                        })
                    }
                );
            },
            //获取房间所住员工列表
            getList:function(id){
                let that = this;
                this.isLoading = true;

                $.ajax({
                    url: `${base.gAjaxUrl.rooms}${id}/staffs/`,
                    type: 'GET',
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        this.isLoading = false;
                        let resultData = data;
                        this.items = resultData;
                    });
                })
            },
            getRoomsMessage:function(id){
                let that = this;
                $.ajax({
                    url: `${base.gAjaxUrl.rooms}${id}/`,
                    type: 'GET',
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        that.isLoading = false;
                        let resultData = data;
                        that.data = resultData;
                        that.notfullItemsLength = this.data.room_type_vo.content - this.data.staff_num;
                    });
                })
            }
        },
        components:{
            add,
        }
    }
</script>
