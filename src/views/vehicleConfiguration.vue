<template>
    <section class="Hui-article-box">
        <div class="layui-layer-title">公务车配置公告</div>
        <div class="layui-layer-content">
        <div class="layui-layer-title2">是否已发布：{{ modulenotice.has_pub == true ? "是" : "否" }}</div>
        <!-- <div class="layui-layer-title2">是否已发布：{{ modulenotice.has_pub == true ? "<span class='c-red f-20'>是</span>" : "否" }}</div> -->
            <form id="J-layer-form" class="form form-horizontal layui-layer-wrap"> 
                <div class="row cl">
                    <label class="form-label f-l col-2"><span class="c-red">*</span>公务车公告内容：</label>
                    <div class="formControls f-l col-7">
                        <textarea v-model="contentInput" id="input-text" class="publish-content-textarea input-text" value="" placeholder="先在这里输入要发布的内容，然后先保存才能发布，最后点击发布就可以发布内容了，然后内容会推送到手机端，打开E企行app进入公务车栏就可以看到推送了。" name="content">{{ modulenotice.content }}</textarea>
                    </div>
                </div> 
            </form>
        </div>

        <div class="layui-layer-btn"> 
            <a id="btn-primary" class="layui-layer-btn0 btn-primary" v-on:click="save()">保存</a>
            <!-- <a  v-if="is_show" id="publish-btn" class="layui-layer-btn0 publish-btn" v-on:click="pub()">发布</a> -->
            <a  v-if="!modulenotice.has_pub" id="publish-btn" class="layui-layer-btn0 publish-btn" v-on:click="pub()">发布</a>
            <a  v-if="modulenotice.has_pub" id="publish-btn" class="layui-layer-btn0 publish-btn btn btn-warning radius" v-on:click="canclepub()">取消发布</a>
        </div>     
    </section>>
</template>
<style scoped lang="less">
    .layui-layer-title {
        padding-left: 40px;
        font-size: 25px;
    }
    .layui-layer-title2 {
        padding-left: 40px;
        margin-left: 40%;
        font-size: 20px;
    }
    .btn-warning {
        height: 30px;
    }
    .layui-layer-btn{
        .publish-btn{
            background: #3bb4f2;
            border-color: #3bb4f2;
            margin:0;
            margin-top: 20px;
            margin-right: 23%;
        }
        .btn-primary {
            margin-right: 15px;
            margin-top: 20px;
        }
    }
    div.layui-layer-content {
        // width: 100%;
        // height: 50%;
        margin-top: 100px;
        .form-label {
            font-size: 20px;
            line-height: 20px;
            margin-left: 40px;
        }
    }
    .publish-content-textarea{
        height:250px;
        resize:none;
        font-size: 18px;
    }
