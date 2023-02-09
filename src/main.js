import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/fontawesome";
import "./plugins/axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
// import { EventBus } from "./event-bus";

highchartsMore(Highcharts);
Vue.config.productionTip = false;
Vue.use(HighchartsVue, { Highcharts });
export const eventBus = new Vue();

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
