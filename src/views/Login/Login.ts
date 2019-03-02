import { Component, Vue } from 'vue-property-decorator';
import firebase from '@/api/firebase';

@Component({})
export default class Login extends Vue {
  private async login() {
    await firebase.auth.googleLogin();
    this.$store.commit('login');
  }
}
