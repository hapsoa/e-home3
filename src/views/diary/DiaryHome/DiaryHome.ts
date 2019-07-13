import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { Diary } from '@/form/class';

@Component({
  components: {}
})
export default class DiaryHome extends Vue {
  private diaries: object[] = [];
  private page: number = 1;
  private pageLength: number = 0;

  private async created() {
    // 로그인이 없는건지, 아직 안된건지 구분할 수 있어야 한다.
    // undefined인데 추론할 수가 없다.
    if (this.$store.state.myUser === undefined) {
      this.$store.commit('saveMethod', async () => {
        if (!_.isNil(this.$store.state.myUser)) {
          this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
        }
      });
    } else if (!_.isNil(this.$store.state.myUser)) {
      console.log('@#$2', this.$store.state.myUser.data.uid);
      this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
    } else {
      this.$router.push({ name: 'login' });
    }
  }

  private lookDiary(diaryId: string) {
    this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
  }
}
