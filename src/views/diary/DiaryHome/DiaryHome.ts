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
          // this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
          await this.initRoute();
        }
      });
    } else if (!_.isNil(this.$store.state.myUser)) {
      // this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
      // const lastDiary = await Diary.getLastDiary(this.$store.state.myUser.data.uid);
      this.initRoute();
    } else {
      this.$router.push({ name: 'login' });
    }
  }

  private async initRoute() {
    // this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
    try {
      const lastDiary = await Diary.getLastDiary(this.$store.state.myUser.data.uid);
      console.log('lastDiary', lastDiary);
      this.diaries = await Diary.getByPage({
        userId: this.$store.state.myUser.data.uid,
        pageNumber: 1,
        lastDiaryIndex: lastDiary.data.index,
        numOfDiariesPerPage: 5
      });
    } catch (error) {
      // diary가 아무것도 없을 때 에러날 수 있다.
    }
  }

  private lookDiary(diaryId: string) {
    this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
  }
}
