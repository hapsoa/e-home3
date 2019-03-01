import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
// import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';

@Component({
  components: {
    // HelloWorld,
  },
})
export default class App extends Vue {
  private drawer: null = null;

  private logout() {
    //     firebase.auth.logout();
    //     this.$store.commit('logout');
    //     this.$router.push('/login');
  }
}
