import Vue from "vue";
import VueRouter from "vue-router";
import registerRouters from "./routers";
import App from './app.vue';
import _ from "lodash";
import moment from "moment";
import PBUiAdmin from "PBUiAdmin";
import iCheck from "iCheck";
import echarts from "echarts";
Vue.use(VueRouter);
// Vue.use(echarts);
//开启debug模式
Vue.config.debug = true;
var router = new VueRouter({
});

registerRouters(router);

router.start(App, '#app');

Vue.prototype.$echarts = echarts

