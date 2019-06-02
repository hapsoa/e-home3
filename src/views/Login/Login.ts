import { Component, Vue } from 'vue-property-decorator';
import firebase from '@/form/firebase';

@Component({})
export default class Login extends Vue {
  private async login() {
    await firebase.auth.googleLogin();
    this.$store.commit('login');
  }
}
