import { Component, Vue } from 'vue-property-decorator';
import firebase from '@/form/firebase';
import { User } from '@/form/class';

@Component({})
export default class Login extends Vue {
  private async login() {
    const user: User = await User.googleLogin();
    this.$store.commit('login', user);
  }
}
