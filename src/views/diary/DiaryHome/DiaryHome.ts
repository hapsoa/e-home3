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
          const initObject = await this.initRoute(5);
          if (!_.isNil(initObject)) {
            this.diaries = initObject.diaries;
            this.pageLength = initObject.pageLength;
          }
        }
      });
    } else if (!_.isNil(this.$store.state.myUser)) {
      // this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
      // const lastDiary = await Diary.getLastDiary(this.$store.state.myUser.data.uid);
      const initObject = await this.initRoute(5);
      if (!_.isNil(initObject)) {
        this.diaries = initObject.diaries;
        this.pageLength = initObject.pageLength;
      }
    } else {
      this.$router.push({ name: 'login' });
    }
  }

  private async initRoute(numOfDiariesPerPage: number): Promise<{
    pageLength: number;
    diaries: Diary[];
  } | null> {
    // this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
    try {
      const lastDiary = await Diary.getLastDiary(this.$store.state.myUser.data.uid);

      const pageLength: number = Math.ceil(lastDiary.data.index / numOfDiariesPerPage);
      const diaries = await Diary.getByPage({
        userId: this.$store.state.myUser.data.uid,
        pageNumber: 1,
        lastDiaryIndex: lastDiary.data.index,
        numOfDiariesPerPage
      });

      return {
        pageLength,
        diaries
      };
    } catch (error) {
      // diary가 아무것도 없을 때 에러날 수 있다.
      return null;
    }
  }

  private lookDiary(diaryId: string) {
    this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
  }
}
