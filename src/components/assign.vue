<template>
<select_driver :data="order"  v-if="(this.step==1)" v-on:dialog-next="dialogNext" v-on:select-driver="selectDriver" v-on:dialog-save="dialogSave"></select_driver>
<select_vehicle :data="order" :driver="selectedDriver" v-if="(this.step==2)" v-on:select-vehicle="selectVehicle" v-on:dialog-save="dialogSave" v-on:get-selected-driver="getDefaultCar"></select_vehicle>
</template>

<style lang="less">

</style>
<script>
import * as base from '../assets/js/base.js';
import select_driver from "../components/selectDriver.vue";
import select_vehicle from "../components/selectVehicle.vue";

    let params = {
        staff:'',
        vehicle:'',
    }
    let assignOps = {
        param:{
            driver:'',
            vehicle:''
        }
    }

    export default{
        ready () {
            base.verticalCenter('.layui-modify');
        },
        props: ['title','type','data'],
        data:function(){
            return {
                order: this.data,
                isShowAddDialog:true,
                step:1,
                selectedDriver: '',
                selectedVehicle: ''
            }
        },
        methods: {
            dialogNext:function(){
                console.log('dialogNext')
                this.step += 1;
            },
            close:function(){
                this.$dispatch('dialog-close');
            },
            dialogSave:function(){
                assignOps.param.driver = this.selectedDriver.id;
                assignOps.param.driver_conflict_order = this.selectedDriver.driver_conflict_order;
                assignOps.param.vehicle = this.selectedVehicle.id;
                $.ajax({
                        url: `${base.gAjaxUrl.officialcarorders}${this.order.id}/driver/`,
                        contentType: 'application/json',
                        type: 'POST',
                        data:JSON.stringify(assignOps.param)
                    })
                    .always((data)=>{
                        base.ajaxCallback(data,()=>{
                            layer.msg('选择成功',{icon:1,time:1000});
                            this.$emit('assign-dialog-close');
                        });
                })
            },
            selectDriver:function(selectedEmployee){
                this.selectedDriver = selectedEmployee;
            },
            selectVehicle:function(selectedVehicle){
                this.selectedVehicle = selectedVehicle;
            },
            getDefaultCar:function () {
                var driver = this.selectedDriver;
                console.log(driver);
                return driver;
            }
        },
        components: {
            select_driver,
            select_vehicle
        }
    }
</script>