</style>
<script>
    import * as base from '../assets/js/base.js';
    export default{
        ready () {
            let that = this;
            let ajaxUrl = '';
            let ajaxType = '';
            let getData = this.data;

            this.searchNotice();

            base.verticalCenter('.layui-modify')

            //验证
            $('#J-layer-form').validate({    
                rules: {            
                    content: {
                        required: true,
                        maxlength:128
                    },
                },                 
                submitHandler:function() {
               
                }             
            }); 
        },
        props: ['title','type','data'],
        data:function(){
            return {
                titleInput:'',
                authorInput:'',
                targetSelected:'',
                contentInput:'',
                before_apply_time:'00:00',
                end_apply_time: '00:00', 
                modulenotice: '',
                is_show: true, 
            }
        },
        methods: {
            searchNotice: function(){
                let that = this;
                $.ajax({
                    url: base.gAjaxUrl.vehicleConfiguration,
                    type: 'GET',
                })
                .success ((data)=>{
                    base.ajaxCallback(data,()=>{
                        // console.log(data.results[0]);
                        // that.content = data.results[0].content;

                        // 该函数是用来判断是否是第一次进入该新功能或页面
                        // console.log(localStorage);
                        // console.log('初始状态:',localStorage.vehicleConfigurationPromptFlag)

                      

                        //判断是否是第一次进入该新功能或页面从而弹出新功能的提示
                        if(localStorage.vehicleConfigurationPromptFlag == 'true'){
                            let arrObj = [$('#input-text'),$('#btn-primary'),$('#publish-btn'),];
                            let arrTitle = ['先在这里输入要发布的内容','要先保存才能发布','点击这里发布内容',];
                            var promptTypes = ['vehicleConfigurationPromptFlag',];
                            $.guidance({
                                obj:arrObj,
                                title:arrTitle,
                                flag:promptTypes
                            });
                        }

                        //判断是否是第一次进入该新功能或页面而且是还没发布过公告的从而弹出还没发布的内容的提示
                        if(data.results[0]){
                            that.modulenotice = data.results[0];
                        }
                        else{
                            that.modulenotice = {"has_pub":"false"};
                            layer.msg('您还没发布过公告!',{icon:1,time:1000});
                            // console.log(localStorage);
                            // console.log(localStorage[0]);
                        }
                    });
                })
            },
            save:function(status){ 
                let that = this;
                console.log(that.content);
                $.ajax({
                        url: base.gAjaxUrl.vehicleConfiguration,
                        type:'POST',
                        data: {
                            content: that.contentInput,
                        },
                    })
                 .always(function(data) {
                        that.is_show = true;
                        if(($('.input-text').val() != "") && ($('.input-text').val().length <= 128)){
                            layer.msg('保存成功!',{icon:1,time:1000});
                            that.modulenotice = data;
                        }
                        else if($('.input-text').val() == ""){
                            layer.msg("内容不能为空!", function(){
                                layer.msg('请输入内容哦!', {icon: 6});
                            }); 
                        }
                        else if($('.input-text').val().length > 128){
                            layer.msg("内容长度不能超过128!", function(){
                                layer.msg('请重新编辑内容!', {icon: 6});
                            }); 
                        }
                        else {
                            layer.msg("保存失败!", function(){

                            }); 
                        }
                        
                    });
            },
            pub:function(status){
                let url = base.gAjaxUrl.vehicleConfiguration + this.modulenotice.id + '/pub/';
                let that = this; 
                $.ajax({
                    url: url,
                    type: 'GET',
                })
                .always(function(data) {
                            that.is_show = false;
                        // setTimeout(function(){
                            if(($('.input-text').val() != "") && ($('.input-text').val().length <= 128)){
                                // layer.msg('发布成功!',{icon:1,time:1000});
                                that.modulenotice = data;
                                that.modulenotice.has_pub = false;
                                if($('.input-text').val() == that.modulenotice.content){
                                    that.modulenotice.has_pub = true;
                                    layer.msg('发布成功!',{icon:1,time:1000});
                                }
                                else {
                                    layer.msg('请先保存才能发布!');
                                }
                            }
                            else if($('.input-text').val() == ""){
                                layer.msg("内容不能为空哦!", function(){
                                    layer.msg('请输入内容!', {icon: 6});
                                }); 
                            }
                            else if($('.input-text').val().length > 128){
                                layer.msg("内容长度不能超过128!", function(){
                                    layer.msg('请重新编辑内容!', {icon: 6});
                                }); 
                            }
                            else {
                                layer.msg("发布失败!", function(){

                                }); 
                            }
                        // },2000);
                    });
            },
            canclepub: function(){
                let url = base.gAjaxUrl.vehicleConfiguration + this.modulenotice.id + '/un_pub/';
                let that = this;
                $.ajax({
                    url: url,
                    type: 'PATCH',
                })
                .success(function(data){  
                    that.is_show = true;
                    that.modulenotice = data;    
                    // that.modulenotice.has_pub = !that.modulenotice.has_pub;
                    console.log(that.modulenotice.has_pub);
                    layer.msg('取消发布成功!',{icon:1,time:1000});
                 });
            }
        }
    }
</script>
