import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import firebase from '@/form/firebase';

@Component({
  components: {
    // HelloWorld,
  },
})
export default class App extends Vue {
  private diaries: object[] = [];
  private page: number = 1;
  private pageLength: number = 0;
}
