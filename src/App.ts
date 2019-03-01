import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import firebase from './api/firebase';
// import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';

@Component({
  components: {
    // HelloWorld,
  }
})
export default class App extends Vue {
  private drawer: null = null;

  private logout() {
    firebase.auth.logout();
    this.$store.commit('logout');
    this.$router.push('/login');
  }

  private beforeCreate() {
    firebase.auth.setUserOnlineListener(() => {
      this.$store.commit('login');
      this.$store.commit('shotMethods');
      this.$store.commit('endLoading');
      // login page일 때
      if (this.$route.name === 'login') {
        this.$router.push('/');
      }
    });
    firebase.auth.setUserOfflineListener(() => {
      this.$store.commit('logout');
      this.$store.commit('endLoading');
      this.$router.push('/login');
    });
  }
}
