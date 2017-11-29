<template>
    <add :title="dialogTitle" :type="dialogType" :data="dialogData" v-if="isShowAddDialog" v-on:dialog-close="addDialogClose" v-on:dialog-save="addDialogSave"></add>
    <section class="Hui-article-box">
    <div class="page-container">
        <div class="text-l clearfix"> 
            <input type="text" class="input-text Wdate f-l" v-on:blur="ta(this)" style="width:150px;" placeholder="标题/作者" v-model="searchInput">
            <!-- 接收部门：
            <span class="select-box inline mr-5">  
                <select v-model="departmentSelected" name="" class="select">
                    <option value="">全部</option>
                    <option v-bind:value="item.id" v-for="item in departmentItem">{{item.department_name}}</option>
                </select>
            </span>  -->
            <button type="submit" class="btn btn-success f-l" v-on:click="getList(1)"><i class="Hui-iconfont">&#xe665;</i></button>
            <a class="btn btn-primary radius f-r" v-on:click="clickAdd" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 发公告</a>
        </div>
        
        <table class="table table-border table-bordered table-hover table-bg  mt-20 ">
            <thead>
                <tr class="text-c">
                    <th>标题</th>
                    <th>作者</th>
                    <!-- <th>接收部门</th> -->
                    <th>发布时间</th>
                    <th>是否已发布</th>
                    <th width="70">操作</th>
                </tr>
            </thead>
            <tbody  v-if="!noData">
                <tr class="text-c" v-for="item in items">
                    <td>{{item.title}}</td>
                    <td>{{item.author}}</td>
                    <!-- <td>{{item.target_type}}</td> -->
                    <td>{{item.ctime}}</td>
                    <td>{{item.status==20 ? "是": "否"}}</td>
                    <td class="f-14">
                        <a title="编辑" href="javascript:;" v-on:click="clickModify(item)"><i class="Hui-iconfont">&#xe6df;</i></a>  
                        <a title="删除" href="javascript:;" class="ml-5" v-on:click="deleteBtn(item.id)"><i class="Hui-iconfont">&#xe6e2;</i></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="J-page" class="m-page" v-if="!noData"></div>
        <div class="m-loading" v-if="itemsLoading">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
        <div class="no-data text-c mt-50" v-if="noData">没有相关数据</div>
    </div>
    </section>
</template>

<style lang="less">
</style>

<script>
    import * as base from '../assets/js/base.js';
    import add from "../components/addNotice.vue";
    let noticesOps = {
        param:{
            search:'',
            page:1,
            page_size:10,   
        }
    }

    export default{
        ready () {
            let that = this;

            this.queryAjax((tpageToal='4')=>{
                this.initPage('#J-page',tpageToal)
            });                 

            //获取部门列表
            $.ajax({
                url: base.gAjaxUrl.departments,
                type: 'GET',
            })
            .always((data)=>{
                this.departmentItem = data.results;
            })

        },
        data:function(){
            return {
                noData:false,
                itemsLoading:false,
                isShowAddDialog:false,
                departmentSelected:'',
                departmentItem:[],
                items: [],
                searchInput:'',
                dialogTitle:'',
                dialogType:'add',
                dialogData:''
            }
        },
        methods: {

            ta:function(obj){
                    var val=$(".Wdate").val().length;
                    if(val > 20){
                        //alert("至多输入20个字符！");
                        // layer.confirm('至多输入20个字符哦！',(index)=>{});
                        layer.msg('至多输入20个字符！');
                        // $(obj).val($(obj).val().substring(0,20))
                        }
                },
            addDialogClose:function(data){
                this.isShowAddDialog = false;
            },
            addDialogSave:function(data){
                this.isShowAddDialog = false;
                this.getList();
            },
            clickAdd:function(){
                this.dialogTitle='发公告';
                this.dialogType='add';
                this.isShowAddDialog = true;
            },
            clickModify:function(data){
                this.dialogTitle='修改公告';
                this.dialogType='modify';
                this.dialogData=data;
                this.isShowAddDialog = true;
            },
            //初始化分页   
            initPage:function(obj,tpageToal='4',current='1'){
                $(obj).createPage({
                    pageCount:tpageToal,
                    current:current,
                    callback:(p)=>{
                        noticesOps.param.page = p;
                        this.queryAjax();
                    }
                });
            },
            queryAjax:function(callback=function(){}){
                this.itemsLoading = true;
                //修改参数
                noticesOps.param.search = this.searchInput;

                $.ajax({
                    url: base.gAjaxUrl.notices,
                    type: 'GET',
                    data:noticesOps.param
                })
                .always((data)=>{
                    base.ajaxCallback(data,()=>{
                        let resultData = data.results;
                        this.itemsLoading = false;
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
            getList:function(reset=0){
                //重置第一页
                if(reset){
                    noticesOps.param.page = 1
                }
                //以下限制标题搜索为20个字
                var val=$(".Wdate").val().length;
                if(val > 20){
                    // layer.confirm('至多输入20个字符哦！',(index)=>{});
                    layer.msg('至多输入20个字符！',{icon:1,time:1000});                            
                }
                else{
                    this.queryAjax((tpageToal='4')=>{
                        this.initPage('#J-page',tpageToal,noticesOps.param.page)
                    });
                }
                // this.queryAjax((tpageToal='4')=>{
                //     this.initPage('#J-page',tpageToal,noticesOps.param.page)
                // });
            },
            //删除
            deleteBtn:function(id){
                let that = this;

                layer.confirm('删除须谨慎，确认要删除吗？',(index)=>{

                    if($('tbody tr.text-c').length == 1 && noticesOps.param.page>1){
                        noticesOps.param.page--; 
                    };

                    $.ajax({
                        url: `${base.gAjaxUrl.notices}${id}/`,
                        type: 'DELETE',
                    })
                    .always((data)=>{
                        layer.msg('删除成功',{icon:1,time:1000});
                        that.getList();
                        
                    })
                });  
            }

        },
        components:{
            add
        }
    }
</script>