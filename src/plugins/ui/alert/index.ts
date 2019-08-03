import Vue from 'vue';
import Alert, { AlertOption } from './alert-window';




declare module 'vue/types/vue' {
  interface Alert extends Vue {
    on(option: AlertOption): Promise<void>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $alertWindow: Alert;
  }
}

export default {
  alertWindowInstance: new Alert(),

  install(vue: typeof Vue, options: any) {
    if (Vue.prototype.$alertWindow === undefined) {
      Vue.prototype.$alertWindow = this.alertWindowInstance;
    }
    this.alertWindowInstance.$mount(
      document.body.appendChild(document.createElement('div'))
    );
  }
};
