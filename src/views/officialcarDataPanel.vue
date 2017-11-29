<template>
    <div class="Hui-article-box">
        <div id="statistics-main" class="HuiTab">
            <!--[> Tab标题 <]-->
            <div class="tabBar clearfix">
                <span >用车统计</span>
                <span >司机车辆统计</span>
                <span >当天实时看板</span>
            </div>
            <!--<div>-->
                <orderstatistics class="tabCon" v-ref:orderstatistics></orderstatistics>
                <drivervehiclestatistics class="tabCon" v-ref:drivervehiclestatistics></drivervehiclestatistics>
                <realtimestatistics class="tabCon" v-ref:realtimestatistics></realtimestatistics>
            <!--</div>-->
        </div>
    </div>
</template>
<style scoped>
    #statistics-main {
        width: 100%;
        height: 100%;
    }
    div.tabBar {
        height: 43px;
        border-bottom: 0;
    }
    .tabBar span {
        text-align: center;
    }
    .tabCon {
        display: block;
        width: 100%;
        height: calc(100% - 43px);
        overflow: auto;
    }
    .clearfix:after{content:"\20";display:block;height:0;clear:both;visibility:hidden}.clearfix{zoom:1}
    .tabBar {background-color: #6E6E6E;height: 43px;}
    .tabBar span {color: white;cursor: pointer;display: inline-block;float: left;height: 30px;line-height: 30px;padding: 4px 16px; width: 120px;background-color: #6E6E6E; border-top: 4px solid #6E6E6E;font-size: 16px;}
    .tabBar span.current{background-color: #697E93; border-top: 4px solid #5CADFE; width: 120px;}
    .tabCon {display: none}
</style>
<script>
    import * as base from '../assets/js/base.js';
    import orderstatistics from './officialcarOrderStatistics.vue';
    import drivervehiclestatistics from './officialDriverVehicleStatistics.vue';
    import realtimestatistics from './officialCarRealtimestatistics.vue';

    function notifyChildTab(childVm) {
        if (childVm.$children) {
            console.log(childVm)
            childVm.$emit('tabshow')
        }
    }
    export default{
        ready () {
            // console.log('ready for tab')
            // H_UI的tab 切换
            console.log(this)
            let vm = this
            jQuery.Huitab = function(tabBar,tabCon,class_name,tabEvent,i){
                var $tab_menu=$(tabBar);
                  // 初始化操作
                  $tab_menu.removeClass(class_name);
                  $(tabBar).eq(i).addClass(class_name);
                  $(tabCon).hide();
                  $(tabCon).eq(i).show();
                  notifyChildTab(vm.$children[i])
                  
                  $tab_menu.bind(tabEvent,function(){
                      $tab_menu.removeClass(class_name);
                      $(this).addClass(class_name);
                      var index=$tab_menu.index(this);
                      $(tabCon).hide();
                      $(tabCon).eq(index).show()
                      notifyChildTab(vm.$children[index])
                  })
            }
            $.Huitab("#statistics-main .tabBar span","#statistics-main .tabCon","current","click","0");
        },
        data:function(){
            return {
            }
        },
        methods: {
        },
        components:{
            orderstatistics,
            drivervehiclestatistics,
            realtimestatistics
        }
    }
</script>
