import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
// import firebase from './api/firebase';
import { User } from '@/form/class';

@Component({
  components: {
    // HelloWorld,
  }
})
export default class App extends Vue {
  private drawer: null = null;

  private logout() {
    //
    this.$router.push('/login');
  }

  private beforeCreate() {

    User.setAuthOnListener(() => {
      this.$store.state.myUser = User.getMyUser();
      // this.$store.commit('login');
      this.$store.commit('shotMethods');
      this.$store.commit('endLoading');
      // login page일 때
      if (this.$route.name === 'login') {
        this.$router.push('/');
      }
    });
    User.setAuthOffListener(() => {
      this.$store.state.myUser = User.getMyUser();
      // this.$store.commit('logout');
      this.$store.commit('endLoading');
      this.$router.push('/login');
    });
  }
}
