import _ from 'lodash';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Diary } from '@/form/class';

@Component({
  components: {}
})
export default class DiaryHome extends Vue {
  private diaries: object[] = [];
  private page: number = 1;
  // 몇 페이지가 있는지에 대한 변수
  private pageLength: number = 0;
  private numOfDiariesPerPage: number = 5;

  @Watch('page')
  public async onPageChanged(page: number) {
    console.log('page', page);
    this.diaries = await Diary.getByPage({
      userId: this.$store.state.myUser.data.uid,
      pageNumber: page,
      lastDiaryIndex: this.$store.state.lastDiaryIndex,
      numOfDiariesPerPage: this.numOfDiariesPerPage
    });
  }

  /**
   * diary의 세부사항을 보는 함수이다.
   * @param diaryId
   */
  private lookDiary(diaryId: string) {
    this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
  }

  /**
   * route를 초기화 하는 함수이다.
   * @param numOfDiariesPerPage : 페이지당 diary의 수
   */
  private async initRoute(numOfDiariesPerPage: number): Promise<{
    pageLength: number;
    diaries: Diary[];
  } | null> {
    // this.diaries = await Diary.getByUserId(this.$store.state.myUser.data.uid);
    try {
      const lastDiary = await Diary.getLastDiary(this.$store.state.myUser.data.uid);
      this.$store.state.lastDiaryIndex = lastDiary.data.index;
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

  private async created() {
    if (this.$store.state.myUser === undefined) {
      this.$store.commit('saveMethod', async () => {
        if (!_.isNil(this.$store.state.myUser)) {
          const initObject = await this.initRoute(this.numOfDiariesPerPage);
          if (!_.isNil(initObject)) {
            this.diaries = initObject.diaries;
            this.pageLength = initObject.pageLength;
          }
        }
      });
    } else if (!_.isNil(this.$store.state.myUser)) {
      const initObject = await this.initRoute(this.numOfDiariesPerPage);
      if (!_.isNil(initObject)) {
        this.diaries = initObject.diaries;
        this.pageLength = initObject.pageLength;
      }
    } else {
      this.$router.push({ name: 'login' });
    }
  }
}
