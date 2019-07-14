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
    if (this.$store.state.myUser === undefined) {
      this.$store.commit('saveMethod', async () => {
        if (!_.isNil(this.$store.state.myUser)) {
          this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
        }
      });
    } else if (!_.isNil(this.$store.state.myUser)) {
      this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
    } else {
      this.$router.push({ name: 'login' });
    }
  }

  private lookDiary(diaryId: string) {
    this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
  }
}
