import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/fontawesome";
import "./plugins/axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import HighchartsVue from "highcharts-vue";
// eslint-disable-next-line no-unused-vars
import Highcharts from "highcharts";

// eslint-disable-next-line vue/multi-word-component-names
Vue.component("highcharts", HighchartsVue);
Vue.config.productionTip = false;
Vue.use(HighchartsVue);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
